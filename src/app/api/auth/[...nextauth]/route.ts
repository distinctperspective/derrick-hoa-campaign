import { sendWelcomeEmail } from '@/app/utils/sendEmail';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { Prisma, PrismaClient } from '@prisma/client';

import NextAuth, { DefaultSession, NextAuthOptions, Session } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';

const prisma = new PrismaClient();

const isDevelopment = process.env.NODE_ENV === 'development';

// Extend the built-in session type
declare module 'next-auth' {
    interface Session extends DefaultSession {
        user: {
            id: string;
            email: string | null;
            name: string | null;
            image: string | null;
            address: string | null;
            bio: string | null;
            phoneNumber: string | null;
            isResident: boolean;
            isAdmin: boolean;
            welcomeEmailSent: Date | null;
            lastActive: Date | null;
            sessionExpires: string;
        };
    }
}

// Define the user select type
const userSelect = {
    id: true,
    email: true,
    name: true,
    image: true,
    address: true,
    bio: true,
    phoneNumber: true,
    isResident: true,
    isAdmin: true,
    welcomeEmailSent: true,
    lastActive: true
} as const;

// Type for user data
type UserData = Prisma.UserGetPayload<{ select: typeof userSelect }>;

// Helper to check if session is expired
const isSessionExpired = (session: Session) => {
    if (!session.expires) return true;
    return new Date(session.expires) < new Date();
};

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
    debug: isDevelopment,
    session: {
        strategy: 'jwt',
        maxAge: 8 * 60 * 60, // 8 hours
        updateAge: 15 * 60 // 15 minutes
    },
    cookies: {
        sessionToken: {
            name: isDevelopment ? 'next-auth.session-token' : '__Secure-next-auth.session-token',
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: !isDevelopment,
                domain: isDevelopment ? undefined : new URL(process.env.NEXTAUTH_URL || '').hostname
            }
        },
        callbackUrl: {
            name: isDevelopment ? 'next-auth.callback-url' : '__Secure-next-auth.callback-url',
            options: {
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
        async signIn({ user, account }) {
            if (!user?.email) {
                return false;
            }
            if (account?.provider === 'google') {
                return true;
            }
            return false;
        },
        async session({ session, token }) {
            if (!session?.user || !token?.sub) {
                return session;
            }

            try {
                const fullUser = await prisma.user.findUnique({
                    where: { id: token.sub },
                    select: userSelect
                });

                if (!fullUser) {
                    return session;
                }

                // Update last active timestamp
                await prisma.user.update({
                    where: { id: token.sub },
                    data: { lastActive: new Date() }
                });

                // Ensure all user fields are properly typed
                session.user = {
                    ...session.user,
                    ...fullUser,
                    id: token.sub,
                    sessionExpires: session.expires
                } as Session['user'];

                return session;
            } catch (error) {
                console.error('Error in session callback:', error);
                return session;
            }
        },
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id;
                token.email = user.email;
                token.iat = Math.floor(Date.now() / 1000);
                token.exp = Math.floor(Date.now() / 1000) + 8 * 60 * 60; // 8 hours
            }

            // Check if token is expired
            const tokenExp = token.exp as number;
            if (tokenExp && tokenExp < Math.floor(Date.now() / 1000)) {
                return token; // Let NextAuth handle token expiration
            }

            return token;
        }
    },
    events: {
        async signOut({ token }) {
            if (token?.sub) {
                try {
                    // Delete all sessions for this user
                    await prisma.session.deleteMany({
                        where: { userId: token.sub }
                    });

                    // Update last active timestamp
                    await prisma.user.update({
                        where: { id: token.sub },
                        data: { lastActive: new Date() }
                    });
                } catch (error) {
                    console.error('Error in signOut event:', error);
                }
            }
        },
        async createUser({ user }) {
            try {
                const userData = await prisma.user.findUnique({
                    where: { id: user.id }
                });

                if (!userData?.email) {
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
        error: '/auth/error',
        signOut: '/auth/signout'
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
