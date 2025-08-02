# 🔑 KOL 評估平台 - API 金鑰詳細獲取指南

## 🎯 **完整環境變數列表與獲取步驟**

---

## 🤖 **Google AI APIs 獲取指南**

### **1. NEXT_PUBLIC_GEMINI_API_KEY**

#### **獲取步驟：**
1. **前往 Google AI Studio**：
   - 網址：https://aistudio.google.com/
   - 使用 Google 帳號登入

2. **獲取 API Key**：
   - 點擊左側選單「Get API key」
   - 點擊「Create API key」
   - 選擇「Create API key in new project」
   - 複製生成的 API key

#### **範例格式：**
```
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxx-xxxxxxxx
```

#### **測試方式：**
```bash
curl -H "Content-Type: application/json" \
     -H "x-goog-api-key: YOUR_API_KEY" \
     -d '{"contents":[{"parts":[{"text":"Hello"}]}]}' \
     https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent
```

---

### **2. NEXT_PUBLIC_YOUTUBE_API_KEY**

#### **獲取步驟：**
1. **前往 Google Cloud Console**：
   - 網址：https://console.cloud.google.com/
   - 創建新專案或選擇現有專案

2. **啟用 YouTube Data API v3**：
   - 在搜尋框輸入「YouTube Data API v3」
   - 點擊「啟用」

3. **創建憑證**：
   - 左側選單 → 「APIs & Services」 → 「Credentials」
   - 點擊「+ CREATE CREDENTIALS」 → 「API key」
   - 複製生成的 API key

4. **限制 API key（建議）**：
   - 點擊新創建的 API key
   - 「Application restrictions」選擇「HTTP referrers」
   - 添加您的網域：`*.vercel.app/*`
   - 「API restrictions」選擇「Restrict key」
   - 選擇「YouTube Data API v3」

#### **範例格式：**
```
NEXT_PUBLIC_YOUTUBE_API_KEY=AIzaSyDxxxxxxxxxxxxxxxxxxxxxx-xxxxxxxx
```

#### **測試方式：**
```bash
curl "https://www.googleapis.com/youtube/v3/channels?part=snippet&forUsername=PewDiePie&key=YOUR_API_KEY"
```

---

### **3. NEXT_PUBLIC_GOOGLE_SEARCH_API_KEY**

#### **獲取步驟：**
1. **Google Cloud Console**（同上面步驟1-3）
2. **啟用 Custom Search API**：
   - 搜尋「Custom Search API」
   - 點擊「啟用」
3. **使用相同的 API key** 或創建新的

#### **範例格式：**
```
NEXT_PUBLIC_GOOGLE_SEARCH_API_KEY=AIzaSyExxxxxxxxxxxxxxxxxxxxxx-xxxxxxxx
```

---

### **4. NEXT_PUBLIC_GOOGLE_SEARCH_ENGINE_ID**

#### **獲取步驟：**
1. **前往 Google Custom Search Engine**：
   - 網址：https://cse.google.com/cse/

2. **創建搜尋引擎**：
   - 點擊「Add」
   - 「Sites to search」輸入：`*`（搜索整個網路）
   - 「Name of the search engine」輸入：`KOL Platform Search`
   - 點擊「Create」

3. **獲取 Search Engine ID**：
   - 點擊新創建的搜尋引擎
   - 左側選單「Setup」
   - 複製「Search engine ID」

#### **範例格式：**
```
NEXT_PUBLIC_GOOGLE_SEARCH_ENGINE_ID=017576662512345678901:abcdefghijk
```

---

## 🔒 **Firebase 配置獲取指南**

### **前置作業：創建 Firebase 專案**

1. **前往 Firebase Console**：
   - 網址：https://console.firebase.google.com/
   - 使用 Google 帳號登入

2. **創建專案**：
   - 點擊「Create a project」
   - 專案名稱：`kol-evaluation-platform`
   - 選擇是否啟用 Google Analytics（建議啟用）
   - 點擊「Create project」

3. **啟用必要服務**：
   - **Authentication**：
     - 左側選單 → Authentication → Get started
     - Sign-in method → Google → Enable → Save
   - **Firestore Database**：
     - 左側選單 → Firestore Database → Create database
     - Start in test mode → Next
     - 選擇 location → Done

### **獲取 Firebase 配置**

1. **專案設定**：
   - 左側選單 → Project settings (齒輪圖示)
   - 向下滾動到「Your apps」
   - 點擊「Add app」 → Web (</>) 圖示

2. **註冊應用程式**：
   - App nickname：`kol-platform-web`
   - 勾選「Also set up Firebase Hosting」（可選）
   - 點擊「Register app」

3. **複製配置**：
   - 會顯示類似以下的配置：

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyBxxxxxxxxxxxxxxxxxxxxxx-xxxxxxxx",
  authDomain: "kol-evaluation-platform.firebaseapp.com",
  projectId: "kol-evaluation-platform",
  storageBucket: "kol-evaluation-platform.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890abcdef"
};
```

### **對應的環境變數：**

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBxxxxxxxxxxxxxxxxxxxxxx-xxxxxxxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=kol-evaluation-platform.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=kol-evaluation-platform
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=kol-evaluation-platform.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890abcdef
```

---

## 🔑 **Google OAuth 設定指南**

### **1. NEXT_PUBLIC_GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET**

#### **獲取步驟：**

1. **Google Cloud Console → 憑證**：
   - 網址：https://console.cloud.google.com/apis/credentials
   - 選擇您的專案

2. **創建 OAuth 2.0 用戶端 ID**：
   - 點擊「+ CREATE CREDENTIALS」 → 「OAuth client ID」
   - Application type：「Web application」
   - Name：`KOL Platform OAuth`

3. **設定授權網域**：
   - **Authorized JavaScript origins**：
     ```
     https://kol-evaluation-platform-v2.vercel.app
     http://localhost:3000
     ```
   - **Authorized redirect URIs**：
     ```
     https://kol-evaluation-platform-v2.vercel.app/api/auth/callback/google
     http://localhost:3000/api/auth/callback/google
     ```

4. **複製憑證**：
   - Client ID：`123456789012-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com`
   - Client Secret：`GOCSPX-abcdefghijklmnopqrstuvwxyz123456`

#### **環境變數：**
```bash
NEXT_PUBLIC_GOOGLE_CLIENT_ID=123456789012-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abcdefghijklmnopqrstuvwxyz123456
```

---

## 🌐 **NextAuth 設定**

### **1. NEXTAUTH_SECRET**

#### **生成方式：**
```bash
# 方法1: 使用 openssl
openssl rand -base64 32

# 方法2: 線上生成器
# 前往：https://generate-secret.vercel.app/32
```

#### **範例：**
```bash
NEXTAUTH_SECRET=abcdefghijklmnopqrstuvwxyz123456789012345678901234
```

### **2. NEXTAUTH_URL**

```bash
NEXTAUTH_URL=https://kol-evaluation-platform-v2.vercel.app
```

---

## 🎨 **可選 APIs**

### **NEXT_PUBLIC_SOCIAL_BLADE_API_KEY（可選）**

#### **獲取步驟：**
1. **前往 Social Blade**：
   - 網址：https://socialblade.com/
   - 註冊帳號

2. **API 申請**：
   - 聯繫 Social Blade 申請 API 存取權限
   - 通常需要說明使用目的

#### **範例：**
```bash
NEXT_PUBLIC_SOCIAL_BLADE_API_KEY=sb_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 📋 **完整 Vercel 環境變數設定清單**

### **複製以下內容到 Vercel 環境變數：**

```bash
# 系統設定
NEXT_PUBLIC_DEMO_MODE=false

# Google AI APIs
NEXT_PUBLIC_GEMINI_API_KEY=[從 AI Studio 獲取]
NEXT_PUBLIC_YOUTUBE_API_KEY=[從 Google Cloud Console 獲取]
NEXT_PUBLIC_GOOGLE_SEARCH_API_KEY=[從 Google Cloud Console 獲取]
NEXT_PUBLIC_GOOGLE_SEARCH_ENGINE_ID=[從 Custom Search Engine 獲取]

# Firebase 配置
NEXT_PUBLIC_FIREBASE_API_KEY=[從 Firebase Console 獲取]
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=[專案ID].firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=[Firebase 專案 ID]
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=[專案ID].appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=[從 Firebase Console 獲取]
NEXT_PUBLIC_FIREBASE_APP_ID=[從 Firebase Console 獲取]

# Google OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=[從 Google Cloud Console 獲取]
GOOGLE_CLIENT_SECRET=[從 Google Cloud Console 獲取]

# NextAuth
NEXTAUTH_SECRET=[生成的 32 字元隨機字串]
NEXTAUTH_URL=https://kol-evaluation-platform-v2.vercel.app

# 可選
NEXT_PUBLIC_SOCIAL_BLADE_API_KEY=[可選]
```

---

## 🚀 **設定優先順序建議**

### **階段1：立即體驗（1分鐘）**
```bash
NEXT_PUBLIC_DEMO_MODE=true
```

### **階段2：基礎功能（15分鐘）**
```bash
NEXT_PUBLIC_DEMO_MODE=false
NEXT_PUBLIC_GEMINI_API_KEY=[必需]
NEXT_PUBLIC_YOUTUBE_API_KEY=[必需]
```

### **階段3：完整功能（30分鐘）**
```bash
# 添加所有 Firebase 配置
# 添加 Google Search API
```

### **階段4：專業級（45分鐘）**
```bash
# 添加 Google OAuth
# 添加 NextAuth 配置
```

---

## 💰 **成本估算**

### **免費配額：**
- **Gemini API**: 每分鐘 15 次請求
- **YouTube API**: 每日 10,000 單位
- **Custom Search**: 每日 100 次搜索
- **Firebase**: 每月 50,000 次讀取/20,000 次寫入

### **付費計算：**
- **中度使用**: $10-30/月
- **重度使用**: $30-100/月

---

## 🔍 **測試驗證**

設定完成後，請訪問：
```
https://kol-evaluation-platform-v2.vercel.app
```

**檢查項目：**
- ✅ 網站正常載入
- ✅ 可以創建專案
- ✅ 可以分析網紅（真實數據）
- ✅ 可以使用比較功能
- ✅ 可以 Google 登入

---

**按照以上步驟獲取所有 API 金鑰，您將擁有最完整的 KOL 評估平台！** 🎊✨