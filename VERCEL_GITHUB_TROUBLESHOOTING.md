# 🔧 Vercel + GitHub 部署問題診斷指南

## ⚠️ **常見問題：GitHub 無法發布到 Vercel**

---

## 🔍 **問題診斷**

### **1. GitHub 倉庫可見性問題** ⭐ **最常見原因**

#### **檢查倉庫狀態**：
- 前往：https://github.com/AmandaC617/kol-evaluation-platform-v2
- 查看倉庫名稱旁是否有 🔒 **Private** 標誌

#### **如果是 Private 倉庫**：
**方案A: 改為 Public (推薦)**
1. GitHub 倉庫 → **Settings**
2. 滾動到最下方 **"Danger Zone"**
3. 點擊 **"Change repository visibility"**
4. 選擇 **"Make public"**
5. 輸入倉庫名稱確認

**方案B: 升級 Vercel 計劃**
- Vercel 免費版不支援 Private 倉庫
- 需要升級到 Pro 計劃 ($20/月)

---

### **2. Vercel GitHub 連接問題**

#### **重新連接 GitHub**：
1. **Vercel Dashboard** → **Settings** → **Git**
2. 點擊 **"Disconnect"** (如果已連接)
3. 點擊 **"Connect Git Repository"**
4. 選擇 **GitHub**
5. 授權 Vercel 存取您的 GitHub
6. 選擇 `kol-evaluation-platform-v2` 倉庫

---

### **3. Deploy Hooks 設定** 🎯 **推薦解決方案**

#### **什麼是 Deploy Hooks？**
- 手動觸發部署的 URL
- 當自動部署失敗時的備用方案
- 不依賴 GitHub Webhooks

#### **設定 Deploy Hooks**：
1. **Vercel Dashboard** → 選擇專案
2. **Settings** → **Git**
3. 滾動到 **"Deploy Hooks"** 區域
4. 點擊 **"Create Hook"**
5. 設定：
   - **Hook Name**: `Manual Deploy`
   - **Git Branch**: `main`
6. 點擊 **"Create Hook"**
7. **複製生成的 URL**

#### **使用 Deploy Hook**：
```bash
# 方法1: 使用 curl
curl -X POST [您的Deploy Hook URL]

# 方法2: 瀏覽器訪問
# 直接在瀏覽器開啟 Deploy Hook URL
```

---

## 🚀 **立即解決方案**

### **快速修復步驟**：

#### **步驟1: 檢查並修改倉庫可見性**
```
前往: https://github.com/AmandaC617/kol-evaluation-platform-v2/settings
→ Danger Zone
→ Change repository visibility
→ Make public
```

#### **步驟2: 重新連接 Vercel**
```
Vercel Dashboard
→ kol-evaluation-platform-v2
→ Settings → Git
→ Disconnect → Connect Git Repository
→ 選擇 GitHub → 授權 → 選擇倉庫
```

#### **步驟3: 創建 Deploy Hook (備用方案)**
```
Vercel Dashboard
→ Settings → Git
→ Deploy Hooks
→ Create Hook (Name: Manual Deploy, Branch: main)
→ 複製 URL
```

#### **步驟4: 手動觸發部署**
```
使用 Deploy Hook URL 或點擊 Vercel 的 "Redeploy" 按鈕
```

---

## 🔍 **診斷檢查清單**

### **GitHub 方面**：
- [ ] 倉庫是否為 Public？
- [ ] 最新 commit 是否已推送？
- [ ] 分支名稱是否為 `main`？
- [ ] 檔案是否正常顯示？

### **Vercel 方面**：
- [ ] GitHub 連接是否正常？
- [ ] 專案是否選擇正確倉庫？
- [ ] 環境變數是否已設定？
- [ ] Build 是否有錯誤？

### **權限方面**：
- [ ] Vercel 是否有存取 GitHub 權限？
- [ ] GitHub App 是否已安裝？
- [ ] 倉庫權限是否足夠？

---

## 🎯 **推薦解決流程**

### **方案1: 標準流程 (推薦)**
1. **改倉庫為 Public**
2. **重新連接 GitHub**
3. **觸發重新部署**

### **方案2: Deploy Hook 流程**
1. **設定 Deploy Hook**
2. **使用 Hook URL 手動部署**
3. **每次更新後手動觸發**

### **方案3: 重新創建 (最後手段)**
1. **刪除 Vercel 專案**
2. **重新從 GitHub 匯入**
3. **重新設定環境變數**

---

## ⚡ **立即測試**

#### **測試 GitHub 連接**：
```bash
# 在本地推送測試更新
echo "Deploy test: $(date)" > deploy-test.txt
git add deploy-test.txt
git commit -m "🔧 測試 Vercel 自動部署"
git push origin main
```

#### **等待結果**：
- 2-3 分鐘後檢查 Vercel Dashboard
- 應該看到新的部署記錄

---

## 🆘 **如果仍然失敗**

### **檢查 Vercel 部署日誌**：
1. Vercel Dashboard → Deployments
2. 點擊最新的部署
3. 查看 **"Function Logs"** 和 **"Build Logs"**
4. 尋找具體錯誤訊息

### **常見錯誤解決**：
- **403 Forbidden**: 權限問題，重新授權 GitHub
- **404 Not Found**: 倉庫不存在或無權限訪問
- **Build Failed**: 檢查程式碼錯誤或環境變數

---

## 🎊 **成功指標**

✅ **GitHub 倉庫可見**  
✅ **Vercel 顯示 "Connected"**  
✅ **自動部署觸發**  
✅ **網站正常訪問**  
✅ **功能完整運作**

---

**請先檢查您的 GitHub 倉庫是否為 Private，這是最常見的問題原因！** 🎯