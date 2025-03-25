import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get title from query params
    const title = searchParams.get('title') || 'Derrick Threatt for GCP HOA';
    const subtitle = searchParams.get('subtitle') || 'Building a stronger community together';
    
    // Use the same background image as the hero sections
    const imageData = await fetch(new URL('/images/lakehouse.jpeg', request.url)).then(
      (res) => res.arrayBuffer(),
    );
    
    // Use the logo
    const logoData = await fetch(new URL('/images/dtlogo.png', request.url)).then(
      (res) => res.arrayBuffer(),
    );
    
    // Use the cutout image
    const cutoutData = await fetch(new URL('/images/derrick-cutout.png', request.url)).then(
      (res) => res.arrayBuffer(),
    );

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background Image */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
            }}
          >
            <img
              src={`data:image/jpeg;base64,${Buffer.from(imageData).toString('base64')}`}
              alt="Background"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transform: 'scaleX(-1)', // Mirror the image like in the hero
              }}
            />
          </div>
          
          {/* Gradient Overlay - matching the hero component */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(to right, rgba(0,0,0,0.95), rgba(0,0,0,0.7), rgba(0,0,0,0.3))',
            }}
          />
          
          {/* Logo */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: -30,
              display: 'flex',
              alignItems: 'center',
              zIndex: 10,
              width: 360,
              height: 360,
            }}
          >
            <img
              src={`data:image/png;base64,${Buffer.from(logoData).toString('base64')}`}
              alt="Derrick Threatt Logo"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </div>
          
          {/* Content */}
          <div
            style={{
              position: 'absolute',
              bottom: 60,
              left: 60,
              right: 250, // Leave space for the cutout image
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              padding: '0',
            }}
          >
            <h1
              style={{
                fontSize: 60,
                fontWeight: 900,
                color: 'white',
                lineHeight: 1.2,
                marginBottom: 20,
                width: '100%',
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: 30,
                fontWeight: 700,
                color: '#E6E6E6',
                lineHeight: 1.4,
                width: '100%',
              }}
            >
              {subtitle}
            </p>
          </div>
          
          {/* Derrick cutout image on the right */}
          <div
            style={{
              position: 'absolute',
              right: 0,
              bottom: 0,
              height: '90%',
              display: 'flex',
              alignItems: 'flex-end',
              zIndex: 5,
            }}
          >
            <img
              src={`data:image/png;base64,${Buffer.from(cutoutData).toString('base64')}`}
              alt="Derrick Threatt"
              style={{
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error: any) {
    console.log(`${error.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
