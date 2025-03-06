import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// OpenAI API key
const OPENAI_API_KEY = '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';

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

// List of all available subreddits (to be referenced by the AI)
const popularSubreddits = {
  technology: [
    'r/programming', 'r/webdev', 'r/javascript', 'r/reactjs', 'r/nextjs',
    'r/coding', 'r/learnprogramming', 'r/technology', 'r/computerscience',
    'r/web_design', 'r/frontend', 'r/backend', 'r/datascience', 'r/python',
    'r/androiddev', 'r/iOSProgramming', 'r/MachineLearning', 'r/coding'
  ],
  business: [
    'r/Entrepreneur', 'r/smallbusiness', 'r/startups', 'r/business',
    'r/marketing', 'r/sales', 'r/ecommerce', 'r/digitalnomad',
    'r/businessideas', 'r/sideproject', 'r/Entrepreneur', 'r/Business_Ideas',
    'r/homebuisness', 'r/EntrepreneurRideAlong', 'r/businesshub'
  ],
  freelancing: [
    'r/freelance', 'r/forhire', 'r/designjobs', 'r/remotework',
    'r/WorkOnline', 'r/jobbit', 'r/HireaWriter', 'r/hiring', 'r/freelanceWriters',
    'r/FreelanceDesigners', 'r/Upwork', 'r/beermoney', 'r/gigwork'
  ],
  design: [
    'r/graphic_design', 'r/UI_Design', 'r/UXDesign', 'r/web_design',
    'r/logodesign', 'r/Design', 'r/creativecoding', 'r/graphicdesign',
    'r/AdobeIllustrator', 'r/InteriorDesign', 'r/AdobePhotoshop'
  ],
  finance: [
    'r/personalfinance', 'r/investing', 'r/financialindependence',
    'r/stocks', 'r/finance', 'r/economy', 'r/entrepreneurfinance',
    'r/wallstreetbets', 'r/frugal', 'r/CryptoCurrency', 'r/Tax'
  ],
  education: [
    'r/education', 'r/college', 'r/gradschool', 'r/GetStudying',
    'r/edtech', 'r/OnlineEducation', 'r/teachingresources', 'r/teachers',
    'r/highereducation', 'r/gradadmissions', 'r/professors', 'r/courses'
  ],
  marketing: [
    'r/marketing', 'r/digital_marketing', 'r/socialmedia', 'r/SEO',
    'r/content_marketing', 'r/PPC', 'r/AskMarketing', 'r/copywriting',
    'r/Affiliatemarketing', 'r/EmailMarketing', 'r/influencermarketing'
  ],
  networking: [
    'r/networking', 'r/jobs', 'r/careerguidance', 'r/careeradvice',
    'r/resumes', 'r/jobs', 'r/interviews', 'r/cscareerquestions',
    'r/recruitinghell', 'r/ITCareerQuestions', 'r/networksecurity'
  ],
  // Additional categories
  realestate: [
    'r/RealEstate', 'r/realestateinvesting', 'r/CommercialRealEstate',
    'r/Landlord', 'r/PropertyManagement', 'r/homeimprovement', 'r/REBubble'
  ],
  legal: [
    'r/legaladvice', 'r/LawFirm', 'r/LegalCareerAdvice',
    'r/Law', 'r/lawyers', 'r/ask_lawyers', 'r/LawSchool'
  ],
  health: [
    'r/Health', 'r/healthcare', 'r/medicine', 'r/AskDocs',
    'r/Fitness', 'r/nutrition', 'r/HealthInsurance', 'r/therapy'
  ],
  writing: [
    'r/writing', 'r/Journalism', 'r/freelanceWriters', 'r/writingopportunities',
    'r/blogging', 'r/contentcreation', 'r/BlogWriting', 'r/technicalwriting'
  ]
};

export async function POST(request: Request) {
  try {
    const { prompt, chatHistory = [] } = await request.json();
    
    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }
    
    // Format chat history for OpenAI
    const messages = [
      {
        role: 'system',
        content: `You are an AI assistant that helps find relevant subreddits, keywords, and audience information for lead generation. 
                  Based on the user's request, analyze what they're trying to find leads for and recommend the most appropriate subreddits 
                  and related keywords. Focus on finding relevant and specific forums where potential clients or customers might be discussing 
                  related topics. Also, suggest the right audience targeting for their scraping job.
                  
                  The following categories and subreddits are available for you to recommend:
                  ${Object.entries(popularSubreddits).map(([category, subs]) => {
                    return `${category}: ${subs.join(', ')}`;
                  }).join('\n')}`,
      },
      ...chatHistory,
      {
        role: 'user',
        content: prompt
      }
    ];
    
    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      messages,
      model: 'gpt-4o',
      temperature: 0.7,
      max_tokens: 1200,
    });
    
    const responseContent = completion.choices[0]?.message?.content || '';
    
    // Extract recommendations using regex patterns
    const subredditMatches = responseContent.match(/r\/\w+/g) || [];
    const keywordMatches = responseContent.match(/["']([^"']+)["']/g) || [];
    
    // Process the subreddits (remove duplicates)
    const subreddits = [...new Set(subredditMatches)];
    
    // Process the keywords (clean up and remove duplicates)
    const keywords = [...new Set(
      keywordMatches.map(k => k.replace(/["']/g, ''))
    )];
    
    // Try to determine the best categories
    const categories = Object.entries(popularSubreddits)
      .filter(([_, categorySubs]) => 
        subreddits.some(sub => categorySubs.includes(sub))
      )
      .map(([category]) => category);
    
    return NextResponse.json({
      response: responseContent,
      recommendations: {
        subreddits,
        keywords,
        categories,
        timeframe: '7 days',
        minRelevanceScore: 70
      }
    });
  } catch (error) {
    console.error('Error in OpenAI API:', error);
    return NextResponse.json({ error: 'Failed to analyze with AI' }, { status: 500 });
  }
}
