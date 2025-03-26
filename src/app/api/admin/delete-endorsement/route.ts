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
        
        // Ensure user is authenticated and is an admin
        if (!session?.user || !(session.user as any).isAdmin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        
        // Get endorsement ID from request
        const { endorsementId } = await req.json();
        
        if (!endorsementId) {
            return NextResponse.json({ error: 'Endorsement ID is required' }, { status: 400 });
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
