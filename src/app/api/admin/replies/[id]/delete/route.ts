import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

// Create a single PrismaClient instance and reuse it
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

    // Check if user is an admin directly from the session
    // This avoids an extra database query
    if (!(session.user as any).isAdmin) {
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

    // Revalidate the admin requests page and the specific request page
    revalidatePath('/admin/requests');
    revalidatePath(`/admin/requests/${reply.requestId}`);

    // Return just the success status and requestId
    // This is much faster than fetching the entire request with all replies
    return NextResponse.json({ 
      success: true,
      requestId: reply.requestId
    });
  } catch (error) {
    console.error('Error deleting reply:', error);
    return NextResponse.json(
      { error: 'Failed to delete reply' },
      { status: 500 }
    );
  }
}
