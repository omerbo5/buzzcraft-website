import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

// This route creates a placeholder dashboard image for development purposes
export async function GET() {
  try {
    // Create a simple SVG with a dashboard UI mock
    const svg = `
    <svg width="1200" height="800" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="headerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style="stop-color:#f8fafc;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#f1f5f9;stop-opacity:1" />
        </linearGradient>
        <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#ffffff;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#f8fafc;stop-opacity:1" />
        </linearGradient>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="3" stdDeviation="5" flood-color="#0000001a" />
        </filter>
      </defs>
      <!-- Background -->
      <rect width="100%" height="100%" fill="#f1f5f9" />
      
      <!-- Sidebar -->
      <rect x="0" y="0" width="240" height="800" fill="#1e293b" />
      
      <!-- Sidebar Logo Area -->
      <rect x="0" y="0" width="240" height="70" fill="#0f172a" />
      <text x="50" y="43" font-family="Arial" font-size="20" font-weight="bold" fill="white">LeadMiner</text>
      
      <!-- Sidebar Menu Items -->
      <rect x="12" y="100" width="216" height="40" rx="4" fill="#3b82f6" />
      <text x="45" y="125" font-family="Arial" font-size="14" fill="white">Dashboard</text>
      
      <text x="45" y="175" font-family="Arial" font-size="14" fill="#94a3b8">Leads</text>
      <text x="45" y="225" font-family="Arial" font-size="14" fill="#94a3b8">Analytics</text>
      <text x="45" y="275" font-family="Arial" font-size="14" fill="#94a3b8">Settings</text>
      <text x="45" y="325" font-family="Arial" font-size="14" fill="#94a3b8">Integrations</text>
      
      <!-- Main Content -->
      <rect x="240" y="0" width="960" height="70" fill="url(#headerGrad)" />
      <text x="270" y="43" font-family="Arial" font-size="20" font-weight="bold" fill="#1e293b">Dashboard</text>
      
      <!-- Metrics Cards -->
      <rect x="270" y="100" width="280" height="140" rx="8" fill="url(#cardGrad)" style="filter:url(#shadow)" />
      <text x="290" y="130" font-family="Arial" font-size="14" fill="#64748b">New Leads This Week</text>
      <text x="290" y="180" font-family="Arial" font-size="36" font-weight="bold" fill="#0f172a">42</text>
      <rect x="290" y="190" width="80" height="6" rx="3" fill="#3b82f6" />
      
      <rect x="580" y="100" width="280" height="140" rx="8" fill="url(#cardGrad)" style="filter:url(#shadow)" />
      <text x="600" y="130" font-family="Arial" font-size="14" fill="#64748b">Conversion Rate</text>
      <text x="600" y="180" font-family="Arial" font-size="36" font-weight="bold" fill="#0f172a">28%</text>
      <rect x="600" y="190" width="80" height="6" rx="3" fill="#3b82f6" />
      
      <rect x="890" y="100" width="280" height="140" rx="8" fill="url(#cardGrad)" style="filter:url(#shadow)" />
      <text x="910" y="130" font-family="Arial" font-size="14" fill="#64748b">Total Qualified Leads</text>
      <text x="910" y="180" font-family="Arial" font-size="36" font-weight="bold" fill="#0f172a">195</text>
      <rect x="910" y="190" width="80" height="6" rx="3" fill="#3b82f6" />
      
      <!-- Recent Leads Table -->
      <rect x="270" y="270" width="900" height="500" rx="8" fill="url(#cardGrad)" style="filter:url(#shadow)" />
      <text x="290" y="310" font-family="Arial" font-size="18" font-weight="bold" fill="#0f172a">Recent Leads</text>
      
      <!-- Table Header -->
      <rect x="290" y="330" width="860" height="40" rx="4" fill="#f8fafc" />
      <text x="310" y="355" font-family="Arial" font-size="14" font-weight="bold" fill="#64748b">Name</text>
      <text x="500" y="355" font-family="Arial" font-size="14" font-weight="bold" fill="#64748b">Source</text>
      <text x="690" y="355" font-family="Arial" font-size="14" font-weight="bold" fill="#64748b">Score</text>
      <text x="880" y="355" font-family="Arial" font-size="14" font-weight="bold" fill="#64748b">Status</text>
      <text x="1070" y="355" font-family="Arial" font-size="14" font-weight="bold" fill="#64748b">Actions</text>
      
      <!-- Table Rows -->
      <rect x="290" y="380" width="860" height="1" fill="#e2e8f0" />
      <text x="310" y="415" font-family="Arial" font-size="14" fill="#334155">John Anderson</text>
      <text x="500" y="415" font-family="Arial" font-size="14" fill="#334155">r/marketing</text>
      <rect x="690" y="405" width="50" height="20" rx="10" fill="#dcfce7" />
      <text x="700" y="420" font-family="Arial" font-size="14" fill="#166534">95%</text>
      <rect x="880" y="405" width="80" height="20" rx="10" fill="#dbeafe" />
      <text x="895" y="420" font-family="Arial" font-size="14" fill="#1e40af">New</text>
      
      <rect x="290" y="430" width="860" height="1" fill="#e2e8f0" />
      <text x="310" y="465" font-family="Arial" font-size="14" fill="#334155">Sarah Johnson</text>
      <text x="500" y="465" font-family="Arial" font-size="14" fill="#334155">r/startup</text>
      <rect x="690" y="455" width="50" height="20" rx="10" fill="#dcfce7" />
      <text x="700" y="470" font-family="Arial" font-size="14" fill="#166534">87%</text>
      <rect x="880" y="455" width="80" height="20" rx="10" fill="#dbeafe" />
      <text x="895" y="470" font-family="Arial" font-size="14" fill="#1e40af">New</text>
      
      <rect x="290" y="480" width="860" height="1" fill="#e2e8f0" />
      <text x="310" y="515" font-family="Arial" font-size="14" fill="#334155">Michael Chen</text>
      <text x="500" y="515" font-family="Arial" font-size="14" fill="#334155">r/saas</text>
      <rect x="690" y="505" width="50" height="20" rx="10" fill="#fef9c3" />
      <text x="700" y="520" font-family="Arial" font-size="14" fill="#854d0e">72%</text>
      <rect x="880" y="505" width="110" height="20" rx="10" fill="#ffedd5" />
      <text x="893" y="520" font-family="Arial" font-size="14" fill="#9a3412">Contacted</text>
      
      <rect x="290" y="530" width="860" height="1" fill="#e2e8f0" />
      <text x="310" y="565" font-family="Arial" font-size="14" fill="#334155">Emma Williams</text>
      <text x="500" y="565" font-family="Arial" font-size="14" fill="#334155">r/webdev</text>
      <rect x="690" y="555" width="50" height="20" rx="10" fill="#dcfce7" />
      <text x="700" y="570" font-family="Arial" font-size="14" fill="#166534">91%</text>
      <rect x="880" y="555" width="110" height="20" rx="10" fill="#e0e7ff" />
      <text x="893" y="570" font-family="Arial" font-size="14" fill="#3730a3">Qualified</text>
      
      <rect x="290" y="580" width="860" height="1" fill="#e2e8f0" />
      <text x="310" y="615" font-family="Arial" font-size="14" fill="#334155">David Martinez</text>
      <text x="500" y="615" font-family="Arial" font-size="14" fill="#334155">r/advertising</text>
      <rect x="690" y="605" width="50" height="20" rx="10" fill="#dcfce7" />
      <text x="700" y="620" font-family="Arial" font-size="14" fill="#166534">83%</text>
      <rect x="880" y="605" width="80" height="20" rx="10" fill="#dbeafe" />
      <text x="895" y="620" font-family="Arial" font-size="14" fill="#1e40af">New</text>
    </svg>
    `;

    // Convert SVG to buffer 
    const svgBuffer = Buffer.from(svg);
    
    // Save to public images folder
    const imagePath = path.join(process.cwd(), 'public', 'images', 'dashboard-preview.png');
    await writeFile(imagePath, svgBuffer);
    
    return NextResponse.json({ success: true, message: 'Dashboard preview image created successfully' });
  } catch (error) {
    console.error('Error creating image:', error);
    return NextResponse.json({ success: false, error: 'Failed to create image' }, { status: 500 });
  }
}
