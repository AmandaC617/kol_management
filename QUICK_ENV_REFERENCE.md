# ⚡ 快速環境變數參考表

## 🎯 **Vercel 環境變數一鍵設定**

**複製以下內容，逐一在 Vercel Dashboard 中添加：**

---

## 📋 **必需變數 (11個)**

| 變數名稱 | 取得位置 | 範例值 |
|---------|---------|--------|
| `NEXT_PUBLIC_DEMO_MODE` | 手動設定 | `false` |
| `NEXT_PUBLIC_GEMINI_API_KEY` | https://aistudio.google.com/ | `AIzaSyBxxxxxxxxxxxxxxxxxxxxxx` |
| `NEXT_PUBLIC_YOUTUBE_API_KEY` | Google Cloud Console | `AIzaSyDxxxxxxxxxxxxxxxxxxxxxx` |
| `NEXT_PUBLIC_GOOGLE_SEARCH_API_KEY` | Google Cloud Console | `AIzaSyExxxxxxxxxxxxxxxxxxxxxx` |
| `NEXT_PUBLIC_GOOGLE_SEARCH_ENGINE_ID` | https://cse.google.com/cse/ | `017576662512345678901:abcdef` |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase Console | `AIzaSyBxxxxxxxxxxxxxxxxxxxxxx` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase Console | `your-project.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase Console | `your-project-id` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase Console | `your-project.appspot.com` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase Console | `123456789012` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase Console | `1:123456789012:web:abcdef...` |

---

## 🔑 **登入功能 (4個)**

| 變數名稱 | 取得位置 | 範例值 |
|---------|---------|--------|
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Google Cloud Console | `123456-abcdef...googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | Google Cloud Console | `GOCSPX-abcdefghijklmnop...` |
| `NEXTAUTH_SECRET` | 隨機生成 | `生成32字元隨機字串` |
| `NEXTAUTH_URL` | 您的網域 | `https://kol-evaluation-platform-v2.vercel.app` |

---

## 🎨 **可選功能 (1個)**

| 變數名稱 | 取得位置 | 範例值 |
|---------|---------|--------|
| `NEXT_PUBLIC_SOCIAL_BLADE_API_KEY` | Social Blade | `sb_xxxxxxxxxxxxxxxxxxxxxxx` |

---

## 🚀 **三階段設定策略**

### **🎭 階段1：立即體驗 (30秒)**
```
NEXT_PUBLIC_DEMO_MODE=true
```
✅ **立即可用所有功能**

### **🤖 階段2：真實數據 (15分鐘)**
添加前5個 API：
- Gemini API
- YouTube API  
- Google Search API + Engine ID
- Firebase 基礎配置

### **🔒 階段3：完整功能 (30分鐘)**
添加所有15個變數

---

## 📝 **Vercel 設定步驟**

1. **前往 Vercel Dashboard**
2. **選擇專案**: `kol-evaluation-platform-v2`  
3. **Settings → Environment Variables**
4. **添加變數**:
   - Name: `[變數名稱]`
   - Value: `[您的值]`
   - Environment: 選擇 **All** (Production, Preview, Development)
5. **重複直到完成**
6. **點擊 Redeploy**

---

## 🎯 **API 獲取快速連結**

| API | 直接連結 | 所需時間 |
|-----|---------|---------|
| Gemini AI | https://aistudio.google.com/ | 2分鐘 |
| YouTube Data | https://console.cloud.google.com/ | 5分鐘 |
| Custom Search | https://cse.google.com/cse/ | 3分鐘 |
| Firebase | https://console.firebase.google.com/ | 10分鐘 |
| Google OAuth | https://console.cloud.google.com/apis/credentials | 5分鐘 |

---

## ✅ **設定檢查清單**

- [ ] **階段1**: 設定 `NEXT_PUBLIC_DEMO_MODE=true` 並測試
- [ ] **Gemini API**: 從 AI Studio 獲取金鑰
- [ ] **YouTube API**: 啟用 API 並創建金鑰
- [ ] **Search API**: 創建 Search Engine 並獲取 ID
- [ ] **Firebase**: 創建專案並獲取所有配置
- [ ] **Google OAuth**: 設定 OAuth 用戶端 ID
- [ ] **NextAuth**: 生成 Secret 並設定 URL
- [ ] **測試**: 訪問網站確認所有功能正常

---

## 🎊 **完成後您將擁有**

✅ **AI 智能分析** - Gemini 驅動的深度評估  
✅ **真實數據** - YouTube 準確的粉絲數和互動率  
✅ **批量處理** - 一次分析多個網紅  
✅ **智能比較** - 專案內和資料庫比較  
✅ **雲端儲存** - Firebase 永久保存數據  
✅ **用戶登入** - Google 帳號無縫整合  
✅ **搜尋功能** - Google 搜尋引擎整合

**這將是最先進的企業級 KOL 評估平台！** 🚀✨