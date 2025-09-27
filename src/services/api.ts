// API service for YuvaSetu.AI backend integration

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface CandidateProfile {
  age: string;
  education: string;
  skills: string[];
  sectors: string[];
  location: string;
}

export interface InternshipRecommendation {
  id: string;
  title: string;
  company: string;
  sector: string;
  skills: string[];
  location: string;
  duration: string;
  stipend: string;
  description: string;
  requirements: string[];
  match_score: number;
  match_reason: {
    skills: string[];
    sector: string | null;
    location: string | null;
  };
}

export interface RecommendationResponse {
  recommendations: InternshipRecommendation[];
  total_matches: number;
  processing_time: number;
}

export interface SystemStats {
  total_internships: number;
  sectors: string[];
  locations: string[];
  avg_stipend: number;
  last_updated: string;
}

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, defaultOptions);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async getRecommendations(profile: CandidateProfile): Promise<RecommendationResponse> {
    return this.makeRequest<RecommendationResponse>('/recommend', {
      method: 'POST',
      body: JSON.stringify({ profile }),
    });
  }

  async getAllInternships(): Promise<InternshipRecommendation[]> {
    return this.makeRequest<InternshipRecommendation[]>('/internships');
  }

  async getStats(): Promise<SystemStats> {
    return this.makeRequest<SystemStats>('/stats');
  }

  async healthCheck(): Promise<{ message: string; version: string; status: string }> {
    return this.makeRequest<{ message: string; version: string; status: string }>('/');
  }
}

// Create and export a singleton instance
export const apiService = new ApiService();

// Export the class for testing purposes
export default ApiService;