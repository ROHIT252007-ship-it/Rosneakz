import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppTheme } from '../shared/hooks/theme';

type ErrorBoundaryProps = {
  children: React.ReactNode;
  theme: ReturnType<typeof useAppTheme>;
};

type WrapperProps = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
};

class ErrorBoundaryClass extends React.Component<ErrorBoundaryProps, State> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    if (__DEV__) {
      console.error('ErrorBoundary caught error:', {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
      });
    } else {
      
    }
  }

  handleRetry = (): void => {
    this.setState({ hasError: false });
  };

  render() {
    const { theme, children } = this.props;

    if (this.state.hasError) {
      return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
          <Text style={[styles.title, { color: theme.darkText }]}>
            Something went wrong
          </Text>

          <Text style={[styles.subtitle, { color: theme.darkText }]}>
            Please try again. If the problem continues, restart the app.
          </Text>

          <TouchableOpacity
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Try again"
            accessibilityHint="Attempts to reload this screen"
            activeOpacity={0.85}
            style={styles.retryButton}
            onPress={this.handleRetry}
          >
            <Text style={styles.retryText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return children;
  }
}

const ErrorBoundary = ({ children }: WrapperProps) => {
  const theme = useAppTheme();

  return (
    <ErrorBoundaryClass theme={theme}>
      {children}
    </ErrorBoundaryClass>
  );
};

export default ErrorBoundary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  retryButton: {
    marginTop: 20,
    backgroundColor: '#5B9EE1',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  retryText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
});