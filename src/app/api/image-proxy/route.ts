import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url');
  
  if (!url) {
    return NextResponse.json(
      { error: 'Missing URL parameter' },
      { status: 400 }
    );
  }
  
  try {
    const imageResponse = await fetch(url);
    
    if (!imageResponse.ok) {
      throw new Error(`Failed to fetch image: ${imageResponse.status}`);
    }
    
    const imageBuffer = await imageResponse.arrayBuffer();
    const contentType = imageResponse.headers.get('content-type') || 'image/jpeg';
    
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    console.error('Error proxying image:', error);
    return NextResponse.json(
      { error: 'Failed to proxy image' },
      { status: 500 }
    );
  }
}
