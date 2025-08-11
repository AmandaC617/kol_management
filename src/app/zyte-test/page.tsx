"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  Globe, 
  Instagram, 
  Youtube, 
  MessageSquare, 
  Loader2,
  CheckCircle,
  XCircle,
  Info
} from "lucide-react";
import { ZyteService, InfluencerSocialData } from "@/lib/zyte-service";

export default function ZyteTestPage() {
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{
    webpage?: any;
    instagram?: InfluencerSocialData | null;
    youtube?: InfluencerSocialData | null;
    tiktok?: InfluencerSocialData | null;
    news?: any[];
  }>({});
  const [error, setError] = useState<string | null>(null);

  const handleScrape = async (type: 'webpage' | 'instagram' | 'youtube' | 'tiktok' | 'news') => {
    if (!url.trim()) {
      setError("請輸入有效的 URL");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      switch (type) {
        case 'webpage':
          const webpageResult = await ZyteService.scrapeWebpage(url);
          setResults(prev => ({ ...prev, webpage: webpageResult }));
          break;
        
        case 'instagram':
          const instagramResult = await ZyteService.scrapeInstagramProfile(url);
          setResults(prev => ({ ...prev, instagram: instagramResult }));
          break;
        
        case 'youtube':
          const youtubeResult = await ZyteService.scrapeYouTubeChannel(url);
          setResults(prev => ({ ...prev, youtube: youtubeResult }));
          break;
        
        case 'tiktok':
          const tiktokResult = await ZyteService.scrapeTikTokProfile(url);
          setResults(prev => ({ ...prev, tiktok: tiktokResult }));
          break;
        
        case 'news':
          const newsResult = await ZyteService.scrapeInfluencerNews(url);
          setResults(prev => ({ ...prev, news: newsResult }));
          break;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "抓取失敗");
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = () => {
    const config = ZyteService.getStatus();
    if (config.configured && config.enabled) {
      return <Badge variant="default" className="bg-green-100 text-green-800">已配置</Badge>;
    } else if (config.configured) {
      return <Badge variant="secondary">已配置但未啟用</Badge>;
    } else {
      return <Badge variant="destructive">未配置</Badge>;
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">🕷️ Zyte 爬蟲測試頁面</h1>
        <p className="text-gray-600 mb-4">
          測試 Zyte 爬蟲服務的各種功能，包括網頁抓取、社交媒體數據抓取等
        </p>
        
        <div className="flex items-center space-x-4 mb-6">
          <span className="text-sm text-gray-600">服務狀態：</span>
          {getStatusBadge()}
          <span className="text-sm text-gray-500">
            API Key: {ZyteService.getStatus().apiKey ? '已設定' : '未設定'}
          </span>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Globe className="w-5 h-5" />
            <span>輸入要抓取的 URL</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="https://example.com 或社交媒體個人資料頁面"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
            />
            <Button 
              onClick={() => handleScrape('webpage')}
              disabled={isLoading}
              className="min-w-[120px]"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : '測試抓取'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="webpage" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="webpage">🌐 網頁抓取</TabsTrigger>
          <TabsTrigger value="instagram">📸 Instagram</TabsTrigger>
          <TabsTrigger value="youtube">🎥 YouTube</TabsTrigger>
          <TabsTrigger value="tiktok">🎵 TikTok</TabsTrigger>
          <TabsTrigger value="news">📰 新聞抓取</TabsTrigger>
        </TabsList>

        <TabsContent value="webpage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>網頁抓取結果</span>
                <Button 
                  onClick={() => handleScrape('webpage')}
                  disabled={isLoading}
                  size="sm"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : '重新抓取'}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {results.webpage ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">狀態：</span>
                    {results.webpage.status === 200 ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-red-500" />
                    )}
                    <Badge variant={results.webpage.status === 200 ? "default" : "destructive"}>
                      {results.webpage.status}
                    </Badge>
                  </div>
                  {results.webpage.html && (
                    <div>
                      <h4 className="font-medium mb-2">HTML 預覽：</h4>
                      <Textarea
                        value={results.webpage.html.substring(0, 1000) + '...'}
                        readOnly
                        rows={10}
                        className="font-mono text-xs"
                      />
                    </div>
                  )}
                  {results.webpage.error && (
                    <div className="text-red-600">
                      <h4 className="font-medium mb-2">錯誤：</h4>
                      <p>{results.webpage.error}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <Info className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>點擊上方按鈕開始網頁抓取測試</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="instagram" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <Instagram className="w-5 h-5" />
                  <span>Instagram 數據抓取</span>
                </span>
                <Button 
                  onClick={() => handleScrape('instagram')}
                  disabled={isLoading}
                  size="sm"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : '抓取 Instagram'}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {results.instagram ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="font-medium">用戶名：</span>
                      <p>{results.instagram.username}</p>
                    </div>
                    <div>
                      <span className="font-medium">粉絲數：</span>
                      <p>{results.instagram.followers?.toLocaleString() || '未知'}</p>
                    </div>
                    <div>
                      <span className="font-medium">貼文數：</span>
                      <p>{results.instagram.posts?.toLocaleString() || '未知'}</p>
                    </div>
                    <div>
                      <span className="font-medium">簡介：</span>
                      <p className="truncate">{results.instagram.bio || '無'}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <Instagram className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>輸入 Instagram 個人資料頁面 URL 並點擊抓取</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="youtube" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <Youtube className="w-5 h-5" />
                  <span>YouTube 頻道數據</span>
                </span>
                <Button 
                  onClick={() => handleScrape('youtube')}
                  disabled={isLoading}
                  size="sm"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : '抓取 YouTube'}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {results.youtube ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="font-medium">頻道名稱：</span>
                      <p>{results.youtube.username}</p>
                    </div>
                    <div>
                      <span className="font-medium">訂閱者數：</span>
                      <p>{results.youtube.followers?.toLocaleString() || '未知'}</p>
                    </div>
                    <div>
                      <span className="font-medium">影片數：</span>
                      <p>{results.youtube.posts?.toLocaleString() || '未知'}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <Youtube className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>輸入 YouTube 頻道頁面 URL 並點擊抓取</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tiktok" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5" />
                  <span>TikTok 用戶數據</span>
                </span>
                <Button 
                  onClick={() => handleScrape('tiktok')}
                  disabled={isLoading}
                  size="sm"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : '抓取 TikTok'}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {results.tiktok ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="font-medium">用戶名：</span>
                      <p>{results.tiktok.username}</p>
                    </div>
                    <div>
                      <span className="font-medium">粉絲數：</span>
                      <p>{results.tiktok.followers?.toLocaleString() || '未知'}</p>
                    </div>
                    <div>
                      <span className="font-medium">關注數：</span>
                      <p>{results.tiktok.following?.toLocaleString() || '未知'}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>輸入 TikTok 用戶頁面 URL 並點擊抓取</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="news" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center space-x-2">
                  <MessageSquare className="w-5 h-5" />
                  <span>新聞抓取</span>
                </span>
                <Button 
                  onClick={() => handleScrape('news')}
                  disabled={isLoading}
                  size="sm"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : '抓取新聞'}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {results.news && results.news.length > 0 ? (
                <div className="space-y-4">
                  {results.news.map((news, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="font-medium mb-2">{news.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{news.snippet}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{news.source}</span>
                        <span>{news.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>輸入關鍵詞或網紅名稱來抓取相關新聞</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-red-600">
              <XCircle className="w-4 h-4" />
              <span className="font-medium">錯誤：</span>
              <span>{error}</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
