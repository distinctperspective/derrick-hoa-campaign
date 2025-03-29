import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { PrismaClient } from '@prisma/client';
import { sendRequestReplyEmail } from '@/app/utils/sendEmail';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    // Get the session
    const session = await getServerSession(authOptions);

    // Check if user is authenticated
    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get the request ID from the URL
    const url = request.url;
    const urlParts = url.split('/');
    const id = urlParts[urlParts.length - 2]; // Get the ID from the URL path

    // Get the reply content from the request body
    const { content } = await request.json();

    if (!content || content.trim() === '') {
      return NextResponse.json(
        { error: 'Reply content is required' },
        { status: 400 }
      );
    }

    // Check if the request exists
    const requestExists = await prisma.request.findUnique({
      where: { id },
    });

    if (!requestExists) {
      return NextResponse.json({ error: 'Request not found' }, { status: 404 });
    }

    // Create the reply
    await prisma.reply.create({
      data: {
        content,
        requestId: id,
        userId: session.user.id as string,
        userName: session.user.name as string,
      },
    });

    // Update the request status to IN_PROGRESS if it's currently OPEN
    if (requestExists.status === 'OPEN') {
      await prisma.request.update({
        where: { id },
        data: { status: 'IN_PROGRESS' },
      });
    }

    // Fetch the updated request with replies
    const updatedRequest = await prisma.request.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            address: true,
          },
        },
        replies: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });

    // Send email notification to the requester if the user is an admin
    if (updatedRequest?.user?.email && (session.user as any).isAdmin) {
      try {
        console.log('Sending email notification for new reply');
        
        // Get all replies to include in the email
        const allReplies = updatedRequest.replies.map(reply => ({
          content: reply.content,
          userName: reply.userName,
          createdAt: reply.createdAt,
          isLatest: reply.content === content && reply.userName === session.user.name,
          userImage: reply.userId === session.user.id ? (session.user as any).image : null
        }));
        
        await sendRequestReplyEmail(
          updatedRequest.user.email,
          updatedRequest.title,
          updatedRequest.description,
          content,
          updatedRequest.id,
          session.user.name || 'Admin',
          (session.user as any).image
        );
        console.log('Email notification sent successfully');
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
        // Continue with the response even if email fails
      }
    }

    return NextResponse.json(updatedRequest);
  } catch (error) {
    console.error('Error creating reply:', error);
    return NextResponse.json(
      { error: 'Failed to create reply' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
