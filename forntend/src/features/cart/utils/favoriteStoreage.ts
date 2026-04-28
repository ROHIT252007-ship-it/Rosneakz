import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProductType } from '../../../shared/types/product.type';
import { showError } from '../../../shared/utils/showError';

const FAV_KEY = 'FAV_PRODUCTS';

export const getFavouriteProducts = async (): Promise<ProductType[]> => {
  try {
    const data = await AsyncStorage.getItem(FAV_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    showError('getFavouriteProducts error:', error instanceof Error ? error.message : 'Unknown error');
    return [];
  }
};

export const saveFavouriteProducts = async (
  items: ProductType[]
): Promise<void> => {
  try {
    await AsyncStorage.setItem(FAV_KEY, JSON.stringify(items));
  } catch (error) {
    showError('saveFavouriteProducts error:', error instanceof Error ? error.message : 'Unknown error');
  }
};

export const toggleFavouriteProduct = async (
  product: ProductType
): Promise<ProductType[]> => {
  try {
    const existing = await getFavouriteProducts();

    const isExist = existing.some(item => item._id === product._id);

    let updated: ProductType[];

    if (isExist) {
      updated = existing.filter(item => item._id !== product._id);
    } else {
      updated = [...existing, product];
    }

    await saveFavouriteProducts(updated);
    return updated;
  } catch (error) {
      showError('toggleFavouriteProduct error:', error instanceof Error ? error.message : 'Unknown error');
    return [];
  }
};

export const isProductFavourite = async (productId: string): Promise<boolean> => {
  try {
    const existing = await getFavouriteProducts();
    return existing.some(item => item._id === productId);
  } catch (error) {
    showError('isProductFavourite error:', error instanceof Error ? error.message : 'Unknown error');
    return false;
  }
};

export const removeFavouriteProduct = async (
  productId: string
): Promise<ProductType[]> => {
  try {
    const existing = await getFavouriteProducts();
    const updated = existing.filter(item => item._id !== productId);
    await saveFavouriteProducts(updated);
    return updated;
  } catch (error) {
    showError('removeFavouriteProduct error:', error instanceof Error ? error.message : 'Unknown error');
    return [];
  }
};

export const clearFavouriteProducts = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(FAV_KEY);
  } catch (error) {
    showError('clearFavouriteProducts error:', error instanceof Error ? error.message : 'Unknown error');
  }
};