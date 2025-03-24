import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);
        
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { content } = await req.json();

        if (!content) {
            return NextResponse.json({ error: 'Missing content' }, { status: 400 });
        }

        const reply = await prisma.reply.create({
            data: {
                content,
                requestId: params.id,
                userId: session.user.id,
                userName: session.user.name!,
            },
            include: {
                user: true,
            },
        });

        return NextResponse.json(reply);
    } catch (error) {
        console.error('Error creating reply:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}
