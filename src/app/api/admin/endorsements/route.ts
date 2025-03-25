import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';

// Create a new instance of PrismaClient for this API route
const prisma = new PrismaClient();

export async function GET() {
    try {
        // Check authentication
        const session = await getServerSession(authOptions);
        
        // Ensure user is authenticated
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        
        // Get all endorsements with user details using raw SQL to avoid schema issues
        const endorsements = await prisma.$queryRaw`
            SELECT e.*, 
                   u.id as "userId", 
                   u.name as "userName", 
                   u.email as "userEmail", 
                   u.image as "userImage", 
                   u.address as "userAddress",
                   u."isResident" as "userIsResident"
            FROM "Endorsement" e
            LEFT JOIN "User" u ON e."userId" = u.id
            ORDER BY e."createdAt" DESC
        `;
        
        // Format the data to match the expected structure
        const formattedEndorsements = (endorsements as any[]).map(e => ({
            id: e.id,
            userId: e.userId,
            message: e.message,
            displayName: e.displayName,
            isApproved: e.isApproved,
            createdAt: e.createdAt,
            user: {
                id: e.userId,
                name: e.userName,
                email: e.userEmail,
                image: e.userImage,
                address: e.userAddress,
                isResident: e.userIsResident
            }
        }));
        
        return NextResponse.json({ endorsements: formattedEndorsements }, { status: 200 });
    } catch (error) {
        console.error('Error fetching endorsements for admin:', error);
        return NextResponse.json({ error: 'Failed to fetch endorsements' }, { status: 500 });
    }
}
