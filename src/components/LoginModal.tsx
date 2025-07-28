import React from 'react';

interface LoginModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = () => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">登入</h2>
      <p className="text-gray-600">登入功能正在開發中...</p>
    </div>
  );
}; 