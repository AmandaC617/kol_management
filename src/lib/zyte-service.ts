// Zyte 爬蟲服務
// 提供強大的網頁數據抓取功能

export interface ZyteScrapingRequest {
  url: string;
  renderJS?: boolean;
  wait?: number;
  extractRules?: {
    [key: string]: {
      selector: string;
      type: 'Text' | 'Link' | 'Image' | 'Attribute';
      attribute?: string;
    };
  };
}

export interface ZyteScrapingResponse {
  status: number;
  url: string;
  html?: string;
  screenshot?: string;
  extractedData?: {
    [key: string]: string | string[];
  };
  error?: string;
}

export interface InfluencerSocialData {
  platform: 'instagram' | 'tiktok' | 'youtube' | 'twitter' | 'facebook' | 'linkedin';
  username: string;
  followers?: number;
  following?: number;
  posts?: number;
  engagement?: number;
  bio?: string;
  verified?: boolean;
  location?: string;
  website?: string;
  recentPosts?: Array<{
    caption?: string;
    likes?: number;
    comments?: number;
    timestamp?: string;
    mediaType?: 'image' | 'video' | 'carousel';
  }>;
  hashtags?: string[];
  mentions?: string[];
  rawData?: any;
}

export class ZyteService {
  private static readonly API_KEY = process.env.NEXT_PUBLIC_ZYTE_API_KEY;
  private static readonly BASE_URL = 'https://app.scrapingbee.com/api/v1';
  private static readonly ENABLED = process.env.NEXT_PUBLIC_ENABLE_ZYTE === 'true';

  /**
   * 檢查 Zyte 服務是否可用
   */
  static isAvailable(): boolean {
    return this.ENABLED && !!this.API_KEY;
  }

  /**
   * 獲取 API 狀態
   */
  static getStatus(): { enabled: boolean; configured: boolean; apiKey: string | null } {
    return {
      enabled: this.ENABLED,
      configured: !!this.API_KEY,
      apiKey: this.API_KEY
    };
  }

  /**
   * 基礎網頁抓取
   */
  static async scrapeWebpage(url: string, options: Partial<ZyteScrapingRequest> = {}): Promise<ZyteScrapingResponse> {
    if (!this.isAvailable()) {
      throw new Error('Zyte service is not available or configured');
    }

    try {
      const params = new URLSearchParams({
        api_key: this.API_KEY!,
        url: url,
        render_js: options.renderJS ? '1' : '0',
        wait: options.wait?.toString() || '2000',
        ...(options.extractRules && { extract_rules: JSON.stringify(options.extractRules) })
      });

      const response = await fetch(`${this.BASE_URL}/?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Zyte API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      return {
        status: response.status,
        url: url,
        html: data.html,
        screenshot: data.screenshot,
        extractedData: data.extracted_data,
        error: data.error
      };
    } catch (error) {
      console.error('Zyte scraping error:', error);
      return {
        status: 500,
        url: url,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * 抓取 Instagram 網紅數據
   */
  static async scrapeInstagramProfile(profileUrl: string): Promise<InfluencerSocialData | null> {
    try {
      const extractRules = {
        username: {
          selector: 'meta[property="og:title"]',
          type: 'Attribute',
          attribute: 'content'
        },
        bio: {
          selector: 'meta[name="description"]',
          type: 'Attribute',
          attribute: 'content'
        },
        followers: {
          selector: 'meta[name="followers"]',
          type: 'Attribute',
          attribute: 'content'
        },
        posts: {
          selector: 'meta[name="posts"]',
          type: 'Attribute',
          attribute: 'content'
        }
      };

      const result = await this.scrapeWebpage(profileUrl, {
        renderJS: true,
        wait: 5000,
        extractRules
      });

      if (result.error || !result.extractedData) {
        console.warn('Instagram scraping failed:', result.error);
        return null;
      }

      return {
        platform: 'instagram',
        username: result.extractedData.username as string || 'unknown',
        bio: result.extractedData.bio as string,
        followers: this.parseNumber(result.extractedData.followers as string),
        posts: this.parseNumber(result.extractedData.posts as string),
        rawData: result.extractedData
      };
    } catch (error) {
      console.error('Instagram scraping error:', error);
      return null;
    }
  }

  /**
   * 抓取 TikTok 網紅數據
   */
  static async scrapeTikTokProfile(profileUrl: string): Promise<InfluencerSocialData | null> {
    try {
      const extractRules = {
        username: {
          selector: 'h1[data-e2e="user-title"]',
          type: 'Text'
        },
        followers: {
          selector: 'strong[data-e2e="followers-count"]',
          type: 'Text'
        },
        following: {
          selector: 'strong[data-e2e="following-count"]',
          type: 'Text'
        },
        likes: {
          selector: 'strong[data-e2e="likes-count"]',
          type: 'Text'
        }
      };

      const result = await this.scrapeWebpage(profileUrl, {
        renderJS: true,
        wait: 8000,
        extractRules
      });

      if (result.error || !result.extractedData) {
        console.warn('TikTok scraping failed:', result.error);
        return null;
      }

      return {
        platform: 'tiktok',
        username: result.extractedData.username as string || 'unknown',
        followers: this.parseNumber(result.extractedData.followers as string),
        following: this.parseNumber(result.extractedData.following as string),
        rawData: result.extractedData
      };
    } catch (error) {
      console.error('TikTok scraping error:', error);
      return null;
    }
  }

  /**
   * 抓取 YouTube 頻道數據
   */
  static async scrapeYouTubeChannel(channelUrl: string): Promise<InfluencerSocialData | null> {
    try {
      const extractRules = {
        channelName: {
          selector: 'meta[property="og:title"]',
          type: 'Attribute',
          attribute: 'content'
        },
        subscribers: {
          selector: 'meta[name="subscriber-count"]',
          type: 'Attribute',
          attribute: 'content'
        },
        videoCount: {
          selector: 'meta[name="video-count"]',
          type: 'Attribute',
          attribute: 'content'
        }
      };

      const result = await this.scrapeWebpage(channelUrl, {
        renderJS: true,
        wait: 5000,
        extractRules
      });

      if (result.error || !result.extractedData) {
        console.warn('YouTube scraping failed:', result.error);
        return null;
      }

      return {
        platform: 'youtube',
        username: result.extractedData.channelName as string || 'unknown',
        followers: this.parseNumber(result.extractedData.subscribers as string),
        posts: this.parseNumber(result.extractedData.videoCount as string),
        rawData: result.extractedData
      };
    } catch (error) {
      console.error('YouTube scraping error:', error);
      return null;
    }
  }

  /**
   * 批量抓取多個網紅資料
   */
  static async batchScrapeInfluencers(urls: string[]): Promise<(InfluencerSocialData | null)[]> {
    const results: (InfluencerSocialData | null)[] = [];
    
    for (const url of urls) {
      try {
        let data: InfluencerSocialData | null = null;
        
        if (url.includes('instagram.com')) {
          data = await this.scrapeInstagramProfile(url);
        } else if (url.includes('tiktok.com')) {
          data = await this.scrapeTikTokProfile(url);
        } else if (url.includes('youtube.com')) {
          data = await this.scrapeYouTubeChannel(url);
        } else {
          // 通用抓取
          const result = await this.scrapeWebpage(url, { renderJS: true });
          if (result.html) {
            data = {
              platform: 'unknown',
              username: 'unknown',
              rawData: { html: result.html, url: url }
            };
          }
        }
        
        results.push(data);
        
        // 避免 API 限制，添加延遲
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`Error scraping ${url}:`, error);
        results.push(null);
      }
    }
    
    return results;
  }

  /**
   * 抓取網紅相關新聞和報導
   */
  static async scrapeInfluencerNews(influencerName: string): Promise<Array<{
    title: string;
    url: string;
    snippet: string;
    source: string;
    date?: string;
  }>> {
    try {
      const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(influencerName + ' news')}`;
      
      const extractRules = {
        titles: {
          selector: 'h3',
          type: 'Text'
        },
        links: {
          selector: 'a[href^="/url"]',
          type: 'Link'
        },
        snippets: {
          selector: '.VwiC3b',
          type: 'Text'
        }
      };

      const result = await this.scrapeWebpage(searchUrl, {
        renderJS: false,
        extractRules
      });

      if (result.error || !result.extractedData) {
        return [];
      }

      const titles = Array.isArray(result.extractedData.titles) ? result.extractedData.titles : [];
      const links = Array.isArray(result.extractedData.links) ? result.extractedData.links : [];
      const snippets = Array.isArray(result.extractedData.snippets) ? result.extractedData.snippets : [];

      return titles.slice(0, 10).map((title, index) => ({
        title: title as string,
        url: links[index] as string || '',
        snippet: snippets[index] as string || '',
        source: 'Google Search',
        date: new Date().toISOString()
      }));
    } catch (error) {
      console.error('News scraping error:', error);
      return [];
    }
  }

  /**
   * 解析數字字符串
   */
  private static parseNumber(value: string | undefined): number | undefined {
    if (!value) return undefined;
    
    // 移除常見的單位和符號
    const cleanValue = value.replace(/[^\d.]/g, '');
    const num = parseFloat(cleanValue);
    
    return isNaN(num) ? undefined : num;
  }

  /**
   * 獲取 API 使用統計
   */
  static async getUsageStats(): Promise<{
    requestsToday: number;
    requestsTotal: number;
    remainingCredits: number;
  } | null> {
    if (!this.isAvailable()) {
      return null;
    }

    try {
      // 這裡可以實現獲取 Zyte API 使用統計的邏輯
      // 具體實現取決於 Zyte 的 API 文檔
      return {
        requestsToday: 0,
        requestsTotal: 0,
        remainingCredits: 1000 // 示例值
      };
    } catch (error) {
      console.error('Error getting usage stats:', error);
      return null;
    }
  }
}

// 導出檢查函數
export function checkZyteConfig(): { available: boolean; configured: boolean; enabled: boolean } {
  return {
    available: ZyteService.isAvailable(),
    configured: !!ZyteService.API_KEY,
    enabled: ZyteService.ENABLED
  };
}
