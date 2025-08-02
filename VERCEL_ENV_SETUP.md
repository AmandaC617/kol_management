# 🚀 Vercel 環境變數完整設定指南

## 📋 **必要環境變數列表**

請在 Vercel Dashboard → Project Settings → Environment Variables 中添加以下變數：

---

## 🎯 **基礎系統設定 (必需)**

### **DEMO 模式控制**
```
Name: NEXT_PUBLIC_DEMO_MODE
Value: false
```
💡 **說明**: 設為 `false` 啟用真實API，設為 `true` 使用體驗模式

---

## 🤖 **Google AI APIs (核心功能)**

### **Gemini AI API (必需)**
```
Name: NEXT_PUBLIC_GEMINI_API_KEY
Value: [您的 Gemini API 金鑰]
```
💡 **獲取方式**: https://console.cloud.google.com → Gemini API

### **YouTube Data API (必需)**
```
Name: NEXT_PUBLIC_YOUTUBE_API_KEY
Value: [您的 YouTube API 金鑰]
```
💡 **獲取方式**: https://console.cloud.google.com → YouTube Data API v3

### **Google Custom Search API (必需)**
```
Name: NEXT_PUBLIC_GOOGLE_SEARCH_API_KEY
Value: [您的 Google Search API 金鑰]
```

### **Google Search Engine ID (必需)**
```
Name: NEXT_PUBLIC_GOOGLE_SEARCH_ENGINE_ID
Value: [您的 Search Engine ID]
```
💡 **獲取方式**: https://cse.google.com/cse/

---

## 🔒 **Firebase 配置 (數據庫)**

### **Firebase API Key**
```
Name: NEXT_PUBLIC_FIREBASE_API_KEY
Value: [您的 Firebase API Key]
```

### **Firebase Auth Domain**
```
Name: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
Value: [您的專案ID].firebaseapp.com
```

### **Firebase Project ID**
```
Name: NEXT_PUBLIC_FIREBASE_PROJECT_ID
Value: [您的 Firebase 專案 ID]
```

### **Firebase Storage Bucket**
```
Name: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
Value: [您的專案ID].appspot.com
```

### **Firebase Messaging Sender ID**
```
Name: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
Value: [您的 Messaging Sender ID]
```

### **Firebase App ID**
```
Name: NEXT_PUBLIC_FIREBASE_APP_ID
Value: [您的 Firebase App ID]
```

💡 **獲取方式**: Firebase Console → 專案設定 → 一般 → SDK 設定和配置

---

## 🔑 **Google OAuth (登入功能)**

### **Google Client ID**
```
Name: NEXT_PUBLIC_GOOGLE_CLIENT_ID
Value: [您的 Google OAuth Client ID]
```

### **Google Client Secret (伺服器端)**
```
Name: GOOGLE_CLIENT_SECRET
Value: [您的 Google OAuth Client Secret]
```

💡 **獲取方式**: Google Cloud Console → 憑證 → OAuth 2.0 用戶端 ID

---

## 🌐 **NextAuth 配置**

### **NextAuth Secret**
```
Name: NEXTAUTH_SECRET
Value: [隨機生成的密鑰字串]
```
💡 **建議**: 使用線上工具生成 32 字元隨機字串

### **NextAuth URL**
```
Name: NEXTAUTH_URL
Value: https://您的網域.vercel.app
```

---

## 🎨 **可選的進階 APIs**

### **Social Blade API (可選)**
```
Name: NEXT_PUBLIC_SOCIAL_BLADE_API_KEY
Value: [您的 Social Blade API Key]
```
💡 **說明**: 提供成長趨勢數據，可選

---

## 📊 **環境變數完整檢查清單**

### **✅ 必需 (11個)**
- [ ] `NEXT_PUBLIC_DEMO_MODE`
- [ ] `NEXT_PUBLIC_GEMINI_API_KEY`
- [ ] `NEXT_PUBLIC_YOUTUBE_API_KEY` 
- [ ] `NEXT_PUBLIC_GOOGLE_SEARCH_API_KEY`
- [ ] `NEXT_PUBLIC_GOOGLE_SEARCH_ENGINE_ID`
- [ ] `NEXT_PUBLIC_FIREBASE_API_KEY`
- [ ] `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- [ ] `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- [ ] `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- [ ] `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- [ ] `NEXT_PUBLIC_FIREBASE_APP_ID`

### **🔑 登入功能 (4個)**
- [ ] `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
- [ ] `GOOGLE_CLIENT_SECRET`
- [ ] `NEXTAUTH_SECRET`
- [ ] `NEXTAUTH_URL`

### **🎨 可選 (1個)**
- [ ] `NEXT_PUBLIC_SOCIAL_BLADE_API_KEY`

---

## 🚀 **快速設定步驟**

### **步驟1: 體驗模式 (立即可用)**
僅設定：
```
NEXT_PUBLIC_DEMO_MODE=true
```
✅ **立即可體驗所有功能**

### **步驟2: 專業模式 (推薦)**
設定所有 11 個必需變數
✅ **獲得真實數據和完整功能**

### **步驟3: 企業模式 (完整)**
設定所有 16 個變數
✅ **完整的專業級功能**

---

## 🎯 **API 獲取優先順序**

### **立即開始 (體驗模式)**
1. 設定 `NEXT_PUBLIC_DEMO_MODE=true`
2. 立即部署測試

### **第一階段 (基礎功能)**
1. Google Gemini API
2. YouTube Data API
3. Firebase 基礎配置

### **第二階段 (完整功能)**
1. Google Custom Search API
2. 完整 Firebase 配置
3. Google OAuth 設定

---

## 💡 **設定技巧**

### **Vercel 環境變數設定**
1. 前往 Vercel Dashboard
2. 選擇您的專案：`kol-evaluation-platform-v2`
3. Settings → Environment Variables
4. 逐一添加上述變數
5. 每個變數都選擇 **Production**, **Preview**, **Development**

### **測試設定**
1. 添加基礎變數後點擊 **"Redeploy"**
2. 訪問網站測試功能
3. 逐步添加更多 API 提升功能

---

## 🎊 **設定完成後您將獲得**

✅ **真實數據**: 準確的粉絲數、互動率  
✅ **AI 分析**: 深度內容分析和品牌適配  
✅ **批量處理**: 一次分析多個網紅  
✅ **智能比較**: 專案內和資料庫比較  
✅ **雲端儲存**: 永久保存分析數據  
✅ **用戶登入**: Google 帳號登入系統

**這將是最先進的 AI 驅動網紅評估平台！** 🚀✨