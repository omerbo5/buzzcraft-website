export type Lead = {
  id: number;
  username: string;
  subreddit: string;
  post: string;
  content?: string;
  status: 'new' | 'contacted' | 'qualified' | 'responded' | 'converted' | 'rejected';
  relevance: number;
  createdAt: string;
  lastActivity?: string;
  tags?: string[];
  notes?: string;
  aiSummary?: string;
  isStarred?: boolean;
};

export type LeadFilter = {
  search?: string;
  status?: string[];
  subreddits?: string[];
  tags?: string[];
  relevanceRange?: [number, number];
  dateRange?: [Date | null, Date | null];
  sort?: {
    field: string;
    direction: 'asc' | 'desc';
  };
  pageSize?: number;
  page?: number;
};
