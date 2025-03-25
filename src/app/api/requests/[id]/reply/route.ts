import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get the session
    const session = await getServerSession(authOptions);

    // Check if user is authenticated
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the request ID from the URL params
    const { id } = params;

    // Get the reply content from the request body
    const { content } = await request.json();

    if (!content || content.trim() === '') {
      return NextResponse.json(
        { error: 'Reply content is required' },
        { status: 400 }
      );
    }

    // Check if the request exists
    const requestExists = await prisma.request.findUnique({
      where: { id },
    });

    if (!requestExists) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    // Create the reply
    await prisma.reply.create({
      data: {
        content,
        requestId: id,
        userId: session.user.id as string,
        userName: session.user.name as string,
      },
    });

    // Update the request status to IN_PROGRESS if it's currently OPEN
    if (requestExists.status === 'OPEN') {
      await prisma.request.update({
        where: { id },
        data: { status: 'IN_PROGRESS' },
      });
    }

    // Fetch the updated request with replies
    const updatedRequest = await prisma.request.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            address: true,
          },
        },
        replies: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });

    return NextResponse.json(updatedRequest);
  } catch (error) {
    console.error('Error creating reply:', error);
    return NextResponse.json(
      { error: 'Failed to create reply' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
