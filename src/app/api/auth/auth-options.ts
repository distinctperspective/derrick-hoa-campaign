import { NextAuthOptions } from 'next-auth';
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
    debug: true,
    callbacks: {
        async session({ session, user }) {
            if (session?.user) {
                const fullUser = await prisma.user.findUnique({
                    where: {
                        email: session.user.email!,
                    },
                });
                
                if (!fullUser) {
                    throw new Error('User not found');
                }

                session.user = {
                    ...session.user,
                    ...fullUser,
                };

                if (!session?.user?.email) {
                    throw new Error('No user email in session');
                }

            }

            return session;
        },
    },
};
