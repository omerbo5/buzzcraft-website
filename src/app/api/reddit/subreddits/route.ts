import { NextResponse } from 'next/server';

// Reddit API credentials
const REDDIT_CLIENT_ID = 'q2dnlEZAVEvb74LCxT-25w';
const REDDIT_CLIENT_SECRET = 'CYOkCfYGYbmZ8qPEKSdLzLZ45ty1zQ';
const REDDIT_USER_AGENT = 'Lead Generator MVP';

// List of popular subreddits for different categories
const subreddits = {
  technology: [
    'r/programming', 'r/webdev', 'r/javascript', 'r/reactjs', 'r/nextjs',
    'r/coding', 'r/learnprogramming', 'r/technology', 'r/computerscience',
    'r/web_design', 'r/frontend', 'r/backend', 'r/datascience'
  ],
  business: [
    'r/Entrepreneur', 'r/smallbusiness', 'r/startups', 'r/business',
    'r/marketing', 'r/sales', 'r/ecommerce', 'r/digitalnomad',
    'r/businessideas', 'r/sideproject'
  ],
  freelancing: [
    'r/freelance', 'r/forhire', 'r/designjobs', 'r/remotework',
    'r/WorkOnline', 'r/jobbit', 'r/HireaWriter', 'r/hiring'
  ],
  design: [
    'r/graphic_design', 'r/UI_Design', 'r/UXDesign', 'r/web_design',
    'r/logodesign', 'r/Design', 'r/creativecoding'
  ],
  finance: [
    'r/personalfinance', 'r/investing', 'r/financialindependence',
    'r/stocks', 'r/finance', 'r/economy', 'r/entrepreneurfinance'
  ],
  education: [
    'r/education', 'r/college', 'r/gradschool', 'r/GetStudying',
    'r/edtech', 'r/OnlineEducation', 'r/teachingresources'
  ],
  marketing: [
    'r/marketing', 'r/digital_marketing', 'r/socialmedia', 'r/SEO',
    'r/content_marketing', 'r/PPC', 'r/AskMarketing', 'r/copywriting'
  ],
  networking: [
    'r/networking', 'r/jobs', 'r/careerguidance', 'r/careeradvice',
    'r/resumes', 'r/jobs', 'r/interviews'
  ]
};

// Function to fetch active subreddits from Reddit
async function getActiveSubreddits() {
  try {
    // First get access token
    const tokenResponse = await fetch('https://www.reddit.com/api/v1/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${REDDIT_CLIENT_ID}:${REDDIT_CLIENT_SECRET}`).toString('base64')}`
      },
      body: 'grant_type=client_credentials'
    });
    
    const tokenData = await tokenResponse.json();
    
    if (!tokenData.access_token) {
      throw new Error('Failed to get Reddit access token');
    }
    
    // Now we can make requests to the Reddit API
    const subredditResponse = await fetch('https://oauth.reddit.com/subreddits/popular', {
      headers: {
        'User-Agent': REDDIT_USER_AGENT,
        'Authorization': `Bearer ${tokenData.access_token}`
      }
    });
    
    const subredditData = await subredditResponse.json();
    return subredditData.data?.children || [];
  } catch (error) {
    console.error('Error fetching subreddits:', error);
    return [];
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const query = searchParams.get('query')?.toLowerCase();
  
  // If we have a specific category, return subreddits for that category
  if (category && subreddits[category as keyof typeof subreddits]) {
    return NextResponse.json({ 
      subreddits: subreddits[category as keyof typeof subreddits] 
    });
  }
  
  // If we have a query, filter subreddits
  if (query) {
    let filteredSubreddits: string[] = [];
    
    // Search across all categories
    Object.values(subreddits).forEach(categorySubreddits => {
      const matches = categorySubreddits.filter(sub => 
        sub.toLowerCase().includes(query)
      );
      filteredSubreddits = [...filteredSubreddits, ...matches];
    });
    
    return NextResponse.json({ 
      subreddits: [...new Set(filteredSubreddits)] // Remove duplicates
    });
  }
  
  // No category or query, return all subreddits
  const allSubreddits = Object.values(subreddits).flat();
  
  try {
    // Also try to get some active subreddits from Reddit API
    const activeSubreddits = await getActiveSubreddits();
    const activeSubredditNames = activeSubreddits.map((sub: any) => `r/${sub.data.display_name}`);
    
    return NextResponse.json({ 
      subreddits: [...new Set([...allSubreddits, ...activeSubredditNames])] 
    });
  } catch (error) {
    // If the API call fails, just return our static list
    return NextResponse.json({ 
      subreddits: [...new Set(allSubreddits)] 
    });
  }
}
