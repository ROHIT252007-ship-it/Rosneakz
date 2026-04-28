import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProductType, RelatedVariantType } from '../../../shared/types/product.type';
import { showError } from '../../../shared/utils/showError';

const CART_KEY = 'CART_ITEMS';

export type CartItem = {
  product: ProductType;
  quantity: number;
  selectedSize: number;
  selectedColor: string;
};

const isValidString = (value: string): value is string => {
  return typeof value === 'string' && value.trim().length > 0;
};

const isValidNumber = (value: any): value is number => {
  return typeof value === 'number' && Number.isFinite(value);
};

const isValidRelatedVariant = (item: any): item is RelatedVariantType => {
  return (
    item &&
    typeof item === 'object' &&
    isValidString(item._id) &&
    isValidString(item.color) &&
    isValidString(item.colorCode) &&
    isValidString(item.thumbnail)
  );
};

const isValidProduct = (product: any): product is ProductType => {
  return (
    product &&
    typeof product === 'object' &&
    isValidString(product._id) &&
    isValidString(product.groupId) &&
    isValidString(product.name) &&
    isValidString(product.brand) &&
    isValidString(product.description) &&
    isValidString(product.gender) &&
    typeof product.isBestSeller === 'boolean' &&
    typeof product.isNewArrival === 'boolean' &&
    isValidNumber(product.basePrice) &&
    product.basePrice >= 0 &&
    isValidString(product.color) &&
    isValidString(product.colorCode) &&
    Array.isArray(product.images) &&
    product.images.every((img: any) => isValidString(img)) &&
    Array.isArray(product.sizes) &&
    product.sizes.every((size: any) => isValidNumber(size)) &&
    Array.isArray(product.relatedVariants) &&
    product.relatedVariants.every((variant: any) =>
      isValidRelatedVariant(variant)
    )
  );
};

const isValidCartItem = (item: any): item is CartItem => {
  return (
    item &&
    typeof item === 'object' &&
    isValidProduct(item.product) &&
    isValidNumber(item.quantity) &&
    item.quantity >= 1 &&
    isValidNumber(item.selectedSize) &&
    isValidString(item.selectedColor)
  );
};

const sanitizeCartItems = (data: any): CartItem[] => {
  if (!Array.isArray(data)) return [];

  return data
    .filter(isValidCartItem)
    .map((item) => ({
      product: {
        _id: item.product._id.trim(),
        groupId: item.product.groupId.trim(),
        name: item.product.name.trim(),
        brand: item.product.brand.trim(),
        description: item.product.description.trim(),
        gender: item.product.gender.trim(),
        isBestSeller: Boolean(item.product.isBestSeller),
        isNewArrival: Boolean(item.product.isNewArrival),
        basePrice: Number(item.product.basePrice),
        color: item.product.color.trim(),
        colorCode: item.product.colorCode.trim(),
        images: item.product.images.map((img: string) => img.trim()),
        sizes: item.product.sizes.map((size: number) => Number(size)),
        relatedVariants: item.product.relatedVariants.map(
          (variant: RelatedVariantType) => ({
            _id: variant._id.trim(),
            color: variant.color.trim(),
            colorCode: variant.colorCode.trim(),
            thumbnail: variant.thumbnail.trim(),
          })
        ),
      },
      quantity: Math.max(1, Math.floor(item.quantity)),
      selectedSize: Number(item.selectedSize),
      selectedColor: item.selectedColor.trim(),
    }));
};

export const saveCartToStorage = async (items: CartItem[]): Promise<void> => {
  try {
    const safeItems = sanitizeCartItems(items);
    await AsyncStorage.setItem(CART_KEY, JSON.stringify(safeItems));
  } catch (error) {
    showError('saveCartToStorage error:', error instanceof Error ? error.message : 'Unknown error');
  }
};

export const getCartFromStorage = async (): Promise<CartItem[]> => {
  try {
    const data = await AsyncStorage.getItem(CART_KEY);

    if (!data) return [];

    const parsed = JSON.parse(data);
    return sanitizeCartItems(parsed);
  } catch (error) {
    showError('getCartFromStorage error:', error instanceof Error ? error.message : 'Unknown error');
    return [];
  }
};

export const clearCartFromStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(CART_KEY);
  } catch (error) {
    showError('clearCartFromStorage error:', error instanceof Error ? error.message : 'Unknown error');
  }
};