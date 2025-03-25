import NextAuth, { NextAuthOptions, Session, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
    // @ts-ignore - Known type issue with PrismaAdapter
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    cookies: {
        sessionToken: {
            name: `next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: process.env.NODE_ENV === 'production',
            },
        },
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
                        },
                    });
                    
                    if (fullUser) {
                        session.user = {
                            ...session.user,
                            ...fullUser,
                        };
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
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
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
