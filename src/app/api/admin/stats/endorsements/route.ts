import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Check if user is authenticated and is an admin
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Check if user is an admin
    const user = await prisma.user.findUnique({
      where: { email: session.user.email as string },
      select: { isAdmin: true }
    });
    
    if (!user?.isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    // Get endorsement stats
    const [total, approved, pending] = await Promise.all([
      prisma.endorsement.count(),
      prisma.endorsement.count({ where: { isApproved: true } }),
      prisma.endorsement.count({ where: { isApproved: false } })
    ]);
    
    return NextResponse.json({
      total,
      approved,
      pending
    });
    
  } catch (error) {
    console.error('Error fetching endorsement stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch endorsement stats' },
      { status: 500 }
    );
  }
}
