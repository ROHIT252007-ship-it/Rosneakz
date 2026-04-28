
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { apiClient } from '../../../shared/services/apiClient';


export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();

    const userInfo = await GoogleSignin.signIn();


    const idToken = userInfo?.data?.idToken ;
    if (!idToken) {
      throw new Error('ID token not found');
    }

    const response = await apiClient.post(`/auth/google`, {
      idToken,
    });


    return response.data;
  } catch (error: any) {
    console.error('Google Sign In Error:', error);

    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      throw new Error('User cancelled login');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      throw new Error('Sign in in progress');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      throw new Error('Play Services not available');
    } else if (error.response) {
      throw new Error(error.response.data?.message || 'Server error');
    } else {
      throw new Error(error.message || 'Google sign in failed');
    }
  }
};