import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const requests = await prisma.request.findMany({
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                replies: true
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

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { title, description } = await req.json();

        if (!title || !description) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const request = await prisma.request.create({
            data: {
                title,
                description,
                userId: session.user.id,
                userEmail: session.user.email!,
                userName: session.user.name!,
                status: 'OPEN'
            },
        });

        return NextResponse.json(request);
    } catch (error) {
        console.error('Error creating request:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
