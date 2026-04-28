import { Alert } from 'react-native';

type ApiError = {
  message?: string;
  response?: {
    data?: unknown;
    status?: number;
  };
};

export const showError = (
  error: Error | ApiError | null | string,
  title: string = 'Error',
  userMessage: string = 'Something went wrong. Please try again.',
): void => {
  if (__DEV__) {
    const safeMessage =
      error instanceof Error
        ? error.message
        : typeof error === 'object' && error?.response?.status
        ? `API Error (${error.response.status})`
        : 'Unknown error';

    console.error(title, safeMessage);
  }

  Alert.alert(title, userMessage);
};
