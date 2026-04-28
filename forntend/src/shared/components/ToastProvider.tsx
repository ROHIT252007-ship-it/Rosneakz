import React, { createContext, useContext, ReactNode } from 'react';
import Toast, { BaseToast, ToastConfig } from 'react-native-toast-message';

interface ToastContextType {
  showSuccess: (title: string, message?: string) => void;
  showError: (title: string, message?: string) => void;
  showInfo: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const showSuccess = (title: string, message = 'Action completed successfully!') => {
    Toast.show({
      type: 'success',
      text1: title,
      text2: message,
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 60,
      bottomOffset: 40,
    });
  };

  const showError = (title: string, message = 'Something went wrong. Please try again.') => {
    Toast.show({
      type: 'error',
      text1: title,
      text2: message,
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 60,
    });
  };

  const showInfo = (title: string, message = '') => {
    Toast.show({
      type: 'info',
      text1: title,
      text2: message,
      visibilityTime: 3000,
      autoHide: true,
    });
  };

  const toastConfig: ToastConfig = {
    success: ({ text1, text2 }) => (
      <BaseToast
        style={{
          borderRadius: 12,
          backgroundColor: '#10B981',
          marginHorizontal: 20,
          height: 70,
        }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 16,
          fontWeight: '600',
          color: '#FFFFFF',
        }}
        text2Style={{
          fontSize: 14,
          color: 'rgba(255, 255, 255, 0.9)',
        }}
        text1={text1}
        text2={text2}
      />
    ),
    error: ({ text1, text2 }) => (
      <BaseToast
        style={{
          borderRadius: 12,
          backgroundColor: '#EF4444',
          marginHorizontal: 20,
          height: 70,
        }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 16,
          fontWeight: '600',
          color: '#FFFFFF',
        }}
        text2Style={{
          fontSize: 14,
          color: 'rgba(255, 255, 255, 0.9)',
        }}
        text1={text1}
        text2={text2}
      />
    ),
    info: ({ text1, text2 }) => (
      <BaseToast
        style={{
          borderRadius: 12,
          backgroundColor: '#3B82F6',
          marginHorizontal: 20,
          height: 70,
        }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 16,
          fontWeight: '600',
          color: '#FFFFFF',
        }}
        text2Style={{
          fontSize: 14,
          color: 'rgba(255, 255, 255, 0.9)',
        }}
        text1={text1}
        text2={text2}
      />
    ),
  };

  return (
    <ToastContext.Provider value={{ showSuccess, showError, showInfo }}>
      {children}
      <Toast config={toastConfig} position="top" topOffset={60} />
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
};