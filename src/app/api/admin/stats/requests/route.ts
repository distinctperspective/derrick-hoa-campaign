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
    
    // Get request stats
    const [total, open, closed] = await Promise.all([
      prisma.request.count(),
      prisma.request.count({ where: { status: 'OPEN' } }),
      prisma.request.count({ where: { status: { not: 'OPEN' } } })
    ]);
    
    return NextResponse.json({
      total,
      open,
      closed
    });
    
  } catch (error) {
    console.error('Error fetching request stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch request stats' },
      { status: 500 }
    );
  }
}
