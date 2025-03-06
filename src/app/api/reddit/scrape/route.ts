import { NextResponse } from 'next/server';

// Reddit API credentials - these are dummy credentials, replace with your own from https://www.reddit.com/prefs/apps
// For real applications, these should be in environment variables 
const REDDIT_CLIENT_ID = process.env.REDDIT_CLIENT_ID || 'YOUR_CLIENT_ID';
const REDDIT_CLIENT_SECRET = process.env.REDDIT_CLIENT_SECRET || 'YOUR_CLIENT_SECRET';
const REDDIT_USER_AGENT = 'Lead Generator MVP';

// For development mode, we'll use mock data when credentials aren't available
const USE_MOCK_DATA = !REDDIT_CLIENT_ID || REDDIT_CLIENT_ID === 'YOUR_CLIENT_ID' || !REDDIT_CLIENT_SECRET || REDDIT_CLIENT_SECRET === 'YOUR_CLIENT_SECRET';

// Function to get Reddit access token
async function getRedditAccessToken() {
  try {
    const tokenResponse = await fetch('https://www.reddit.com/api/v1/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${REDDIT_CLIENT_ID}:${REDDIT_CLIENT_SECRET}`).toString('base64')}`
      },
      body: 'grant_type=client_credentials'
    });
    
    const tokenData = await tokenResponse.json();
    console.log('Token response:', tokenData);
    
    if (!tokenData.access_token) {
      if (tokenData.error === 'invalid_grant') {
        throw new Error('Failed to get Reddit access token: invalid credentials');
      } else if (tokenData.error === 'unsupported_grant_type') {
        throw new Error('Failed to get Reddit access token: unsupported grant type');
      } else {
        console.error('Failed to get token, response:', JSON.stringify(tokenData));
        throw new Error('Failed to get Reddit access token: ' + (tokenData.error || 'unknown error'));
      }
    }
    
    return tokenData.access_token;
  } catch (error) {
    console.error('Error getting Reddit access token:', error);
    throw error;
  }
}

// Function to scrape posts from a subreddit
async function scrapeSubreddit(subreddit: string, timeframe: string, accessToken: string) {
  try {
    // Remove 'r/' prefix if present
    const subredditName = subreddit.startsWith('r/') ? subreddit.substring(2) : subreddit;
    
    // Determine time period
    const period = timeframe === '1 day' ? 'day' : 
                  timeframe === '3 days' ? 'week' : 
                  timeframe === '7 days' ? 'week' : 
                  timeframe === '14 days' ? 'month' : 
                  timeframe === '30 days' ? 'month' : 'year';
    
    // Fetch posts
    const postsResponse = await fetch(`https://oauth.reddit.com/r/${subredditName}/top?t=${period}&limit=25`, {
      headers: {
        'User-Agent': REDDIT_USER_AGENT,
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    const postsData = await postsResponse.json();
    
    if (!postsData.data || !postsData.data.children) {
      return [];
    }
    
    // Process and return the posts
    return postsData.data.children.map((post: any) => {
      const postData = post.data;
      
      return {
        id: postData.id,
        title: postData.title,
        author: postData.author,
        content: postData.selftext,
        url: `https://www.reddit.com${postData.permalink}`,
        subreddit: postData.subreddit_name_prefixed,
        created: postData.created_utc,
        upvotes: postData.ups,
        comments: postData.num_comments,
        isLead: postData.author !== '[deleted]' && postData.selftext?.length > 0
      };
    });
  } catch (error) {
    console.error(`Error scraping subreddit ${subreddit}:`, error);
    return [];
  }
}

// Function to scrape comments from a post
async function scrapeComments(postId: string, accessToken: string) {
  try {
    const commentsResponse = await fetch(`https://oauth.reddit.com/comments/${postId}?limit=50&depth=2`, {
      headers: {
        'User-Agent': REDDIT_USER_AGENT,
        'Authorization': `Bearer ${accessToken}`
      }
    });
    
    const commentsData = await commentsResponse.json();
    
    if (!Array.isArray(commentsData) || commentsData.length < 2 || !commentsData[1].data || !commentsData[1].data.children) {
      return [];
    }
    
    // Process and return the comments
    return commentsData[1].data.children
      .filter((comment: any) => comment.kind === 't1' && comment.data)
      .map((comment: any) => {
        const commentData = comment.data;
        
        return {
          id: commentData.id,
          author: commentData.author,
          content: commentData.body,
          created: commentData.created_utc,
          upvotes: commentData.ups,
          isLead: commentData.author !== '[deleted]' && commentData.author !== 'AutoModerator' && commentData.body?.length > 10
        };
      });
  } catch (error) {
    console.error(`Error scraping comments for post ${postId}:`, error);
    return [];
  }
}

// Function to generate mock posts for development
function generateMockPosts(subreddits: string[] = [], keywords: string[] = []) {
  try {
    const mockPosts = [];
    const mockTitles = [
      "Looking for advice on automating lead generation",
      "What tools do you use for social media monitoring?",
      "Need recommendations for analytics platforms",
      "How to scale content creation for B2B tech?",
      "Best ways to track engagement across platforms?",
      "Struggling with finding quality leads from social media",
      "What's your process for qualifying leads?",
      "Anyone using AI for lead scoring?",
      "Recommendations for social listening tools?",
      "How to improve conversion rates for SaaS?",
      "Best CRM for small startups?",
      "Most effective ways to find B2B clients on Reddit?",
      "How do you handle lead nurturing?",
      "Tools for automating outreach?",
      "Best practices for cold outreach on Reddit"
    ];
    
    const mockContents = [
      "We're a small startup trying to build our client base. Looking for effective ways to identify potential leads without spending too much on expensive tools. Any recommendations?",
      "Our team has been manually searching for leads on various platforms, but it's becoming too time-consuming. Are there any reliable automation tools that don't compromise on quality?",
      "I've been trying to figure out the best approach for lead generation from social media. Traditional methods aren't working well for our niche product. Any innovative approaches?",
      "We need a better way to qualify leads from social platforms. Currently spending too much time on leads that don't convert. Looking for a more efficient system.",
      "Looking for a social media analytics tool that can help me track engagement across multiple platforms. Has anyone tried something that works well for SaaS companies?",
      "Our team is struggling with content creation for B2B tech. We need tools or strategies to scale our content production without sacrificing quality.",
      "Has anyone found a reliable analytics platform that integrates well with Shopify? Looking for recommendations that provide actionable insights.",
      "We need to improve our social listening capabilities. Currently using Brandwatch but looking for alternatives that are more affordable for a startup.",
      "What's working for you all in terms of finding quality leads from Reddit? We're in the B2B space and trying to identify potential clients from relevant subreddits."
    ];
    
    // Use safe default subreddits if none provided
    const safeSubreddits = subreddits && subreddits.length > 0 ? 
      subreddits : ['marketing', 'smallbusiness', 'entrepreneur'];
    
    // Generate random number of posts (between 10-20)
    const numPosts = Math.floor(Math.random() * 10) + 10;
    
    for (let i = 0; i < numPosts; i++) {
      const subreddit = safeSubreddits[Math.floor(Math.random() * safeSubreddits.length)];
      const title = mockTitles[Math.floor(Math.random() * mockTitles.length)];
      const content = mockContents[Math.floor(Math.random() * mockContents.length)];
      const author = `u/${['startup_founder', 'tech_ceo', 'marketing_guru', 'saas_expert', 'product_manager', 'growth_hacker', 'social_media_pro'][Math.floor(Math.random() * 7)]}${Math.floor(Math.random() * 100)}`;
      const upvotes = Math.floor(Math.random() * 1000);
      const commentsCount = Math.floor(Math.random() * 10) + 1;
      
      // Calculate a realistic relevance score
      // Higher if keywords are present in title or content
      let relevanceScore = 70 + Math.floor(Math.random() * 20); // Base score between 70-90
      
      // Boost score if keywords are present
      if (keywords && keywords.length > 0) {
        for (const keyword of keywords) {
          if (title.toLowerCase().includes(keyword.toLowerCase()) || 
              content.toLowerCase().includes(keyword.toLowerCase())) {
            relevanceScore += 5;
            // Cap at 99
            if (relevanceScore > 99) relevanceScore = 99;
            break;
          }
        }
      }
      
      // Generate created timestamp (between now and 30 days ago)
      const created = Math.floor(Date.now() / 1000) - Math.floor(Math.random() * 30 * 24 * 60 * 60);
      
      // Generate fake comments - simplified to avoid potential memory issues
      const comments = Array(commentsCount).fill(null).map((_, index) => ({
        id: `comment-${i}-${index}`,
        author: `u/commenter${Math.floor(Math.random() * 100)}`,
        content: `This is comment ${index + 1} on post ${i}.`,
        created: created + Math.floor(Math.random() * 86400), // Within a day after the post
        ups: Math.floor(Math.random() * 50)
      }));
      
      mockPosts.push({
        id: `mock-post-${i}`,
        title,
        author,
        content,
        url: `https://www.reddit.com/r/${subreddit}/comments/mock${i}`,
        subreddit: `r/${subreddit}`,
        created,
        upvotes,
        comments,
        isLead: relevanceScore > 85,
        relevanceScore
      });
    }
    
    // Sort by relevance score descending
    return mockPosts.sort((a, b) => b.relevanceScore - a.relevanceScore);
  } catch (error) {
    console.error('Error generating mock posts:', error);
    // Return an empty array as fallback
    return [];
  }
}

export async function POST(request: Request) {
  try {
    const { subreddits, keywords, timeframe, minRelevanceScore } = await request.json();
    
    if (!subreddits || !Array.isArray(subreddits) || subreddits.length === 0) {
      return NextResponse.json({ error: 'Subreddits are required' }, { status: 400 });
    }
    
    console.log('Starting scrape with params:', { subreddits, keywords, timeframe });
    
    // Check if we should use mock data for development
    if (USE_MOCK_DATA) {
      console.log('Using mock data for development');
      return NextResponse.json({
        posts: generateMockPosts(subreddits, keywords),
        stats: {
          totalPosts: 120,
          filteredPosts: 42,
          highRelevancePosts: 18
        }
      });
    }
    
    try {
      // Get Reddit access token
      const accessToken = await getRedditAccessToken();
      
      // Scrape posts from each subreddit
      const allPosts = [];
      for (const subreddit of subreddits) {
        console.log(`Scraping subreddit: ${subreddit}`);
        const posts = await scrapeSubreddit(subreddit, timeframe, accessToken);
        allPosts.push(...posts);
      }
      
      // If no posts were found, return empty results
      if (allPosts.length === 0) {
        return NextResponse.json({
          posts: [],
          stats: {
            totalPosts: 0,
            filteredPosts: 0,
            highRelevancePosts: 0
          }
        });
      }
      
      // Filter posts by keywords if provided
      let filteredPosts = allPosts;
      if (keywords && keywords.length > 0) {
        filteredPosts = allPosts.filter(post => {
          const postText = `${post.title} ${post.content || ''}`.toLowerCase();
          return keywords.some((keyword: string) => 
            postText.includes(keyword.toLowerCase())
          );
        });
      }
      
      // Score the posts based on relevance
      const scoredPosts = filteredPosts.map(post => {
        // Basic relevance scoring (can be improved)
        let score = 0;
        
        // Score based on upvotes (max 30 points)
        score += Math.min(post.upvotes / 10, 30);
        
        // Score based on comment count (max 20 points)
        score += Math.min(post.comments / 5, 20);
        
        // Score based on content length (max 20 points)
        score += Math.min((post.content?.length || 0) / 100, 20);
        
        // Score based on keyword matches (max 30 points)
        if (keywords && keywords.length > 0) {
          const postText = `${post.title} ${post.content || ''}`.toLowerCase();
          const matchCount = keywords.filter((keyword: string) => 
            postText.includes(keyword.toLowerCase())
          ).length;
          
          score += (matchCount / keywords.length) * 30;
        } else {
          // If no keywords provided, give full points
          score += 30;
        }
        
        return {
          ...post,
          relevanceScore: Math.round(score)
        };
      });
      
      // Filter by minimum relevance score
      const highRelevancePosts = scoredPosts.filter(post => 
        post.relevanceScore >= minRelevanceScore
      );
      
      // Sort by relevance score descending
      highRelevancePosts.sort((a, b) => b.relevanceScore - a.relevanceScore);
      
      // Get comments for top 5 posts
      const topPosts = highRelevancePosts.slice(0, 5);
      for (const post of topPosts) {
        post.comments = await scrapeComments(post.id, accessToken);
      }
      
      console.log(`Scraping complete. Found ${highRelevancePosts.length} relevant posts`);
      
      return NextResponse.json({
        posts: highRelevancePosts,
        stats: {
          totalPosts: allPosts.length,
          filteredPosts: filteredPosts.length,
          highRelevancePosts: highRelevancePosts.length
        }
      });
    } catch (error) {
      console.error('Error in Reddit API operations:', error);
      
      // Return a more specific error message
      let errorMessage = 'Failed to scrape content';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      return NextResponse.json({ 
        error: errorMessage,
        details: error instanceof Error ? error.stack : 'Unknown error'
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error parsing request:', error);
    return NextResponse.json({ error: 'Invalid request format' }, { status: 400 });
  }
}
