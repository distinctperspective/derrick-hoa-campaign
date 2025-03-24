import NextAuth from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            address?: string | null;
            bio?: string | null;
            phoneNumber?: string | null;
            isResident?: boolean | null;
        };
    }
}
