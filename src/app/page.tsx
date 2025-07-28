"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DemoInfluencer,
  ProjectInfo,
  ProjectEditData,
  BatchProcessingResult
} from "@/types";

// Direct imports for immediate functionality
import { Dashboard } from "@/components/Dashboard";
import InfluencersPage from "@/components/InfluencersPage";
import ProjectsPage from "@/components/ProjectsPage";
import AnalysisPage from "@/components/AnalysisPage";
import { BrandManagementPanel } from "@/components/BrandManagementPanel";
import { PasswordLoginForm } from "@/components/PasswordLoginForm";
import { FirebaseConnectionTest } from "@/components/FirebaseConnectionTest";

// Use the existing EnhancedPostData type from @/types
import type { EnhancedPostData } from "@/types";

// Demo data for the platform
const demoInfluencers: DemoInfluencer[] = [
  {
    id: 1,
    name: "美妝達人小雅",
    platform: "Instagram",
    followers: "85K",
    url: "https://instagram.com/beautyguru_tw",
    avatar: "https://placehold.co/40x40/ff6b9d/ffffff?text=雅",
    score: 87.5,
    tags: ["美妝", "生活"],
    lastUpdated: "2 天前",
    category: "美妝",
    engagementRate: "4.2%",
    dataSource: "simulated"
  },
  {
    id: 2,
    name: "時尚菁英 Chloe",
    platform: "YouTube",
    followers: "156K",
    url: "https://youtube.com/c/fashionista_taiwan",
    avatar: "https://placehold.co/40x40/4ecdc4/ffffff?text=C",
    score: 92.3,
    tags: ["時尚", "穿搭"],
    lastUpdated: "1 天前",
    category: "時尚",
    engagementRate: "6.8%",
    dataSource: "simulated"
  }
];

export default function Home() {
  const [showTest, setShowTest] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [loginMode, setLoginMode] = useState<'buttons' | 'google' | 'password'>('buttons');
  const [activeTab, setActiveTab] = useState("dashboard");
  const [newInfluencerUrl, setNewInfluencerUrl] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedInfluencer, setSelectedInfluencer] = useState<DemoInfluencer | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectInfo | null>(null);
  const [newProject, setNewProject] = useState<ProjectEditData>({
    name: "",
    description: "",
    budget: "",
    startDate: "",
    endDate: ""
  });
  const [analysisMode, setAnalysisMode] = useState<"single" | "batch">("single");

  // Project and influencer management state
  const [projects, setProjects] = useState<ProjectInfo[]>([
    {
      id: "1",
      name: "春季美妝企劃",
      description: "針對春季新品推廣的KOL合作專案",
      budget: "500,000 元",
      startDate: "2024-03-01",
      endDate: "2024-05-31",
      status: "進行中",
      influencers: [1]
    }
  ]);

  // Influencer management state
  const [selectedInfluencers, setSelectedInfluencers] = useState<number[]>([]);
  const [compareMode, setCompareMode] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterPlatform, setFilterPlatform] = useState<string>("all");
  const [showProjectSelect, setShowProjectSelect] = useState(false);
  const [targetInfluencerId, setTargetInfluencerId] = useState<number | null>(null);

  // Followers editing state
  const [editingFollowers, setEditingFollowers] = useState(false);
  const [editFollowersValue, setEditFollowersValue] = useState('');
  const [editReason, setEditReason] = useState('');
  const [showFollowersHistory, setShowFollowersHistory] = useState(false);

  // Brand management state
  const [brands, setBrands] = useState<any[]>([]);

  // Project editing state
  const [editingProject, setEditingProject] = useState(false);
  const [editProjectData, setEditProjectData] = useState<ProjectEditData>({
    name: "",
    description: "",
    budget: "",
    startDate: "",
    endDate: ""
  });

  const { user, signInWithGoogle, signOutUser, signInAsDemo } = useAuth();

  // 調試：檢查 AuthContext 狀態
  console.log("🔍 AuthContext 狀態:", {
    hasUser: !!user,
    userId: user?.uid,
    hasSignInWithGoogle: typeof signInWithGoogle === 'function',
    hasSignInAsDemo: typeof signInAsDemo === 'function',
    hasSignOutUser: typeof signOutUser === 'function'
  });

  // Login and demo functions
  const handleDemoMode = () => {
    console.log("🎭 體驗模式按鈕被點擊");
    try {
      signInAsDemo();
      setDemoMode(true);
      console.log("✅ 體驗模式登入成功");
    } catch (error) {
      console.error("❌ 體驗模式登入失敗:", error);
      alert("體驗模式登入失敗: " + (error as Error).message);
    }
  };

  const handleLogin = async () => {
    console.log("🔐 Google 登入按鈕被點擊");
    console.log("📊 當前狀態:", { isLoggingIn, user: user?.uid });
    
    setIsLoggingIn(true);
    try {
      console.log("🔄 開始調用 signInWithGoogle...");
      await signInWithGoogle();
      console.log("✅ Google 登入成功");
      setDemoMode(false);
    } catch (error) {
      console.error("❌ Google 登入失敗詳細錯誤:", error);
      const errorMessage = (error as Error).message || "登入失敗";
      alert('Google 登入失敗: ' + errorMessage);
    } finally {
      setIsLoggingIn(false);
      console.log("🏁 登入流程結束");
    }
  };

  // Analysis functions
  const handleAnalyzeInfluencer = async () => {
    if (!newInfluencerUrl) return;

    setAnalyzing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate API call

      // Add simulated result
      const newInfluencer: DemoInfluencer = {
        id: Date.now(),
        name: "新分析網紅",
        platform: newInfluencerUrl.includes("instagram") ? "Instagram" : "YouTube",
        followers: "95K",
        url: newInfluencerUrl,
        avatar: "https://placehold.co/40x40/4ecdc4/ffffff?text=新",
        score: 85.2,
        tags: ["新網紅"],
        lastUpdated: "剛剛",
        category: "其他",
        engagementRate: "3.8%",
        dataSource: "real_api"
      };

      // In real app, this would update the influencers list
      setNewInfluencerUrl("");
      alert("✅ 分析完成！已成功分析網紅數據。");
    } catch (error) {
      alert('❌ 分析失敗：' + (error as Error).message);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleBatchResults = (results: BatchProcessingResult[]) => {
    const successCount = results.filter(r => r.status === 'success').length;
    const errorCount = results.length - successCount;
    alert('✅ 批次處理完成！\n成功: ' + successCount + ' 個\n失敗: ' + errorCount + ' 個');
  };

  // Project management functions
  const addProject = () => {
    if (!newProject.name.trim()) return;

    const project: ProjectInfo = {
      id: Date.now().toString(),
      ...newProject,
      status: "進行中",
      influencers: []
    };

    setProjects([...projects, project]);
    setNewProject({
      name: "",
      description: "",
      budget: "",
      startDate: "",
      endDate: ""
    });
    alert('✅ 專案「' + project.name + '」創建成功！');
  };

  const startEditProject = () => {
    if (selectedProject) {
      setEditProjectData({
        name: selectedProject.name,
        description: selectedProject.description,
        budget: selectedProject.budget,
        startDate: selectedProject.startDate,
        endDate: selectedProject.endDate
      });
      setEditingProject(true);
    }
  };

  const saveProjectEdit = () => {
    if (selectedProject) {
      setProjects(projects.map(p =>
        p.id === selectedProject.id
          ? { ...p, ...editProjectData }
          : p
      ));
      setEditingProject(false);
      alert("✅ 專案資訊已更新");
    }
  };

  const cancelEditProject = () => {
    setEditingProject(false);
    setEditProjectData({
      name: "",
      description: "",
      budget: "",
      startDate: "",
      endDate: ""
    });
  };

  const updateProjectStatus = (newStatus: string) => {
    if (selectedProject) {
      setProjects(projects.map(p =>
        p.id === selectedProject.id ? { ...p, status: newStatus as "籌備中" | "進行中" | "已完成" | "暫停" } : p
      ));
      setSelectedProject({ ...selectedProject, status: newStatus as "籌備中" | "進行中" | "已完成" | "暫停" });
      alert('✅ 專案狀態已更新為「' + newStatus + '」');
    }
  };

  // Influencer management functions
  const addToProject = (influencer: DemoInfluencer) => {
    if (!selectedProject) return;

    const updatedProjects = projects.map(p =>
      p.id === selectedProject.id
        ? { ...p, influencers: [...(p.influencers || []), influencer.id] }
        : p
    );
    setProjects(updatedProjects);
    setSelectedProject({ ...selectedProject, influencers: [...(selectedProject.influencers || []), influencer.id] });
    alert('✅ 已將「' + (influencer?.name || '') + '」加入專案「' + selectedProject.name + '」');
  };

  const removeFromProject = (influencer: DemoInfluencer) => {
    if (!selectedProject) return;

    const updatedProjects = projects.map(p =>
      p.id === selectedProject.id
        ? { ...p, influencers: (p.influencers || []).filter(id => id !== influencer.id) }
        : p
    );
    setProjects(updatedProjects);
    setSelectedProject({ ...selectedProject, influencers: (selectedProject.influencers || []).filter(id => id !== influencer.id) });
    alert('❌ 已將「' + (influencer?.name || '') + '」從專案「' + selectedProject.name + '」移除');
  };

  const addInfluencerToProject = (influencerId: number, projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    const influencer = demoInfluencers.find(inf => inf.id === influencerId);

    if (project && influencer) {
      const updatedProjects = projects.map(p =>
        p.id === projectId
          ? { ...p, influencers: [...(p.influencers || []), influencerId] }
          : p
      );
      setProjects(updatedProjects);
      alert('✅ 已將「' + (influencer?.name || '') + '」加入專案「' + (project?.name || '') + '」');
    }
  };

  // Followers editing functions
  const startEditFollowers = (influencer: DemoInfluencer) => {
    setEditFollowersValue(influencer.followers);
    setEditingFollowers(true);
  };

  const saveFollowersEdit = () => {
    if (editFollowersValue.trim() && editReason.trim()) {
      // In real app, update influencer data
      setEditingFollowers(false);
      setEditFollowersValue('');
      setEditReason('');
      alert("✅ 粉絲數量已更新");
    }
  };

  const cancelEditFollowers = () => {
    setEditingFollowers(false);
    setEditFollowersValue('');
    setEditReason('');
  };

  // Brand management functions
  const handleSaveBrand = (brand: any) => {
    const existingIndex = brands.findIndex(b => b.id === brand.id);
    if (existingIndex >= 0) {
      const updatedBrands = [...brands];
      updatedBrands[existingIndex] = brand;
      setBrands(updatedBrands);
    } else {
      setBrands([...brands, brand]);
    }
  };

  const handleDeleteBrand = (brandId: string) => {
    setBrands(brands.filter(b => b.id !== brandId));
  };

  // 如果用戶已登入，顯示 Dashboard
  if (user) {
    return <Dashboard />;
  }

  // Login interface
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">KOL Review</h1>
          <p className="text-gray-600">網紅智慧評估平台</p>
        </div>

        {/* 測試按鈕 */}
        <button
          onClick={() => {
            console.log("🧪 測試按鈕被點擊 - JavaScript 正常工作！");
            alert("測試按鈕工作正常！");
          }}
          className="w-full mb-4 bg-yellow-500 text-white py-2 rounded-lg font-medium hover:bg-yellow-600 transition-colors"
        >
          🧪 測試按鈕（點擊檢查）
        </button>

        {/* Firebase 連接測試 */}
        <FirebaseConnectionTest />

        {/* 登入選項按鈕 */}
        {loginMode === 'buttons' && (
          <div className="space-y-4">
            <button
              onClick={handleLogin}
              disabled={isLoggingIn}
              className={`w-full py-3 rounded-lg font-medium transition-colors ${
                isLoggingIn
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isLoggingIn ? "登入中..." : "🔐 Google 登入"}
            </button>

            <button
              onClick={() => {
                console.log("📧 電子郵件登入按鈕被點擊");
                setLoginMode('password');
              }}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              📧 電子郵件登入
            </button>

            <button
              onClick={handleDemoMode}
              className="w-full bg-purple-100 text-purple-800 py-3 rounded-lg font-medium hover:bg-purple-200 transition-colors"
            >
              ✨ 立即體驗平台功能
            </button>
          </div>
        )}

        {/* 密碼登入表單 */}
        {loginMode === 'password' && (
          <div>
            <PasswordLoginForm />
            <button
              onClick={() => setLoginMode('buttons')}
              className="w-full mt-4 bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              ← 返回登入選項
            </button>
          </div>
        )}

        {/* 提示文字 */}
        {loginMode === 'buttons' && (
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>✨ 體驗模式包含完整功能演示</p>
            <p>🔐 登入後可保存真實數據</p>
            <p>📧 新用戶請選擇電子郵件註冊</p>
          </div>
        )}
      </div>
    </div>
  );
}
