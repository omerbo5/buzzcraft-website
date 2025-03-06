import { Lead, LeadFilter } from '@/types/lead';

// Generate a list of mock leads for development
export function generateMockLeads(count: number = 50): Lead[] {
  const subreddits = ['r/webdev', 'r/reactjs', 'r/javascript', 'r/programming', 'r/web_design', 'r/freelance'];
  const statuses: Lead['status'][] = ['new', 'contacted', 'qualified', 'responded', 'converted', 'rejected'];
  const tags = ['react', 'frontend', 'backend', 'fullstack', 'ui/ux', 'mobile', 'api', 'database', 'cloud', 'e-commerce'];
  
  return Array.from({ length: count }, (_, i) => {
    const id = i + 1;
    const relevance = Math.floor(Math.random() * 30) + 70; // 70-100
    const subreddit = subreddits[Math.floor(Math.random() * subreddits.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const isStarred = Math.random() > 0.8; // 20% chance to be starred
    
    // Random date in last 30 days
    const createdAtDate = new Date();
    createdAtDate.setDate(createdAtDate.getDate() - Math.floor(Math.random() * 30));
    const createdAt = createdAtDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    
    // Random activity date after creation
    const lastActivityDate = new Date(createdAtDate);
    lastActivityDate.setDate(lastActivityDate.getDate() + Math.floor(Math.random() * 5));
    const lastActivity = lastActivityDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    
    // Random tags (1-3)
    const tagCount = Math.floor(Math.random() * 3) + 1;
    const selectedTags = Array.from({ length: tagCount }, () => {
      return tags[Math.floor(Math.random() * tags.length)];
    }).filter((tag, index, self) => self.indexOf(tag) === index); // Remove duplicates
    
    // Generate random post titles based on subreddit
    let post = '';
    let content = '';
    
    switch (subreddit) {
      case 'r/webdev':
        post = `Looking for a ${Math.random() > 0.5 ? 'frontend' : 'fullstack'} developer for a project`;
        content = `Hi r/webdev,\n\nI'm looking for a developer who can build a ${Math.random() > 0.5 ? 'React' : 'Vue'} application for my business. We need a responsive design and smooth user experience. If interested, please DM me for more details.`;
        break;
      case 'r/reactjs':
        post = `Need help with a React ${Math.random() > 0.5 ? 'dashboard' : 'e-commerce'} project`;
        content = `Hello React community,\n\nI'm working on a ${Math.random() > 0.5 ? 'dashboard' : 'e-commerce'} project and I'm looking for someone who can help implement complex features. I need someone with experience in React hooks and state management.`;
        break;
      case 'r/javascript':
        post = `Looking for a ${Math.random() > 0.5 ? 'frontend' : 'backend'} JavaScript developer`;
        content = `Hey everyone,\n\nI need a JavaScript developer for a ${Math.random() > 0.5 ? 'frontend' : 'backend'} project. The project involves ${Math.random() > 0.5 ? 'building a modern UI with JavaScript frameworks' : 'creating a Node.js API for our app'}. Please message if you're interested.`;
        break;
      case 'r/programming':
        post = `Need a developer for a ${Math.random() > 0.5 ? 'web' : 'mobile'} application`;
        content = `Hi programmers,\n\nI'm looking for someone to help build a ${Math.random() > 0.5 ? 'web' : 'mobile'} application. The tech stack is not finalized yet, so I'm open to suggestions. Budget is negotiable based on experience.`;
        break;
      case 'r/web_design':
        post = `Looking for a UI/UX designer for a ${Math.random() > 0.5 ? 'website' : 'web app'}`;
        content = `Hello designers,\n\nI need someone with a good eye for UI/UX to help design a ${Math.random() > 0.5 ? 'website' : 'web app'} for my startup. We're looking for a modern, clean look that appeals to our target audience.`;
        break;
      case 'r/freelance':
        post = `${Math.random() > 0.5 ? 'Web' : 'App'} developer needed for a freelance project`;
        content = `Hi freelancers,\n\nI have a ${Math.random() > 0.5 ? 'web' : 'app'} development project that needs to be completed in the next few weeks. Looking for someone reliable who can work independently and communicate effectively.`;
        break;
      default:
        post = `Looking for a developer for a project`;
        content = `I need a developer for a project. Please contact me if interested.`;
    }
    
    return {
      id,
      username: `u/user_${id}`,
      subreddit,
      post,
      content,
      status,
      relevance,
      createdAt,
      lastActivity,
      tags: selectedTags,
      notes: Math.random() > 0.7 ? `Potential lead for ${selectedTags.join(', ')} work.` : '', // 30% chance to have notes
      aiSummary: `This lead is looking for ${selectedTags.join(', ')} development. They posted in ${subreddit} and have a relevance score of ${relevance}%. ${Math.random() > 0.5 ? 'This appears to be a good match for our services.' : 'Consider following up with more information about our expertise in this area.'}`,
      isStarred,
    };
  });
}

// Filter leads based on LeadFilter criteria
export function filterLeads(leads: Lead[], filters: LeadFilter): Lead[] {
  return leads.filter(lead => {
    // Filter by status
    if (filters.status && filters.status.length > 0 && !filters.status.includes(lead.status)) {
      return false;
    }
    
    // Filter by subreddit
    if (filters.subreddits && filters.subreddits.length > 0 && !filters.subreddits.includes(lead.subreddit)) {
      return false;
    }
    
    // Filter by tags
    if (filters.tags && filters.tags.length > 0) {
      if (!lead.tags || !filters.tags.some(tag => lead.tags?.includes(tag))) {
        return false;
      }
    }
    
    // Filter by relevance range
    if (filters.relevanceRange) {
      const [min, max] = filters.relevanceRange;
      if (lead.relevance < min || lead.relevance > max) {
        return false;
      }
    }
    
    // Filter by search term
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const matchesUsername = lead.username.toLowerCase().includes(searchTerm);
      const matchesPost = lead.post.toLowerCase().includes(searchTerm);
      const matchesContent = lead.content?.toLowerCase().includes(searchTerm);
      const matchesSubreddit = lead.subreddit.toLowerCase().includes(searchTerm);
      const matchesTags = lead.tags?.some(tag => tag.toLowerCase().includes(searchTerm));
      
      if (!(matchesUsername || matchesPost || matchesContent || matchesSubreddit || matchesTags)) {
        return false;
      }
    }
    
    return true;
  });
}

// Sort leads based on filter criteria
export function sortLeads(leads: Lead[], sort?: { field: string; direction: 'asc' | 'desc' }): Lead[] {
  if (!sort) return leads;
  
  return [...leads].sort((a, b) => {
    let comparison = 0;
    
    switch (sort.field) {
      case 'relevance':
        comparison = a.relevance - b.relevance;
        break;
      case 'createdAt':
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        break;
      case 'lastActivity':
        if (a.lastActivity && b.lastActivity) {
          comparison = new Date(a.lastActivity).getTime() - new Date(b.lastActivity).getTime();
        }
        break;
      case 'username':
        comparison = a.username.localeCompare(b.username);
        break;
      case 'subreddit':
        comparison = a.subreddit.localeCompare(b.subreddit);
        break;
      case 'status':
        comparison = a.status.localeCompare(b.status);
        break;
      default:
        comparison = 0;
    }
    
    return sort.direction === 'asc' ? comparison : -comparison;
  });
}

// Get a single lead by ID
export function getMockLeadById(id: number): Lead | undefined {
  const leads = generateMockLeads(100); // Generate a larger pool of leads
  return leads.find(lead => lead.id === id);
}

// Get unique values for filter dropdowns
export function getUniqueSubreddits(leads: Lead[]): string[] {
  return [...new Set(leads.map(lead => lead.subreddit))];
}

export function getUniqueTags(leads: Lead[]): string[] {
  const allTags = leads.flatMap(lead => lead.tags || []);
  return [...new Set(allTags)];
}
