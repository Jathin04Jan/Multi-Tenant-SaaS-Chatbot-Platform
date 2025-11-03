// Mock API functions for TanStack Query
// Replace with real endpoints when backend is ready

export interface ApiResponse<T> {
  data: T;
  error?: string;
}

// Auth
export const mockSignUp = async (email: string, password: string): Promise<ApiResponse<{ userId: string }>> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return { data: { userId: 'user_' + Math.random().toString(36).substring(7) } };
};

export const mockSignIn = async (email: string, password: string): Promise<ApiResponse<{ token: string }>> => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return { data: { token: 'mock_token_' + Math.random().toString(36) } };
};

// Tenant
export const mockCreateTenant = async (): Promise<ApiResponse<{ tenantId: string }>> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { data: { tenantId: 'tenant_' + Math.random().toString(36).substring(7) } };
};

// Upload
export const mockUploadFile = async (file: File): Promise<ApiResponse<{ fileId: string; status: string }>> => {
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return {
    data: {
      fileId: 'file_' + Math.random().toString(36).substring(7),
      status: 'uploaded',
    },
  };
};

// Crawl
export const mockStartCrawl = async (url: string): Promise<ApiResponse<{ crawlId: string; status: string }>> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return {
    data: {
      crawlId: 'crawl_' + Math.random().toString(36).substring(7),
      status: 'queued',
    },
  };
};

// Indexing
export const mockGetIndexingStatus = async (): Promise<ApiResponse<{ progress: number; status: string }>> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  const progress = Math.min(100, Math.floor(Math.random() * 100) + 20);
  return {
    data: {
      progress,
      status: progress === 100 ? 'completed' : 'running',
    },
  };
};

// Chat
export const mockChatMessage = async (message: string): Promise<ApiResponse<{ reply: string }>> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return {
    data: {
      reply: `Mock response to: "${message}". This is a test environment.`,
    },
  };
};

// Analytics
export const mockGetAnalytics = async () => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return {
    data: {
      totalChats: 1247,
      avgResponseTime: '2.3s',
      docsIndexed: 87,
      activeSources: 12,
    },
  };
};
