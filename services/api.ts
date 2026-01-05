const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

export interface Game {
  id: number;
  gameKey: string;
  name: string;
  description: string;
  icon: string;
  iconUrl: string | null;
  color: string;
  htmlUrl: string;
  playCount: number;
  version: number;
  tags?: Tag[];
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  description: string;
  color: string;
  icon: string;
  sortOrder: number;
  gameCount?: number;
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data?: T;
}

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  async getGames(): Promise<Game[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/games`);
      const result: ApiResponse<{ list: Game[]; total: number }> = await response.json();

      if (result.code !== 0) {
        throw new Error(result.message);
      }

      return result.data?.list || [];
    } catch (error) {
      console.error('Failed to fetch games:', error);
      throw error;
    }
  }

  async getGamesWithTags(): Promise<Game[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/games-with-tags`);
      const result: ApiResponse<{ list: Game[]; total: number }> = await response.json();

      if (result.code !== 0) {
        throw new Error(result.message);
      }

      return result.data?.list || [];
    } catch (error) {
      console.error('Failed to fetch games with tags:', error);
      throw error;
    }
  }

  async getGame(gameKey: string): Promise<Game> {
    try {
      const response = await fetch(`${this.baseUrl}/api/games/${gameKey}`);
      const result: ApiResponse<Game> = await response.json();

      if (result.code !== 0) {
        throw new Error(result.message);
      }

      if (!result.data) {
        throw new Error('Game not found');
      }

      return result.data;
    } catch (error) {
      console.error('Failed to fetch game:', error);
      throw error;
    }
  }

  async getTags(): Promise<Tag[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/tags`);
      const result: ApiResponse<{ list: Tag[]; total: number }> = await response.json();

      if (result.code !== 0) {
        throw new Error(result.message);
      }

      return result.data?.list || [];
    } catch (error) {
      console.error('Failed to fetch tags:', error);
      throw error;
    }
  }

  async getGamesByTag(slug: string): Promise<Game[]> {
    try {
      const response = await fetch(`${this.baseUrl}/api/tags/${slug}/games`);
      const result: ApiResponse<{ list: Game[]; total: number }> = await response.json();

      if (result.code !== 0) {
        throw new Error(result.message);
      }

      return result.data?.list || [];
    } catch (error) {
      console.error('Failed to fetch games by tag:', error);
      throw error;
    }
  }

  getFullHtmlUrl(htmlUrl: string): string {
    return `${this.baseUrl}${htmlUrl}`;
  }
}

export const api = new ApiService();
export { API_BASE_URL };
