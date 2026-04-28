import React, {createContext, useContext, useMemo, useState} from 'react';
import {useColorScheme} from 'react-native';

type ThemeMode = 'light' | 'dark';

type AppTheme = {
  theme: ThemeMode;
  mode: ThemeMode;
  background: string;
  darkText: string;
  white: string;
};

type ThemeContextType = {
  theme: AppTheme;
  mode: ThemeMode;
  userTheme: ThemeMode | null;
  setUserTheme: React.Dispatch<React.SetStateAction<ThemeMode | null>>;
  toggleTheme: () => void;
};

const lightTheme: AppTheme = {
  mode: 'light',
  background: '#F8F9FA',
  darkText: '#1A2530',
  white: '#ffffff',
  theme: 'light',
};

const darkTheme: AppTheme = {
  mode: 'dark',
  background: '#1A2530',
  darkText: '#FFFFFF',
  white: '#161F28',
  theme: 'dark',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
  const systemTheme = useColorScheme();
  const [userTheme, setUserTheme] = useState<ThemeMode | null>(null);

  const mode: ThemeMode = userTheme ?? (systemTheme === 'dark' ? 'dark' : 'light');

  const theme = useMemo(() => {
    return mode === 'dark' ? darkTheme : lightTheme;
  }, [mode]);

  const toggleTheme = () => {
    setUserTheme(prev => {
      const currentMode = prev ?? mode;
      return currentMode === 'dark' ? 'light' : 'dark';
    });
  };

  return (
    <ThemeContext.Provider
      value={{theme, mode, userTheme, setUserTheme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useThemeContext must be used inside ThemeProvider');
  }

  return context;
};

// For old screens: const theme = useAppTheme()
export const useAppTheme = () => {
  return useThemeContext().theme;
};