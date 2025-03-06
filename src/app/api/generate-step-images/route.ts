import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

// This endpoint generates SVG images for the "How It Works" section
export async function GET() {
  try {
    // Step 1: Set Your Target Criteria
    const step1SVG = `
    <svg width="640" height="400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f8fafc;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#f1f5f9;stop-opacity:1" />
        </linearGradient>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#0000001a" />
        </filter>
      </defs>
      
      <!-- Background -->
      <rect width="640" height="400" fill="url(#bgGrad)" rx="12" />
      
      <!-- Form UI -->
      <rect x="80" y="50" width="480" height="300" rx="8" fill="white" style="filter:url(#shadow)" />
      
      <!-- Form Header -->
      <rect x="80" y="50" width="480" height="60" rx="8" fill="#3b82f6" />
      <text x="120" y="87" font-family="Arial" font-size="18" font-weight="bold" fill="white">Target Criteria Setup</text>
      
      <!-- Form Elements -->
      <text x="100" y="140" font-family="Arial" font-size="14" font-weight="bold" fill="#1e293b">Business Category</text>
      <rect x="100" y="150" width="440" height="40" rx="4" fill="#f8fafc" stroke="#e2e8f0" />
      <text x="120" y="175" font-family="Arial" font-size="14" fill="#64748b">SaaS / Software Development</text>
      
      <text x="100" y="210" font-family="Arial" font-size="14" font-weight="bold" fill="#1e293b">Target Keywords</text>
      <rect x="100" y="220" width="440" height="40" rx="4" fill="#f8fafc" stroke="#e2e8f0" />
      <text x="120" y="245" font-family="Arial" font-size="14" fill="#64748b">software development, web app, MVP, startup</text>
      
      <text x="100" y="280" font-family="Arial" font-size="14" font-weight="bold" fill="#1e293b">Subreddits to Monitor</text>
      <rect x="100" y="290" width="440" height="40" rx="4" fill="#f8fafc" stroke="#e2e8f0" />
      <text x="120" y="315" font-family="Arial" font-size="14" fill="#64748b">r/startups, r/entrepreneur, r/webdev, r/SaaS</text>
      
      <!-- Gear icons to symbolize settings -->
      <circle cx="50" cy="120" r="20" fill="#dbeafe" />
      <circle cx="590" cy="280" r="25" fill="#dbeafe" />
      <circle cx="530" cy="30" r="15" fill="#dbeafe" />
    </svg>
    `;
    
    // Step 2: Our AI Finds Potential Customers
    const step2SVG = `
    <svg width="640" height="400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f5f3ff;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#ede9fe;stop-opacity:1" />
        </linearGradient>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#0000001a" />
        </filter>
      </defs>
      
      <!-- Background -->
      <rect width="640" height="400" fill="url(#bgGrad)" rx="12" />
      
      <!-- Reddit Posts UI -->
      <rect x="90" y="50" width="460" height="300" rx="8" fill="white" style="filter:url(#shadow)" />
      
      <!-- Reddit Header -->
      <rect x="90" y="50" width="460" height="40" rx="8" fill="#ff4500" />
      <circle cx="110" cy="70" r="12" fill="white" />
      <text x="140" y="75" font-family="Arial" font-size="16" font-weight="bold" fill="white">reddit</text>
      
      <!-- Posts with AI highlighting -->
      <rect x="110" y="110" width="420" height="60" rx="4" fill="#f8fafc" stroke="#e2e8f0" />
      <rect x="110" y="110" width="5" height="60" fill="#3b82f6" />
      <text x="125" y="130" font-family="Arial" font-size="14" font-weight="bold" fill="#1e293b">Looking for developers to build my SaaS MVP</text>
      <text x="125" y="150" font-family="Arial" font-size="12" fill="#64748b">Posted in r/startups • 3h ago • by u/founder2023</text>
      <rect x="480" y="125" width="30" height="30" rx="15" fill="#c7d2fe" />
      <text x="490" y="145" font-family="Arial" font-size="14" font-weight="bold" fill="#4f46e5">AI</text>
      
      <rect x="110" y="180" width="420" height="60" rx="4" fill="#f8fafc" stroke="#e2e8f0" />
      <rect x="110" y="180" width="5" height="60" fill="#8b5cf6" />
      <text x="125" y="200" font-family="Arial" font-size="14" font-weight="bold" fill="#1e293b">Need recommendations for website builders</text>
      <text x="125" y="220" font-family="Arial" font-size="12" fill="#64748b">Posted in r/webdev • 5h ago • by u/startup_founder</text>
      <rect x="480" y="195" width="30" height="30" rx="15" fill="#c7d2fe" />
      <text x="490" y="215" font-family="Arial" font-size="14" font-weight="bold" fill="#4f46e5">AI</text>
      
      <rect x="110" y="250" width="420" height="60" rx="4" fill="#f8fafc" stroke="#e2e8f0" />
      <rect x="110" y="250" width="5" height="60" fill="#ec4899" />
      <text x="125" y="270" font-family="Arial" font-size="14" font-weight="bold" fill="#1e293b">Hiring a team to build our product - advice?</text>
      <text x="125" y="290" font-family="Arial" font-size="12" fill="#64748b">Posted in r/SaaS • 2h ago • by u/tech_entrepreneur</text>
      <rect x="480" y="265" width="30" height="30" rx="15" fill="#c7d2fe" />
      <text x="490" y="285" font-family="Arial" font-size="14" font-weight="bold" fill="#4f46e5">AI</text>
      
      <!-- AI brain visualization -->
      <circle cx="40" cy="120" r="20" fill="#e9d5ff" />
      <circle cx="600" cy="280" r="25" fill="#e9d5ff" />
      <circle cx="570" cy="30" r="15" fill="#e9d5ff" />
    </svg>
    `;
    
    // Step 3: Review and Contact Quality Leads
    const step3SVG = `
    <svg width="640" height="400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f0fdf4;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#dcfce7;stop-opacity:1" />
        </linearGradient>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#0000001a" />
        </filter>
      </defs>
      
      <!-- Background -->
      <rect width="640" height="400" fill="url(#bgGrad)" rx="12" />
      
      <!-- Dashboard UI -->
      <rect x="90" y="40" width="460" height="320" rx="8" fill="white" style="filter:url(#shadow)" />
      
      <!-- Dashboard Header -->
      <rect x="90" y="40" width="460" height="50" rx="8" fill="#1e293b" />
      <text x="120" y="70" font-family="Arial" font-size="16" font-weight="bold" fill="white">LeadMiner Dashboard - Quality Leads</text>
      
      <!-- Lead Cards -->
      <rect x="110" y="110" width="200" height="110" rx="6" fill="#f8fafc" stroke="#e2e8f0" />
      <text x="125" y="135" font-family="Arial" font-size="14" font-weight="bold" fill="#1e293b">Sarah Johnson</text>
      <text x="125" y="155" font-family="Arial" font-size="12" fill="#64748b">r/startups • Need help building MVP</text>
      <rect x="125" y="165" width="80" height="20" rx="10" fill="#dcfce7" />
      <text x="140" y="180" font-family="Arial" font-size="12" fill="#166534">87% Match</text>
      <rect x="125" y="190" width="80" height="20" rx="4" fill="#3b82f6" />
      <text x="140" y="205" font-family="Arial" font-size="12" fill="white">Contact</text>
      
      <rect x="330" y="110" width="200" height="110" rx="6" fill="#f8fafc" stroke="#e2e8f0" />
      <text x="345" y="135" font-family="Arial" font-size="14" font-weight="bold" fill="#1e293b">Michael Chen</text>
      <text x="345" y="155" font-family="Arial" font-size="12" fill="#64748b">r/SaaS • Looking for developers</text>
      <rect x="345" y="165" width="80" height="20" rx="10" fill="#dcfce7" />
      <text x="360" y="180" font-family="Arial" font-size="12" fill="#166534">92% Match</text>
      <rect x="345" y="190" width="80" height="20" rx="4" fill="#3b82f6" />
      <text x="360" y="205" font-family="Arial" font-size="12" fill="white">Contact</text>
      
      <rect x="110" y="240" width="200" height="110" rx="6" fill="#f8fafc" stroke="#e2e8f0" />
      <text x="125" y="265" font-family="Arial" font-size="14" font-weight="bold" fill="#1e293b">David Wilson</text>
      <text x="125" y="285" font-family="Arial" font-size="12" fill="#64748b">r/webdev • Need website advice</text>
      <rect x="125" y="295" width="80" height="20" rx="10" fill="#dcfce7" />
      <text x="140" y="310" font-family="Arial" font-size="12" fill="#166534">79% Match</text>
      <rect x="125" y="320" width="80" height="20" rx="4" fill="#3b82f6" />
      <text x="140" y="335" font-family="Arial" font-size="12" fill="white">Contact</text>
      
      <rect x="330" y="240" width="200" height="110" rx="6" fill="#f8fafc" stroke="#e2e8f0" />
      <text x="345" y="265" font-family="Arial" font-size="14" font-weight="bold" fill="#1e293b">Emma Martinez</text>
      <text x="345" y="285" font-family="Arial" font-size="12" fill="#64748b">r/entrepreneur • First time founder</text>
      <rect x="345" y="295" width="80" height="20" rx="10" fill="#dcfce7" />
      <text x="360" y="310" font-family="Arial" font-size="12" fill="#166534">85% Match</text>
      <rect x="345" y="320" width="80" height="20" rx="4" fill="#3b82f6" />
      <text x="360" y="335" font-family="Arial" font-size="12" fill="white">Contact</text>
      
      <!-- Checkmark icons -->
      <circle cx="40" cy="120" r="20" fill="#bbf7d0" />
      <circle cx="600" cy="280" r="25" fill="#bbf7d0" />
      <circle cx="570" cy="30" r="15" fill="#bbf7d0" />
    </svg>
    `;
    
    // Step 4: Track Conversions in the CRM
    const step4SVG = `
    <svg width="640" height="400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#fefce8;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#fef9c3;stop-opacity:1" />
        </linearGradient>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#0000001a" />
        </filter>
      </defs>
      
      <!-- Background -->
      <rect width="640" height="400" fill="url(#bgGrad)" rx="12" />
      
      <!-- CRM + Analytics UI -->
      <rect x="90" y="40" width="460" height="320" rx="8" fill="white" style="filter:url(#shadow)" />
      
      <!-- Dashboard Header -->
      <rect x="90" y="40" width="460" height="50" rx="8" fill="#1e293b" />
      <text x="120" y="70" font-family="Arial" font-size="16" font-weight="bold" fill="white">LeadMiner CRM - Conversion Analytics</text>
      
      <!-- Graph Section -->
      <rect x="110" y="110" width="420" height="140" rx="4" fill="#f8fafc" stroke="#e2e8f0" />
      
      <!-- Graph Title -->
      <text x="130" y="135" font-family="Arial" font-size="14" font-weight="bold" fill="#1e293b">Conversion Funnel</text>
      
      <!-- Funnel Graph -->
      <rect x="180" y="145" width="280" height="30" rx="4" fill="#93c5fd" />
      <text x="300" y="165" font-family="Arial" font-size="12" fill="#1e3a8a" text-anchor="middle">Leads Found (142)</text>
      
      <rect x="200" y="180" width="240" height="30" rx="4" fill="#818cf8" />
      <text x="300" y="200" font-family="Arial" font-size="12" fill="white" text-anchor="middle">Contacted (98)</text>
      
      <rect x="220" y="215" width="200" height="30" rx="4" fill="#8b5cf6" />
      <text x="300" y="235" font-family="Arial" font-size="12" fill="white" text-anchor="middle">Responded (63)</text>
      
      <!-- Pipeline Table -->
      <rect x="110" y="260" width="420" height="90" rx="4" fill="#f8fafc" stroke="#e2e8f0" />
      <text x="130" y="285" font-family="Arial" font-size="14" font-weight="bold" fill="#1e293b">Pipeline Status</text>
      
      <rect x="130" y="300" width="100" height="25" rx="4" fill="#dbeafe" />
      <text x="150" y="317" font-family="Arial" font-size="12" fill="#1e40af">New (25)</text>
      
      <rect x="240" y="300" width="100" height="25" rx="4" fill="#c7d2fe" />
      <text x="260" y="317" font-family="Arial" font-size="12" fill="#3730a3">In Progress (18)</text>
      
      <rect x="350" y="300" width="100" height="25" rx="4" fill="#a5b4fc" />
      <text x="370" y="317" font-family="Arial" font-size="12" fill="#312e81">Converted (12)</text>
      
      <!-- Chart icons -->
      <circle cx="40" cy="120" r="20" fill="#fef08a" />
      <circle cx="600" cy="280" r="25" fill="#fef08a" />
      <circle cx="570" cy="30" r="15" fill="#fef08a" />
    </svg>
    `;
    
    // Save all SVGs to the public images folder
    const imagePaths = [
      { svg: step1SVG, filename: 'step1-criteria.svg' },
      { svg: step2SVG, filename: 'step2-ai.svg' },
      { svg: step3SVG, filename: 'step3-contact.svg' },
      { svg: step4SVG, filename: 'step4-track.svg' }
    ];
    
    for (const item of imagePaths) {
      const svgBuffer = Buffer.from(item.svg);
      const imagePath = path.join(process.cwd(), 'public', 'images', 'steps', item.filename);
      await writeFile(imagePath, svgBuffer);
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Step images created successfully',
      paths: imagePaths.map(item => `/images/steps/${item.filename}`)
    });
  } catch (error) {
    console.error('Error creating images:', error);
    return NextResponse.json({ success: false, error: 'Failed to create images' }, { status: 500 });
  }
}
