import * as Keychain from 'react-native-keychain';
import { showError } from '../utils/showError';

const SERVICE = 'authToken';

export const storeToken = async (token: string) => {
  try {
    await Keychain.setGenericPassword('user', token, {
      service: SERVICE,
    });
    return true;
  } catch (error) {
    showError('Error',error instanceof Error ? error.message : 'Unknown error')
    return false;
  }
};

export const getToken = async () => {
  try {
    const credentials = await Keychain.getGenericPassword({
      service: SERVICE,
    });


    if (credentials) {
      return credentials.password; 
      
    }

    return null;
  } catch (error) {
    showError('Error',error instanceof Error ? error.message : 'Unknown error')
    return null;
  }
};


export const removeToken = async () => {
  try {
    await Keychain.resetGenericPassword({
      service: SERVICE,
    });
    return true;
  } catch (error) {
    showError('Error',error instanceof Error ? error.message : 'Unknown error')
    return false;
  }
};