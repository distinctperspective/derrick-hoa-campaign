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
    debug: true,
    callbacks: {
        async session({ session, user }: { session: Session; user: User }) {
            if (session?.user) {
                const fullUser = await prisma.user.findUnique({
                    where: { id: user.id },
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        image: true,
                        address: true,
                        bio: true,
                        phoneNumber: true,
                        isResident: true,
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

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
