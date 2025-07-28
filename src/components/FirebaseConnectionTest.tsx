"use client";

import { useState } from "react";
import { isFirebaseAvailable, auth } from "@/lib/firebase";

export function FirebaseConnectionTest() {
  const [testResult, setTestResult] = useState<string>("");

  const testFirebase = () => {
    console.log("🔥 開始測試 Firebase 連接...");
    
    try {
      const available = isFirebaseAvailable();
      const hasAuth = !!auth;
      
      const result = `
🔥 Firebase 狀態檢查:
- Firebase 可用: ${available ? '✅' : '❌'}
- Auth 模組: ${hasAuth ? '✅' : '❌'}
- 當前環境: ${typeof window !== 'undefined' ? '瀏覽器' : '服務器'}
- 環境變數檢查:
  - API Key: ${process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '✅ 已設置' : '❌ 未設置'}
  - Auth Domain: ${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? '✅ 已設置' : '❌ 未設置'}
  - Project ID: ${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? '✅ 已設置' : '❌ 未設置'}
  - Google Client ID: ${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ? '✅ 已設置' : '❌ 未設置'}
      `;
      
      console.log(result);
      setTestResult(result);
      
    } catch (error) {
      console.error("❌ Firebase 測試失敗:", error);
      setTestResult(`❌ Firebase 測試錯誤: ${(error as Error).message}`);
    }
  };

  return (
    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
      <button
        onClick={testFirebase}
        className="w-full bg-orange-500 text-white py-2 rounded-lg font-medium hover:bg-orange-600 transition-colors mb-2"
      >
        🔥 測試 Firebase 連接
      </button>
      {testResult && (
        <pre className="text-xs bg-white p-2 rounded border overflow-auto max-h-32">
          {testResult}
        </pre>
      )}
    </div>
  );
} 