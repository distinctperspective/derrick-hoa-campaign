import { Resend } from 'resend';

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

export async function sendRequestReplyEmail(
  toEmail: string, 
  toName: string, 
  requestTitle: string, 
  requestDescription: string,
  replyContent: string
) {
  try {
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
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title>Response to your HOA Request</title>
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
                    <h2 style="color: #0f766e; font-size: 24px; margin: 0 0 20px 0;">Response to Your Request</h2>
                    <p style="font-size: 16px; line-height: 1.5; margin: 0 0 15px 0;">Hello ${toName},</p>
                    <p style="font-size: 16px; line-height: 1.5; margin: 0 0 15px 0;">Thank you for submitting your request. We've reviewed it and have a response for you.</p>
                    
                    <div style="background-color: #f6f6f6; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
                      <h3 style="color: #0f766e; font-size: 18px; margin: 0 0 10px 0;">Your Request: ${requestTitle}</h3>
                      <p style="font-size: 14px; line-height: 1.5; margin: 0 0 10px 0; color: #666;">${requestDescription}</p>
                    </div>
                    
                    <div style="background-color: #e6f7f5; padding: 15px; border-radius: 5px; margin-bottom: 20px; border-left: 4px solid #0f766e;">
                      <h3 style="color: #0f766e; font-size: 18px; margin: 0 0 10px 0;">Our Response:</h3>
                      <p style="font-size: 16px; line-height: 1.5; margin: 0;">${replyContent}</p>
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
                    
                    <!-- Response Time Information -->
                    <p style="font-size: 12px; color: #6b7280; text-align: center; margin-top: 20px; border-top: 1px solid #e5e7eb; padding-top: 10px;">
                      Response time: ${calculateResponseTime(requestDescription)}
                    </p>
                    
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
        <table role="presentation" width="100%">
          <tr>
            <td style="padding: 20px; text-align: center; font-size: 12px; color: #999999;">
              <p style="margin-bottom: 10px;">This email was sent in response to your request on the GCPHOA website.</p>
              <p style="margin: 0;"> 2025 Derrick Threatt for GCPHOA</p>
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
    console.error('Error in sendRequestReplyEmail:', error);
    return { success: false, error };
  }
}

// Function to calculate response time
function calculateResponseTime(requestDescription: string): string {
  try {
    // Get current date for response time
    const responseDate = new Date();
    
    // Try to extract the request date from the description
    // Looking for format like "Submitted on Mar 29, 2025, 11:45 AM"
    const dateMatch = requestDescription.match(/Submitted on ([A-Za-z]+ \d+, \d+, \d+:\d+ [AP]M)/);
    
    if (!dateMatch) {
      console.log('Could not find date in request description');
      return '30 minutes'; // Default fallback
    }
    
    const dateStr = dateMatch[1];
    console.log('Extracted date string:', dateStr);
    
    const requestDate = new Date(dateStr);
    console.log('Parsed request date:', requestDate);
    console.log('Current response date:', responseDate);
    
    // Calculate the difference in milliseconds
    const diffTime = Math.abs(responseDate.getTime() - requestDate.getTime());
    console.log('Time difference in ms:', diffTime);
    
    // Convert to days, hours, minutes
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    
    console.log(`Calculated time: ${diffDays} days, ${diffHours} hours, ${diffMinutes} minutes`);
    
    // Format the response time message
    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''}, ${diffHours} hour${diffHours > 1 ? 's' : ''}`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''}, ${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
    } else if (diffMinutes > 0) {
      return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
    } else {
      return 'less than a minute'; // For very quick responses
    }
  } catch (error) {
    console.error('Error calculating response time:', error);
    return '30 minutes'; // Default fallback time
  }
}
