import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get the ID from the URL instead of params
    const url = request.url;
    const urlParts = url.split('/');
    const replyId = urlParts[urlParts.length - 2]; // Get the ID from the URL path
    
    // Get the session
    const session = await getServerSession(authOptions);

    // Check if user is authenticated
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if user is an admin
    const user = await prisma.user.findUnique({
      where: { email: session.user.email as string },
    });

    if (!user?.isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get the reply to find its parent request
    const reply = await prisma.reply.findUnique({
      where: { id: replyId },
      select: { requestId: true },
    });

    if (!reply) {
      return NextResponse.json({ error: 'Reply not found' }, { status: 404 });
    }

    // Delete the reply
    await prisma.reply.delete({
      where: { id: replyId },
    });

    // Fetch the updated request with replies
    const updatedRequest = await prisma.request.findUnique({
      where: { id: reply.requestId },
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
    console.error('Error deleting reply:', error);
    return NextResponse.json(
      { error: 'Failed to delete reply' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
