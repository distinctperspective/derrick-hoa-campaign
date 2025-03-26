import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';

// Create a new instance of PrismaClient for this API route
const prisma = new PrismaClient();

export async function GET() {
    try {
        // Get approved endorsements using direct SQL query
        const endorsements = await prisma.$queryRaw`
            SELECT * FROM "Endorsement" 
            WHERE "isApproved" = true 
            ORDER BY "createdAt" DESC
        `;
        
        console.log('Fetched endorsements from DB:', endorsements);
        
        return NextResponse.json({ endorsements }, { status: 200 });
    } catch (error) {
        console.error('Error fetching endorsements:', error);
        return NextResponse.json({ error: 'Failed to fetch endorsements' }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        // Check authentication
        const session = await getServerSession(authOptions);
        
        console.log('Session:', JSON.stringify(session, null, 2));
        
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        
        // Check if user has an address
        if (!session.user.address) {
            return NextResponse.json({ error: 'Address required' }, { status: 400 });
        }
        
        // Get endorsement message from request
        const { message } = await req.json();
        
        if (!message || typeof message !== 'string' || message.trim() === '') {
            return NextResponse.json({ error: 'Endorsement message is required' }, { status: 400 });
        }
        
        console.log('Creating endorsement with userId:', session.user.id);
        
        // Extract street name from address
        const addressParts = session.user.address.split(',');
        let streetName = 'Resident';
        
        // Try to extract street name from address
        if (addressParts.length > 0) {
            const firstPart = addressParts[0].trim();
            // Extract street name (remove house number)
            const streetMatch = firstPart.match(/\d+\s+(.+)/);
            if (streetMatch && streetMatch[1]) {
                streetName = streetMatch[1];
            }
        }
        
        // Get user initials
        let initials = '';
        if (session.user.name) {
            const nameParts = session.user.name.split(' ');
            if (nameParts.length >= 2) {
                initials = `${nameParts[0][0]}.${nameParts[nameParts.length - 1][0]}.`;
            } else if (nameParts.length === 1) {
                initials = `${nameParts[0][0]}.`;
            }
        }
        
        try {
            // Create the endorsement using direct SQL query
            const displayName = `Resident on ${streetName} - ${initials}`;
            const userId = session.user.id;
            const isApproved = false;
            
            const result = await prisma.$executeRaw`
                INSERT INTO "Endorsement" ("id", "userId", "message", "displayName", "isApproved", "createdAt", "updatedAt")
                VALUES (gen_random_uuid(), ${userId}, ${message}, ${displayName}, ${isApproved}, NOW(), NOW())
                RETURNING *
            `;
            
            return NextResponse.json({ success: true, result }, { status: 201 });
        } catch (prismaError) {
            console.error('Prisma error creating endorsement:', prismaError);
            return NextResponse.json({ 
                error: `Database error: ${prismaError instanceof Error ? prismaError.message : 'Unknown error'}` 
            }, { status: 500 });
        }
    } catch (error) {
        console.error('Error submitting endorsement:', error);
        
        // Check if it's a Prisma error with more details
        if (error instanceof Error) {
            return NextResponse.json({ 
                error: `Failed to submit endorsement: ${error.message}` 
            }, { status: 500 });
        }
        
        return NextResponse.json({ error: 'Failed to submit endorsement' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        // Check authentication
        const session = await getServerSession(authOptions);
        
        if (!session?.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        
        // Get endorsement ID from request
        const { endorsementId } = await req.json();
        
        if (!endorsementId) {
            return NextResponse.json({ error: 'Endorsement ID is required' }, { status: 400 });
        }
        
        // Check if the endorsement belongs to the user
        const endorsement = await prisma.endorsement.findUnique({
            where: { id: endorsementId },
            select: { userId: true }
        });
        
        if (!endorsement) {
            return NextResponse.json({ error: 'Endorsement not found' }, { status: 404 });
        }
        
        // Only allow users to delete their own endorsements
        if (endorsement.userId !== session.user.id) {
            return NextResponse.json({ error: 'You can only delete your own endorsements' }, { status: 403 });
        }
        
        // Delete the endorsement
        await prisma.endorsement.delete({
            where: { id: endorsementId }
        });
        
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Error deleting endorsement:', error);
        return NextResponse.json({ 
            error: error instanceof Error ? error.message : 'An unknown error occurred' 
        }, { status: 500 });
    }
}
