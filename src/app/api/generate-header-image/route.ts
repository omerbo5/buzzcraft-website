import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

// This endpoint generates a header SVG image for the "How It Works" section
export async function GET() {
  try {
    // Create a header illustration for the How It Works section
    const headerSVG = `
    <svg width="800" height="200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#eff6ff;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#dbeafe;stop-opacity:1" />
        </linearGradient>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#0000001a" />
        </filter>
      </defs>
      
      <!-- Background -->
      <rect width="800" height="200" fill="url(#bgGrad)" rx="12" />
      
      <!-- Step 1 -->
      <circle cx="180" cy="100" r="50" fill="#bfdbfe" />
      <rect x="167.5" y="85" width="25" height="30" rx="2" fill="#3b82f6" />
      <circle cx="180" cy="80" r="5" fill="white" />
      
      <!-- Step 2 -->
      <circle cx="325" cy="100" r="40" fill="#c7d2fe" />
      <path d="M325,80 a20,20 0 1,1 -10,38 a20,20 0 1,1 10,-38" stroke="#4f46e5" fill="none" stroke-width="4" />
      <circle cx="315" cy="100" r="5" fill="#4f46e5" />
      <path d="M335,118 L345,128" stroke="#4f46e5" stroke-width="4" />
      
      <!-- Step 3 -->
      <circle cx="450" cy="100" r="40" fill="#bbf7d0" />
      <rect x="430" y="85" width="40" height="30" rx="4" fill="#16a34a" />
      <line x1="437" y1="95" x2="463" y2="95" stroke="white" stroke-width="3" />
      <line x1="437" y1="105" x2="463" y2="105" stroke="white" stroke-width="3" />
      
      <!-- Step 4 -->
      <circle cx="575" cy="100" r="40" fill="#fef08a" />
      <line x1="555" y1="100" x2="595" y2="100" stroke="#ca8a04" stroke-width="3" />
      <line x1="555" y1="90" x2="595" y2="90" stroke="#ca8a04" stroke-width="3" />
      <line x1="555" y1="110" x2="595" y2="110" stroke="#ca8a04" stroke-width="3" />
      <line x1="565" y1="80" x2="565" y2="120" stroke="#ca8a04" stroke-width="3" />
      <line x1="585" y1="80" x2="585" y2="120" stroke="#ca8a04" stroke-width="3" />
      
      <!-- Connector Lines -->
      <line x1="230" y1="100" x2="285" y2="100" stroke="#3b82f6" stroke-width="2" stroke-dasharray="5,5" />
      <line x1="365" y1="100" x2="410" y2="100" stroke="#4f46e5" stroke-width="2" stroke-dasharray="5,5" />
      <line x1="490" y1="100" x2="535" y2="100" stroke="#16a34a" stroke-width="2" stroke-dasharray="5,5" />
      
      <!-- Light Circles for Depth -->
      <circle cx="150" cy="50" r="15" fill="#bfdbfe" opacity="0.5" />
      <circle cx="650" cy="150" r="25" fill="#fef08a" opacity="0.5" />
      <circle cx="700" cy="70" r="20" fill="#bbf7d0" opacity="0.5" />
      <circle cx="400" cy="40" r="10" fill="#c7d2fe" opacity="0.5" />
    </svg>
    `;

    const svgBuffer = Buffer.from(headerSVG);
    
    // Save to public images folder
    const imagePath = path.join(process.cwd(), 'public', 'images', 'steps', 'how-it-works-header.svg');
    await writeFile(imagePath, svgBuffer);
    
    return NextResponse.json({ 
      success: true, 
      message: 'Header image created successfully',
      path: '/images/steps/how-it-works-header.svg'
    });
  } catch (error) {
    console.error('Error creating image:', error);
    return NextResponse.json({ success: false, error: 'Failed to create image' }, { status: 500 });
  }
}
