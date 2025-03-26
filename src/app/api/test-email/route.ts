import { NextRequest, NextResponse } from 'next/server';
import { sendWelcomeEmail } from '@/app/utils/sendEmail';

export async function GET(request: NextRequest) {
  try {
    // Get profile completion status from query parameter (default to incomplete)
    const { searchParams } = new URL(request.url);
    const isProfileComplete = searchParams.get('complete') === 'true';
    
    // Send test email with profile completion status
    const result = await sendWelcomeEmail(
      'dthreatt@digitalcreations.net', 
      'Derrick Threatt',
      isProfileComplete
    );
    
    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: `Test email sent successfully (Profile ${isProfileComplete ? 'complete' : 'incomplete'})`,
        data: result.data
      });
    } else {
      return NextResponse.json({ 
        success: false, 
        message: 'Failed to send test email',
        error: result.error
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in test-email route:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Error sending test email',
      error
    }, { status: 500 });
  }
}
