import { Resend } from 'resend';

// Initialize Resend only if API key is available
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendWelcomeEmail(email: string, name: string, isProfileComplete: boolean = false) {
  try {
    // If Resend is not initialized, log a warning and return success to prevent build failures
    if (!resend) {
      console.warn('Resend API key not found. Email sending is disabled.');
      return { success: true, data: null };
    }

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
                    
                    <p style="font-size: 16px; line-height: 1.5; margin: 0 0 15px 0;">We look forward to your participation in our community!</p>
                    
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
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Exception sending welcome email:', error);
    return { success: false, error };
  }
}
