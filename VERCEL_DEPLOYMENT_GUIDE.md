# 🚀 Vercel 部署指南

## 📋 **前置準備**

### 1. **安裝 Vercel CLI**
```bash
npm install -g vercel
```

### 2. **登入 Vercel**
```bash
vercel login
```

## 🔧 **部署步驟**

### **步驟 1：初始化 Vercel 專案**
```bash
vercel
```

### **步驟 2：配置專案**
- **Project Name**: `kol-management` (或您喜歡的名稱)
- **Framework Preset**: `Next.js`
- **Root Directory**: `./` (當前目錄)
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

### **步驟 3：設置環境變數**

在 Vercel Dashboard 中設置以下環境變數：

#### **Firebase 配置**
```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyBnu1iAe8KLs3PiSbdJRS0H5jh2Uo0_05g
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=kolreview-a4f6c.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=kolreview-a4f6c
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=kolreview-a4f6c.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=90312393668
NEXT_PUBLIC_FIREBASE_APP_ID=1:90312393668:web:5491550ea7b2ab20cfda91
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-NHYZJRF3SW
```

#### **Google APIs**
```
NEXT_PUBLIC_GEMINI_API_KEY=AIzaSyBEyqHDCcrYILrZSgiqNFkc2gzfUly6I-Q
NEXT_PUBLIC_YOUTUBE_API_KEY=AIzaSyA3QorpRxRRuQKlH7pyohOsVrb6ENTWeLQ
NEXT_PUBLIC_GOOGLE_SEARCH_API_KEY=AIzaSyB0JrcYMnjxkzzxZh-nHrwJjFFzReCV6BU
NEXT_PUBLIC_GOOGLE_SEARCH_ENGINE_ID=c554d8394418b4eb8
NEXT_PUBLIC_GOOGLE_CLIENT_ID=90312393668-bed53edkk191mbv9ep4ceh2ohsv8607i.apps.googleusercontent.com
```

#### **Social Blade API**
```
NEXT_PUBLIC_SOCIAL_BLADE_CLIENT_ID=cli_eb5ed4868c62823b8665d8eb
NEXT_PUBLIC_SOCIAL_BLADE_TOKEN=9f3b85809ebce4e83437d235fd24fd62fdc1f28b3ad0dcc0a235def1d3032f33
```

#### **App 配置**
```
NEXT_PUBLIC_APP_ID=kol-evaluation-platform
NEXT_PUBLIC_DEMO_MODE=false
NEXT_PUBLIC_ALLOW_DEMO_MODE=true
```

## 🌐 **域名配置**

### **自定義域名（可選）**
1. 在 Vercel Dashboard 中點擊專案
2. 進入 "Settings" → "Domains"
3. 添加您的自定義域名
4. 按照指示更新 DNS 記錄

## 🔄 **自動部署**

### **GitHub 整合**
1. 在 Vercel Dashboard 中連接 GitHub 倉庫
2. 選擇 `AmandaC617/kol_management`
3. 設置自動部署規則：
   - **Production Branch**: `main`
   - **Preview Branches**: `develop`, `feature/*`

## 📊 **部署後檢查**

### **1. 檢查 API 狀態**
- 訪問 `/debug` 頁面
- 檢查 API 狀態指示器
- 確認所有服務正常運行

### **2. 測試核心功能**
- 用戶登入/註冊
- 網紅分析功能
- 數據導出功能
- 品牌匹配功能

### **3. 性能監控**
- 檢查 Vercel Analytics
- 監控 API 響應時間
- 檢查錯誤日誌

## 🚨 **常見問題**

### **Q: 環境變數不生效？**
A: 確保變數名稱以 `NEXT_PUBLIC_` 開頭，並重新部署

### **Q: 構建失敗？**
A: 檢查 `package.json` 中的依賴版本，確保兼容性

### **Q: API 調用失敗？**
A: 檢查 CORS 設置和 API 密鑰配置

## 📞 **支援**

如果遇到問題，請檢查：
1. Vercel 部署日誌
2. 瀏覽器控制台錯誤
3. 網路請求狀態

---

**🎯 部署完成後，您的網紅評估平台將在全球範圍內可用！**
