import { sendWelcomeEmail } from '@/app/utils/sendEmail';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

import NextAuth, { NextAuthOptions, Session, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    // @ts-ignore - Known type issue with PrismaAdapter
    adapter: PrismaAdapter(prisma),
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
        maxAge: 24 * 60 * 60, // 24 hours
        updateAge: 60 * 60 // 1 hour
    },
    cookies: {
        sessionToken: {
            name: `__Secure-next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: true,
                domain: process.env.NEXTAUTH_URL ? new URL(process.env.NEXTAUTH_URL).hostname : undefined
            }
        },
        callbackUrl: {
            name: `__Secure-next-auth.callback-url`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: true
            }
        },
        csrfToken: {
            name: `__Host-next-auth.csrf-token`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: true
            }
        }
    },
    events: {
        createUser: async ({ user }) => {
            try {
                // Get full user data from database to access all fields
                const userData = await prisma.user.findUnique({
                    where: { id: user.id }
                });

                if (!userData || !userData.email) {
                    console.error('User data not found or missing email');
                    return;
                }

                // Check if user has address and phone number
                const isProfileComplete = Boolean(userData.address && userData.phoneNumber);

                // Send welcome email
                const emailResult = await sendWelcomeEmail(
                    userData.email,
                    userData.name || 'Neighbor',
                    isProfileComplete
                );

                if (emailResult.success) {
                    // Update user record to indicate welcome email was sent
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
    callbacks: {
        async session({ session, token }: { session: Session; token: any }) {
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
        async jwt({ token, user }) {
            // Add user ID to token when first created
            if (user) {
                token.sub = user.id;
            }
            return token;
        }
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
