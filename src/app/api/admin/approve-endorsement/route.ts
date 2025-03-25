import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';

// Create a new instance of PrismaClient for this API route
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        // Check authentication
        const session = await getServerSession(authOptions);
        
        // Ensure user is authenticated and has admin privileges
        // For now, we'll just check if they're authenticated
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        
        // Get endorsement ID from request
        const { endorsementId } = await req.json();
        
        if (!endorsementId) {
            return NextResponse.json({ error: 'Endorsement ID is required' }, { status: 400 });
        }
        
        // Update the endorsement to be approved
        await prisma.$executeRaw`
            UPDATE "Endorsement"
            SET "isApproved" = true
            WHERE "id" = ${endorsementId}
        `;
        
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Error approving endorsement:', error);
        
        if (error instanceof Error) {
            return NextResponse.json({ 
                error: `Failed to approve endorsement: ${error.message}` 
            }, { status: 500 });
        }
        
        return NextResponse.json({ error: 'Failed to approve endorsement' }, { status: 500 });
    }
}
