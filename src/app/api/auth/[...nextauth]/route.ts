import { sendWelcomeEmail } from '@/app/utils/sendEmail';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

import NextAuth, { NextAuthOptions, Session, User } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import GoogleProvider from 'next-auth/providers/google';

const prisma = new PrismaClient();

const isDevelopment = process.env.NODE_ENV === 'development';

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: 'select_account',
                    access_type: 'offline',
                    response_type: 'code'
                }
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt',
        maxAge: 24 * 60 * 60,
        updateAge: 60 * 60
    },
    cookies: {
        sessionToken: {
            name: isDevelopment ? 'next-auth.session-token' : '__Secure-next-auth.session-token',
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: !isDevelopment,
                domain: isDevelopment
                    ? undefined
                    : process.env.NEXTAUTH_URL
                      ? new URL(process.env.NEXTAUTH_URL).hostname
                      : undefined
            }
        },
        callbackUrl: {
            name: isDevelopment ? 'next-auth.callback-url' : '__Secure-next-auth.callback-url',
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: !isDevelopment
            }
        },
        csrfToken: {
            name: isDevelopment ? 'next-auth.csrf-token' : '__Host-next-auth.csrf-token',
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: !isDevelopment
            }
        }
    },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            // Allow all Google sign ins
            if (account?.provider === 'google') {
                return true;
            }
            return false;
        },
        async session({ session, token, user }) {
            if (session?.user && token?.sub) {
                try {
                    const fullUser = await prisma.user.findUnique({
                        where: { id: token.sub },
                        select: {
                            id: true,
                            email: true,
                            name: true,
                            image: true,
                            address: true,
                            bio: true,
                            phoneNumber: true,
                            isResident: true,
                            isAdmin: true,
                            welcomeEmailSent: true
                        }
                    });

                    if (fullUser) {
                        session.user = {
                            ...session.user,
                            ...fullUser
                        };
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            }
            return session;
        },
        async jwt({ token, user, account, profile }) {
            if (user) {
                token.sub = user.id;
            }
            return token;
        }
    },
    events: {
        async createUser({ user }) {
            try {
                const userData = await prisma.user.findUnique({
                    where: { id: user.id }
                });

                if (!userData || !userData.email) {
                    console.error('User data not found or missing email');
                    return;
                }

                const isProfileComplete = Boolean(userData.address && userData.phoneNumber);

                const emailResult = await sendWelcomeEmail(
                    userData.email,
                    userData.name || 'Neighbor',
                    isProfileComplete
                );

                if (emailResult.success) {
                    await prisma.user.update({
                        where: { id: user.id },
                        data: { welcomeEmailSent: new Date() }
                    });
                    console.log(`Welcome email sent successfully to ${userData.email}`);
                } else {
                    console.error(`Failed to send welcome email to ${userData.email}:`, emailResult.error);
                }
            } catch (error) {
                console.error('Error in createUser event:', error);
            }
        }
    },
    pages: {
        signIn: '/auth/signin',
        error: '/auth/error'
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
