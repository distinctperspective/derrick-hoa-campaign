// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Define interfaces for our data
interface User {
  id: string;
  email: string;
  name: string | null;
  address: string | null;
  phoneNumber: string | null;
  welcomeEmailSent: string | null;
  created_at: string;
}

// Helper function to send welcome email using fetch instead of Resend library
async function sendWelcomeEmail(email: string, name: string | null, isProfileComplete: boolean) {
  try {
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY environment variable is not set');
    }

    const htmlContent = `
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
              <p style="margin: 0;">&copy; ${new Date().getFullYear()} Derrick for GCPHOA. All rights reserved.</p>
            </td>
          </tr>
        </table>
        
      </td>
      <td>&nbsp;</td>
    </tr>
  </table>
</body>
</html>
    `;

    const textContent = `
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
&copy; ${new Date().getFullYear()} Derrick for GCPHOA. All rights reserved.
    `;

    // Use fetch to call Resend API directly instead of using the library
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`
      },
      body: JSON.stringify({
        from: 'Derrick Threatt <derrickthreatt@gcphoatx.com>',
        to: [email],
        subject: 'Welcome to Derrick for GCPHOA',
        html: htmlContent,
        text: textContent
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Error sending welcome email:', data);
      return { success: false, error: data };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Exception sending welcome email:', error);
    return { success: false, error };
  }
}

Deno.serve(async (req) => {
  try {
    // Log all environment variables for debugging (except sensitive ones)
    console.log('Environment variables available:');
    console.log('SUPABASE_URL available:', !!Deno.env.get('SUPABASE_URL'));
    console.log('SUPABASE_ANON_KEY available:', !!Deno.env.get('SUPABASE_ANON_KEY'));
    console.log('SUPABASE_SERVICE_ROLE_KEY available:', !!Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'));
    console.log('RESEND_API_KEY available:', !!Deno.env.get('RESEND_API_KEY'));
    
    // Get the service role key from environment variables
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error(`Missing Supabase configuration: URL=${!!supabaseUrl}, ServiceKey=${!!supabaseServiceKey}`);
    }
    
    // Create a Supabase client with the service role key for admin access
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    
    // Get current time
    const now = new Date();
    
    // Calculate the time 60 minutes ago
    const sixtyMinutesAgo = new Date(now.getTime() - 60 * 60 * 1000);
    
    console.log(`Checking for users who registered before ${sixtyMinutesAgo.toISOString()}`);
    
    // Try a simple query first to test database connection
    try {
      const { data: testData, error: testError } = await supabaseAdmin
        .from('User')
        .select('count')
        .limit(1);
        
      if (testError) {
        console.error('Test query failed:', testError);
        throw testError;
      }
      
      console.log('Test query successful:', testData);
    } catch (testQueryError) {
      console.error('Error during test query:', testQueryError);
      throw new Error(`Database connection test failed: ${String(testQueryError)}`);
    }
    
    // Query for users who registered more than 60 minutes ago and haven't received a welcome email
    const { data: users, error } = await supabaseAdmin
      .from('User')
      .select('id, email, name, address, phoneNumber, welcomeEmailSent, created_at')
      .is('welcomeEmailSent', null)
      .lt('created_at', sixtyMinutesAgo.toISOString())
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error querying users:', error);
      throw error;
    }

    console.log(`Found ${users ? users.length : 0} users who need welcome emails`);

    // If no users found, return early
    if (!users || users.length === 0) {
      return new Response(
        JSON.stringify({ message: 'No users found who need welcome emails' }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Process each user
    const results = [];
    for (const user of users) {
      if (!user.email) {
        console.log(`Skipping user ${user.id} - no email address`);
        continue;
      }

      try {
        // Check if profile is complete
        const isProfileComplete = Boolean(user.address && user.phoneNumber);
        
        console.log(`Sending welcome email to ${user.email} (profile complete: ${isProfileComplete})`);
        
        // Send welcome email
        const emailResult = await sendWelcomeEmail(
          user.email,
          user.name || 'Neighbor',
          isProfileComplete
        );
        
        if (emailResult.success) {
          // Update user record to mark email as sent
          const { error: updateError } = await supabaseAdmin
            .from('User')
            .update({ welcomeEmailSent: new Date().toISOString() })
            .eq('id', user.id);
            
          if (updateError) {
            console.error(`Error updating user ${user.id}:`, updateError);
            results.push({ userId: user.id, success: false, error: updateError });
          } else {
            console.log(`Welcome email sent successfully to ${user.email}`);
            results.push({ userId: user.id, success: true });
          }
        } else {
          console.error(`Failed to send welcome email to ${user.email}:`, emailResult.error);
          results.push({ userId: user.id, success: false, error: emailResult.error });
        }
      } catch (error) {
        console.error(`Error processing user ${user.id}:`, error);
        results.push({ userId: user.id, success: false, error: String(error) });
      }
    }

    return new Response(
      JSON.stringify({ 
        message: `Processed ${users.length} users`, 
        results 
      }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in edge function:', error);
    return new Response(
      JSON.stringify({ 
        error: String(error),
        stack: error instanceof Error ? error.stack : 'No stack trace available',
        message: error instanceof Error ? error.message : String(error)
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});
