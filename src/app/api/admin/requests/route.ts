import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Check if user is admin
        if (!session.user.isAdmin) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        // Fetch all requests with user information
        const requests = await prisma.request.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                replies: true,
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true,
                        address: true
                    }
                }
            }
        });
        
        return NextResponse.json(requests);
    } catch (error) {
        console.error('Error fetching requests:', error);
        
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
