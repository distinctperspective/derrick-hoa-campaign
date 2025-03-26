import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';

// Create a new instance of PrismaClient for this API route
const prisma = new PrismaClient();

// Get all endorsements for the current user
export async function GET() {
    try {
        // Check authentication
        const session = await getServerSession(authOptions);
        
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        
        // Get user's endorsements
        const endorsements = await prisma.endorsement.findMany({
            where: { userId: session.user.id },
            orderBy: { createdAt: 'desc' }
        });
        
        return NextResponse.json({ endorsements }, { status: 200 });
    } catch (error) {
        console.error('Error fetching user endorsements:', error);
        return NextResponse.json({ error: 'Failed to fetch endorsements' }, { status: 500 });
    }
}
