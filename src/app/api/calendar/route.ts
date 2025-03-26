import { NextResponse } from 'next/server';
import ical from 'ical';

export async function GET() {
  try {
    const response = await fetch(
      'https://timelyapp.time.ly/api/calendars/54734012/export?format=ics&target=copy&start_date=2025-03-26'
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch calendar data: ${response.status}`);
    }
    
    const icsData = await response.text();
    const calendarData = ical.parseICS(icsData);
    
    // Convert to a more usable format for our frontend
    const events = Object.values(calendarData)
      .filter((event: any) => event.type === 'VEVENT')
      .map((event: any) => {
        console.log('Raw event data:', JSON.stringify(event, null, 2));
        
        const startDate = event.start ? new Date(event.start) : null;
        const endDate = event.end ? new Date(event.end) : null;
        
        // Extract image URL from custom X-WP-IMAGES-URL property if available
        let imageUrl = null;
        if (event['x-wp-images-url']) {
          imageUrl = event['x-wp-images-url'];
        } else {
          imageUrl = extractImageUrl(event.description || '');
        }
        
        return {
          id: event.uid,
          title: event.summary,
          description: event.description,
          location: event.location,
          start: startDate ? startDate.toISOString() : null,
          end: endDate ? endDate.toISOString() : null,
          url: event.url,
          image: imageUrl
        };
      })
      .sort((a: any, b: any) => {
        if (!a.start) return 1;
        if (!b.start) return -1;
        return new Date(a.start).getTime() - new Date(b.start).getTime();
      });
    
    return NextResponse.json({ events });
  } catch (error) {
    console.error('Error processing calendar data:', error);
    return NextResponse.json(
      { error: 'Failed to process calendar data' },
      { status: 500 }
    );
  }
}

// Function to extract image URLs from event descriptions
function extractImageUrl(description: string): string | null {
  // Look for image URLs in the description
  const imgRegex = /https:\/\/timelyapp-prod\.s3\.us-west-2\.amazonaws\.com\/images\/[^"'\s)]+/g;
  const matches = description.match(imgRegex);
  
  if (matches && matches.length > 0) {
    // Remove any trailing quotes or apostrophes
    let imageUrl = matches[0];
    imageUrl = imageUrl.replace(/['"]$/, '');
    console.log('Found image URL:', imageUrl);
    return imageUrl;
  }
  
  return null;
}
