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
    const requestId = urlParts[urlParts.length - 2]; // Get the ID from the URL path
    
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

    // Delete the request (this will cascade delete all replies due to the relation)
    await prisma.request.delete({
      where: { id: requestId },
    });

    // Revalidate the super-admin requests page
    revalidatePath('/super-admin/requests');

    // Return just the success status
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting request:', error);
    return NextResponse.json(
      { error: 'Failed to delete request' },
      { status: 500 }
    );
  }
}
