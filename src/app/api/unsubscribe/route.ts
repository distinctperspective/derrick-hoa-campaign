import { NextResponse } from 'next/server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        // Update the contact's unsubscribed status in Resend Audiences
        await resend.contacts.update({
            email,
            unsubscribed: true,
            audienceId: process.env.RESEND_AUDIENCE_ID as string
        });

        return NextResponse.json({ message: 'Successfully unsubscribed' }, { status: 200 });
    } catch (error) {
        console.error('Error unsubscribing:', error);
        return NextResponse.json({ error: 'Failed to unsubscribe' }, { status: 500 });
    }
}
