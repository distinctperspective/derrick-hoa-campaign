import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PUT(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session?.user?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const data = await req.json();
        
        // Update user profile
        const updatedUser = await prisma.user.update({
            where: {
                email: session.user.email,
            },
            data: {
                name: data.name,
                address: data.address,
                bio: data.bio,
                phoneNumber: data.phoneNumber,
                isResident: data.address ? true : undefined, // Set isResident to true if address is provided
            },
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error('Error updating profile:', error);

        return new NextResponse('Internal Server Error', { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function GET(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session?.user?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        // Get user profile
        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email,
            },
            select: {
                name: true,
                address: true,
                bio: true,
                phoneNumber: true,
                isResident: true,
            },
        });

        if (!user) {
            return new NextResponse('User not found', { status: 404 });
        }

        return NextResponse.json(user);
    } catch (error) {
        console.error('Error getting profile:', error);

        return new NextResponse('Internal Server Error', { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
