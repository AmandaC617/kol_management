# 📋 Vercel 環境變數 - 複製貼上清單

## 🎯 **直接複製到 Vercel 使用**

**前往**: Vercel Dashboard → kol-evaluation-platform-v2 → Settings → Environment Variables

---

## ⚡ **選項1: 立即體驗模式 (1個變數)**

```
Name: NEXT_PUBLIC_DEMO_MODE
Value: true
```

---

## 🚀 **選項2: 完整功能模式 (15個變數)**

### **系統設定**
```
Name: NEXT_PUBLIC_DEMO_MODE
Value: false
```

### **Google AI APIs**
```
Name: NEXT_PUBLIC_GEMINI_API_KEY
Value: 請填入您的Gemini API金鑰
```

```
Name: NEXT_PUBLIC_YOUTUBE_API_KEY
Value: 請填入您的YouTube API金鑰
```

```
Name: NEXT_PUBLIC_GOOGLE_SEARCH_API_KEY
Value: 請填入您的Google Search API金鑰
```

```
Name: NEXT_PUBLIC_GOOGLE_SEARCH_ENGINE_ID
Value: 請填入您的Search Engine ID
```

### **Firebase 配置**
```
Name: NEXT_PUBLIC_FIREBASE_API_KEY
Value: 請填入您的Firebase API Key
```

```
Name: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
Value: 您的專案ID.firebaseapp.com
```

```
Name: NEXT_PUBLIC_FIREBASE_PROJECT_ID
Value: 請填入您的Firebase專案ID
```

```
Name: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
Value: 您的專案ID.appspot.com
```

```
Name: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
Value: 請填入您的Messaging Sender ID
```

```
Name: NEXT_PUBLIC_FIREBASE_APP_ID
Value: 請填入您的Firebase App ID
```

### **Google OAuth**
```
Name: NEXT_PUBLIC_GOOGLE_CLIENT_ID
Value: 請填入您的Google Client ID
```

```
Name: GOOGLE_CLIENT_SECRET
Value: 請填入您的Google Client Secret
```

### **NextAuth 設定**
```
Name: NEXTAUTH_SECRET
Value: 請填入32字元隨機字串
```

```
Name: NEXTAUTH_URL
Value: https://kol-evaluation-platform-v2.vercel.app
```

### **可選功能**
```
Name: NEXT_PUBLIC_SOCIAL_BLADE_API_KEY
Value: 請填入您的Social Blade API Key (可選)
```

---

## 📝 **設定步驟**

1. **複製上方的 Name 和 Value**
2. **在 Vercel 中點擊 "Add New"**
3. **貼上 Name 欄位**
4. **貼上或填入 Value 欄位**
5. **Environment 選擇 "Production, Preview, Development"**
6. **點擊 "Save"**
7. **重複直到完成**
8. **最後點擊 "Redeploy"**

---

## 🎯 **建議設定順序**

### **第一步: 立即體驗**
```
NEXT_PUBLIC_DEMO_MODE=true
```
→ 設定後立即 Redeploy 測試

### **第二步: 升級真實功能**
```
NEXT_PUBLIC_DEMO_MODE=false
NEXT_PUBLIC_GEMINI_API_KEY=[您的金鑰]
NEXT_PUBLIC_YOUTUBE_API_KEY=[您的金鑰]
```
→ 設定後 Redeploy 測試

### **第三步: 完整功能**
添加所有其他變數 → 最終 Redeploy

---

## ✅ **每個變數都要選擇的 Environment**
- ☑️ **Production**
- ☑️ **Preview** 
- ☑️ **Development**

---

## 🎊 **設定完成後**
點擊右上角的 **"Redeploy"** 按鈕，等待 3-5 分鐘完成部署。

然後訪問: https://kol-evaluation-platform-v2.vercel.app