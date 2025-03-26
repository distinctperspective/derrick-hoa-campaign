import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/lib/prisma';

// GET a single user by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user is authenticated and is an admin
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Check if user is an admin
    const adminUser = await prisma.user.findUnique({
      where: { email: session.user.email as string },
      select: { isAdmin: true }
    });
    
    if (!adminUser?.isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    const userId = params.id;
    
    // Get user by ID
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        address: true,
        isResident: true,
        isAdmin: true,
        createdAt: true,
      },
    });
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    return NextResponse.json(user);
    
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}

// UPDATE a user by ID
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user is authenticated and is an admin
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Check if user is an admin
    const adminUser = await prisma.user.findUnique({
      where: { email: session.user.email as string },
      select: { isAdmin: true }
    });
    
    if (!adminUser?.isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    const userId = params.id;
    
    // Check if user exists
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });
    
    if (!userExists) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Get request body
    const body = await request.json();
    const { name, email, address, isResident, isAdmin } = body;
    
    // Update user
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
        address,
        isResident,
        isAdmin,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        address: true,
        isResident: true,
        isAdmin: true,
        createdAt: true,
      },
    });
    
    return NextResponse.json(updatedUser);
    
  } catch (error) {
    console.error('Error updating user:', error);
    
    // Check for unique constraint errors (e.g., duplicate email)
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        { error: 'Email already in use' },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update user' },
      { status: 500 }
    );
  }
}

// DELETE a user by ID
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check if user is authenticated and is an admin
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Check if user is an admin
    const adminUser = await prisma.user.findUnique({
      where: { email: session.user.email as string },
      select: { isAdmin: true }
    });
    
    if (!adminUser?.isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    const userId = params.id;
    
    // Check if user exists
    const userExists = await prisma.user.findUnique({
      where: { id: userId },
    });
    
    if (!userExists) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Prevent deleting yourself
    if (userExists.email === session.user.email) {
      return NextResponse.json(
        { error: 'You cannot delete your own account' },
        { status: 400 }
      );
    }
    
    // Delete user's accounts, sessions, and other related data
    await prisma.$transaction([
      prisma.account.deleteMany({
        where: { userId },
      }),
      prisma.session.deleteMany({
        where: { userId },
      }),
      prisma.endorsement.deleteMany({
        where: { userId },
      }),
      prisma.reply.deleteMany({
        where: { userId },
      }),
      prisma.request.deleteMany({
        where: { userId },
      }),
      prisma.user.delete({
        where: { id: userId },
      }),
    ]);
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { error: 'Failed to delete user' },
      { status: 500 }
    );
  }
}
