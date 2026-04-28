import React from 'react'
import StackNavigation from './src/app/navigation/StackNavigation'
import { Provider } from 'react-redux'
import { store } from './src/app/store/store'
import AppInitializer from './src/app/Appinitializer'
import './src/features/auth/services/google.services'
import ErrorBoundary from './src/app/ErrorBoundary'
import { ToastProvider } from './src/shared/components/ToastProvider'
import { ThemeProvider } from './src/shared/hooks/theme'
const App = () => {
  return <Provider store={store}>
            <ThemeProvider>
              <ErrorBoundary>
                <ToastProvider>
                  <AppInitializer >
                    <StackNavigation />
                  </AppInitializer>
                </ToastProvider>
              </ErrorBoundary>
            </ThemeProvider>
          </Provider>
}

export default App