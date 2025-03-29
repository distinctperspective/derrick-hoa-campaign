import { Resend } from 'resend';
import prisma from '@/lib/prisma';

// Initialize Resend directly with API key
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendWelcomeEmail(email: string, name: string, isProfileComplete: boolean = false) {
  try {
    // If Resend is not initialized, log a warning and return success to prevent build failures
    if (!resend) {
      console.warn('Resend API key not found. Email sending is disabled.');
      return { success: true, data: null };
    }

    console.log('Sending welcome email to:', email);

    // Explicitly set the from address
    const fromEmail = 'derrickthreatt@gcphoatx.com';
    console.log('Setting welcome email from address to:', fromEmail);

    const { data, error } = await resend.emails.send({
      from: 'Derrick Threatt <derrickthreatt@gcphoatx.com>',
      to: [email],
      subject: 'Welcome to Derrick for GCPHOA',
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title>Welcome to Derrick for GCPHOA</title>
</head>
<body style="background-color: #f6f6f6; font-family: Arial, sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f6f6f6;">
    <tr>
      <td>&nbsp;</td>
      <td width="600" style="display: block; max-width: 600px; margin: 0 auto; padding: 20px;">
        
        <!-- Header -->
        <table role="presentation" width="100%" style="background-color: #0f766e; border-radius: 8px 8px 0 0; margin-bottom: 0;">
          <tr>
            <td style="padding: 20px; text-align: center; color: white;">
              <img src="https://gcphoatx.com/_next/image?url=%2Fimages%2Fdtlogo.png&w=384&q=75" alt="Derrick Threatt Logo" style="max-width: 200px; height: auto; margin-bottom: 15px;">
              <p style="margin: 10px 0 0 0; font-size: 16px;">Building a stronger community together</p>
            </td>
          </tr>
        </table>
        
        <!-- Main Content -->
        <table role="presentation" width="100%" style="background-color: white; border-radius: 0 0 8px 8px; margin-top: 0;">
          <tr>
            <td style="padding: 30px;">
              <table role="presentation" width="100%">
                <tr>
                  <td>
                    <h2 style="color: #0f766e; font-size: 24px; margin: 0 0 20px 0;">Welcome to Our Community!</h2>
                    <p style="font-size: 16px; line-height: 1.5; margin: 0 0 15px 0;">Hello ${name || 'Neighbor'},</p>
                    <p style="font-size: 16px; line-height: 1.5; margin: 0 0 15px 0;">Thank you for creating an account on our community platform. We're excited to have you join us!</p>
                    <p style="font-size: 16px; line-height: 1.5; margin: 0 0 15px 0;">As a registered user, you can now:</p>
                    
                    <table role="presentation" width="100%" style="margin-bottom: 20px;">
                      <tr>
                        <td width="20" style="vertical-align: top; padding-right: 10px;">•</td>
                        <td style="font-size: 16px; line-height: 1.5;">Endorse Derrick's campaign for GCPHOA</td>
                      </tr>
                      <tr>
                        <td width="20" style="vertical-align: top; padding-right: 10px;">•</td>
                        <td style="font-size: 16px; line-height: 1.5;">Stay updated on community events and news</td>
                      </tr>
                      <tr>
                        <td width="20" style="vertical-align: top; padding-right: 10px;">•</td>
                        <td style="font-size: 16px; line-height: 1.5;">Access exclusive community resources</td>
                      </tr>
                      <tr>
                        <td width="20" style="vertical-align: top; padding-right: 10px;">•</td>
                        <td style="font-size: 16px; line-height: 1.5;">Connect with neighbors and build relationships</td>
                      </tr>
                    </table>
                    
                    ${isProfileComplete ? 
                      `<p style="font-size: 16px; line-height: 1.5; margin: 0 0 25px 0;">Thank you for registering and confirming that you are a resident of Grand Central Park. Your participation in our community is greatly appreciated!</p>` 
                      : 
                      `<p style="font-size: 16px; line-height: 1.5; margin: 0 0 25px 0;">If you would like to endorse me or send me a message, please complete your profile by adding your address and phone number. This helps us verify that you are a resident of Grand Central Park.</p>`
                    }
                    
                    <p style="font-size: 16px; line-height: 1.5; margin: 0 0 25px 0;">If you have any questions or need assistance, please don't hesitate to reach out.</p>
                    
                    <!-- Button -->
                    <table role="presentation" width="100%" style="margin-bottom: 25px;">
                      <tr>
                        <td align="center">
                          <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                              <td style="display: inline-flex; align-items: center; justify-content: center; border-radius: 9999px; background-color: #40C5B5; font-weight: bold; transition-property: color, background-color, border-color; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms;">
                                <a href="https://gcphoatx.com" target="_blank" style="display: inline-block; color: white; font-size: 0.875rem; font-weight: bold; text-decoration: none; padding: 0.625rem 1.5rem;">Visit Website</a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    
                    <p style="font-size: 16px; line-height: 1.5; margin: 25px 0 0 0;">We look forward to your participation in our community!</p>
                    
                    <p style="font-size: 16px; line-height: 1.5; margin: 25px 0 0 0;">Best regards,<br>
                    <strong>Derrick Threatt</strong><br>
                    Candidate for GCPHOA</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        
        <!-- Footer -->
        <table role="presentation" width="100%" style="margin-top: 20px;">
          <tr>
            <td style="padding: 10px; text-align: center; font-size: 12px; color: #999999;">
              <p style="margin: 0 0 10px 0;">This email was sent to ${email}.</p>
              <p style="margin: 0;">${new Date().getFullYear()} Derrick for GCPHOA. All rights reserved.</p>
            </td>
          </tr>
        </table>
        
      </td>
      <td>&nbsp;</td>
    </tr>
  </table>
</body>
</html>
      `,
      text: `
Welcome to Derrick for GCPHOA!

Hello ${name || 'Neighbor'},

Thank you for creating an account on our community platform. We're excited to have you join us!

As a registered user, you can now:
• Endorse Derrick's campaign for GCPHOA
• Stay updated on community events and news
• Access exclusive community resources
• Connect with neighbors and build relationships

${isProfileComplete ? 
  `Thank you for registering and confirming that you are a resident of Grand Central Park. Your participation in our community is greatly appreciated!` 
  : 
  `If you would like to endorse me or send me a message, please complete your profile by adding your address and phone number. This helps us verify that you are a resident of Grand Central Park.`
}

If you have any questions or need assistance, please don't hesitate to reach out.

Visit our website: https://gcphoatx.com

We look forward to your participation in our community!

Best regards,
Derrick Threatt
Candidate for GCPHOA

---
This email was sent to ${email}.
${new Date().getFullYear()} Derrick for GCPHOA. All rights reserved.
      `,
    });

    if (error) {
      console.error('Error sending welcome email:', error);
      
      // Check for specific Resend testing mode error
      if (typeof error === 'object' && 'message' in error && 
          typeof error.message === 'string' && error.message.includes('testing emails')) {
        console.error('RESEND ACCOUNT ISSUE: Your account appears to be in testing mode despite domain verification. Please contact Resend support to fully activate your account.');
      }
      
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Exception sending welcome email:', error);
    return { success: false, error };
  }
}

// Type for reply in email
type EmailReply = {
  content: string;
  userName: string;
  createdAt: string;
  isLatest: boolean;
  userImage?: string | null;
  isAdmin?: boolean;
};

// Function to convert URLs in text to hyperlinks
function linkifyText(text: string): string {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, (url) => {
    return `<a href="${url}" target="_blank" style="color: #0f766e; text-decoration: underline;">${url}</a>`;
  });
}

// Function to format date in a more readable format
function formatEmailDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

// Function to get initials from name
function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);
}

export async function sendRequestReplyEmail(
  toEmail: string, 
  requestTitle: string, 
  requestDescription: string,
  replyContent: string,
  requestId: string,
  replierName: string,
  replierImage?: string | null
) {
  try {
    // Get the request from the database to access the actual createdAt timestamp
    const request = await prisma.request.findUnique({
      where: { id: requestId },
      include: {
        replies: {
          orderBy: { createdAt: 'asc' },
          take: 1
        }
      }
    });

    if (!request) {
      console.error('Request not found for ID:', requestId);
      return { success: false, error: 'Request not found' };
    }

    // Format the dates for display
    const requestDate = new Date(request.createdAt);
    const formattedRequestDate = requestDate.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    // Calculate response time from request creation to first reply
    let responseTimeText = '';
    if (request.replies && request.replies.length > 0) {
      const firstReply = request.replies[0];
      const firstReplyDate = new Date(firstReply.createdAt);
      const responseTimeMs = firstReplyDate.getTime() - requestDate.getTime();
      responseTimeText = calculateResponseTime(responseTimeMs);
    }

    // Get all replies for this request to include in the email
    const allRepliesData = await prisma.reply.findMany({
      where: { requestId },
      orderBy: { createdAt: 'asc' },
      include: {
        user: {
          select: {
            name: true,
            image: true,
            isAdmin: true
          }
        }
      }
    });

    // Transform the replies to the format needed for the email
    const formattedReplies: EmailReply[] = allRepliesData.map((reply, index) => ({
      content: reply.content,
      userName: reply.user.name || reply.userName,
      createdAt: new Date(reply.createdAt).toISOString(),
      isLatest: index === allRepliesData.length - 1,
      userImage: reply.user.image,
      isAdmin: reply.user.isAdmin
    }));

    // If Resend is not initialized, log a warning and return success to prevent build failures
    if (!resend) {
      console.warn('Resend API key not found. Email sending is disabled.');
      return { success: false, error: 'Resend API key not found' };
    }

    console.log('Attempting to send email to:', toEmail);
    
    const { data, error } = await resend.emails.send({
      from: 'Derrick Threatt <derrickthreatt@gcphoatx.com>',
      to: [toEmail],
      subject: `Response to your request: ${requestTitle}`,
      html: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Response to Your Request</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f9fafb;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
      <!-- Header with Logo -->
      <div style="background-color: #0f766e; padding: 24px; text-align: center;">
        <img src="https://gcphoatx.com/_next/image?url=%2Fimages%2Fdtlogo.png&w=384&q=75" alt="Derrick Threatt Logo" style="max-width: 200px; height: auto; margin-bottom: 10px;">
        <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Response to Your Request</h1>
        <p style="color: #ffffff; margin: 5px 0 0 0; font-size: 16px;">Building a stronger community together</p>
      </div>
      
      <!-- Content -->
      <div style="padding: 24px;">
        <p style="font-size: 16px; margin-top: 0;">Hello,</p>
        
        <p style="font-size: 16px;">Thank you for submitting your request. We have reviewed it and provided a response below.</p>
        
        <!-- Request Details -->
        <div style="background-color: #f3f4f6; padding: 16px; border-radius: 8px; margin-bottom: 24px;">
          <h2 style="color: #0f766e; font-size: 18px; margin-top: 0; margin-bottom: 12px;">Your Request</h2>
          <p style="font-size: 16px; font-weight: bold; margin-top: 0; margin-bottom: 8px;">${requestTitle}</p>
          <p style="margin-top: 0; margin-bottom: 8px;">${linkifyText(requestDescription.replace(/Submitted on [A-Za-z]+ \d+, \d+, \d+:\d+ [AP]M/g, '').trim())}</p>
          <p style="font-size: 14px; color: #6b7280; margin-bottom: 0;">Submitted on ${formattedRequestDate}</p>
        </div>
        
        <!-- Conversation Thread -->
        <div style="margin-bottom: 24px;">
          <h2 style="color: #0f766e; font-size: 18px; margin-bottom: 16px;">Conversation</h2>
          
          ${formattedReplies && formattedReplies.length > 0 ? 
            formattedReplies.map(reply => `
              <div style="margin-bottom: 16px; ${reply.isLatest ? 'background-color: #f0f9ff; border-left: 4px solid #0f766e;' : 'background-color: #f9fafb;'} padding: 12px; border-radius: 4px;">
                <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 8px;">
                  <tr>
                    <td width="40" valign="top">
                      ${reply.userImage ? 
                        `<img src="${reply.userImage}" alt="${reply.userName}" style="width: 32px; height: 32px; border-radius: 50%; margin-right: 8px;">` : 
                        `<div style="width: 32px; height: 32px; border-radius: 50%; background-color: #0f766e; color: white; display: flex; align-items: center; justify-content: center; margin-right: 8px; font-size: 12px; font-weight: bold;">${getInitials(reply.userName)}</div>`
                      }
                    </td>
                    <td valign="top">
                      <strong style="color: #0f766e; display: block;">${reply.userName}</strong>
                      <span style="color: #6b7280; font-size: 12px; display: block;">${formatEmailDate(reply.createdAt)}</span>
                    </td>
                  </tr>
                </table>
                <div style="white-space: pre-wrap; margin-left: 40px;">${linkifyText(reply.content)}</div>
              </div>
            `).join('') 
            : 
            `<div style="margin-bottom: 16px; background-color: #f0f9ff; border-left: 4px solid #0f766e; padding: 12px; border-radius: 4px;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom: 8px;">
                <tr>
                  <td width="40" valign="top">
                    <div style="width: 32px; height: 32px; border-radius: 50%; background-color: #0f766e; color: white; display: flex; align-items: center; justify-content: center; margin-right: 8px; font-size: 12px; font-weight: bold;">DT</div>
                  </td>
                  <td valign="top">
                    <strong style="color: #0f766e; display: block;">Derrick Threatt</strong>
                    <span style="color: #6b7280; font-size: 12px; display: block;">${formatEmailDate(new Date())}</span>
                  </td>
                </tr>
              </table>
              <div style="white-space: pre-wrap; margin-left: 40px;">${linkifyText(replyContent)}</div>
            </div>`
          }
        </div>
        
        <p style="font-size: 16px; line-height: 1.5; margin: 0 0 15px 0;">If you have any further questions or need additional assistance, please don't hesitate to reply to this email or submit another request through our website.</p>
        
        <div style="background-color: #f6f6f6; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
          <h3 style="color: #0f766e; font-size: 18px; margin: 0 0 10px 0;">Contact Information:</h3>
          <p style="font-size: 14px; line-height: 1.5; margin: 0 0 5px 0;">
            <strong>Email:</strong> <a href="mailto:derrickthreatt@gcphoatx.com" style="color: #0f766e; text-decoration: none;">derrickthreatt@gcphoatx.com</a>
          </p>
          <p style="font-size: 14px; line-height: 1.5; margin: 0;">
            <strong>Phone:</strong> <a href="tel:+19365246473" style="color: #0f766e; text-decoration: none;">(936) 524-6473</a>
          </p>
        </div>
        
        <!-- Button -->
        <table role="presentation" width="100%" style="margin-bottom: 25px;">
          <tr>
            <td>
              <table role="presentation" align="center" style="margin:0 auto;">
                <tr>
                  <td style="border-radius: 4px; background: #0f766e; text-align: center;">
                    <a href="https://gcphoatx.com" style="background: #0f766e; border: 1px solid #0f766e; font-family: sans-serif; font-size: 15px; line-height: 15px; text-decoration: none; padding: 13px 17px; color: #ffffff; display: block; border-radius: 4px;">
                      Visit Our Website
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        
        <p style="font-size: 16px; line-height: 1.5; margin: 25px 0 0 0;">Best regards,<br>
        <strong>Derrick Threatt</strong><br>
        Grand Central Park HOA</p>
      </div>
      
      <!-- Footer -->
      <div style="background-color: #f3f4f6; padding: 16px; text-align: center; font-size: 12px; color: #6b7280;">
        <p style="margin: 0 0 8px 0;">&copy; ${new Date().getFullYear()} Derrick Threatt for GCPHOATX. All rights reserved.</p>
        
        <!-- Response Time Information -->
        <p style="font-size: 12px; color: #6b7280; text-align: center; margin-top: 10px;">
          Response time: ${responseTimeText}
        </p>
      </div>
    </div>
  </body>
</html>
      `,
    });

    if (error) {
      console.error('Error sending request reply email:', error);
      
      // Check for specific Resend testing mode error
      if (typeof error === 'object' && 'message' in error && 
          typeof error.message === 'string' && error.message.includes('testing emails')) {
        console.error('RESEND ACCOUNT ISSUE: Your account appears to be in testing mode despite domain verification. Please contact Resend support to fully activate your account.');
      }
      
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error sending request reply email:', error);
    return { success: false, error };
  }
}

// Function to calculate response time
function calculateResponseTime(responseTimeMs: number): string {
  try {
    // Calculate the difference in days, hours, minutes
    const diffDays = Math.floor(responseTimeMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((responseTimeMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((responseTimeMs % (1000 * 60 * 60)) / (1000 * 60));
    
    // If less than 1 minute but greater than 0, show as 1 minute
    const adjustedMinutes = responseTimeMs > 0 && diffMinutes === 0 ? 1 : diffMinutes;
    
    // Format the response time
    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''}, ${diffHours} hour${diffHours > 1 ? 's' : ''}`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''}, ${adjustedMinutes} minute${adjustedMinutes > 1 ? 's' : ''}`;
    } else {
      return `${adjustedMinutes} minute${adjustedMinutes > 1 ? 's' : ''}`;
    }
  } catch (error) {
    console.error('Error calculating response time:', error);
    return 'N/A';
  }
}
