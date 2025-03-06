import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

// This route creates a placeholder image for development purposes
export async function GET() {
  try {
    // Create a simple SVG with a gradient background
    const svg = `
    <svg width="1200" height="800" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#4338ca;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#3b82f6;stop-opacity:1" />
        </linearGradient>
        <pattern id="pattern" width="40" height="40" patternUnits="userSpaceOnUse">
          <circle cx="20" cy="20" r="1" fill="rgba(255,255,255,0.2)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
      <rect width="100%" height="100%" fill="url(#pattern)" />
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="rgba(255,255,255,0.1)" style="font-size: 120px; font-family: sans-serif; font-weight: bold;">LeadMiner</text>
    </svg>
    `;

    // Convert SVG to buffer 
    const svgBuffer = Buffer.from(svg);
    
    // Save to public images folder
    const imagePath = path.join(process.cwd(), 'public', 'images', 'auth-bg.jpg');
    await writeFile(imagePath, svgBuffer);
    
    return NextResponse.json({ success: true, message: 'Image created successfully' });
  } catch (error) {
    console.error('Error creating image:', error);
    return NextResponse.json({ success: false, error: 'Failed to create image' }, { status: 500 });
  }
}
