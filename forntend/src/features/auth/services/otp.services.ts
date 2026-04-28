import { apiClient } from '../../../shared/services/apiClient';


export const sendOtp = async (email: string) => {
  try {
    const res = await apiClient.post('/auth/send-otp', { email });
    return {
      success: res.data?.success,
      message: res.data?.message,
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        error?.message ||
        'Failed to send OTP',
    };
  }
};


export const verifyOtp = async (email: string, otp: string) => {
  try {
    const res = await apiClient.post('/auth/verify-otp', { email, otp });
    return {
      success: res.data?.success,
      message: res.data?.message,
    };
  } catch (error: any) {
    return {
      success: false,
      message:
        error?.response?.data?.message ||
        error?.message ||
        'OTP verification failed',
    };
  }
};