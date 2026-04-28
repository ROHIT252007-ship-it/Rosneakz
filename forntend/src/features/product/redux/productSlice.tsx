import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductType } from '../../../shared/types/product.type';

type FilterPayload = {
  gender?: string;
  size?: number;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  type?: 'bestseller' | 'newarrival';
};

type ProductState = {
  products: ProductType[];
  filteredProducts: ProductType[];
  selectedProduct: ProductType | null;
  loading: boolean;
  error: string | null;
  fetched: boolean;
};

const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  selectedProduct: null,
  loading: false,
  error: null,
  fetched: false,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

   setProducts: (state, action: PayloadAction<ProductType[]>) => {
  state.products = action.payload;
  state.filteredProducts = action.payload;
  state.loading = false;
  state.error = null;
  state.fetched = true;
},

setProductError: (state, action: PayloadAction<string | null>) => {
  state.error = action.payload;
  state.loading = false;
  state.fetched = true;
},

    setSelectedProduct: (state, action: PayloadAction<ProductType | null>) => {
      state.selectedProduct = action.payload;
    },

    filterByBrand: (state, action: PayloadAction<string>) => {
      const brand = action.payload.toLowerCase();
      state.filteredProducts = state.products.filter(
        item => item.brand.toLowerCase() === brand
      );
    },

    filter: (state, action: PayloadAction<FilterPayload>) => {
      const { gender, size, minPrice, maxPrice, brand, type } = action.payload;

      state.filteredProducts = state.products.filter(item => {
        const matchGender = gender
          ? item.gender.toLowerCase() === gender.toLowerCase()
          : true;

        const matchSize = size ? item.sizes.includes(size) : true;

        const matchMinPrice =
          minPrice !== undefined ? item.basePrice >= minPrice : true;

        const matchMaxPrice =
          maxPrice !== undefined ? item.basePrice <= maxPrice : true;

        const matchBrand = brand
          ? item.brand.toLowerCase() === brand.toLowerCase()
          : true;

        const matchType =
          type === 'bestseller'
            ? item.isBestSeller
            : type === 'newarrival'
            ? item.isNewArrival
            : true;

        return (
          matchGender &&
          matchSize &&
          matchMinPrice &&
          matchMaxPrice &&
          matchBrand &&
          matchType
        );
      });
    },

    searchProducts: (state, action: PayloadAction<string>) => {
      const text = action.payload.toLowerCase();
      state.filteredProducts = state.products.filter(
        item =>
          item.name.toLowerCase().includes(text) ||
          item.brand.toLowerCase().includes(text) ||
          item.color.toLowerCase().includes(text)
      );
    },

    filterBestSeller: state => {
      state.filteredProducts = state.products.filter(item => item.isBestSeller);
    },

    filterNewArrival: state => {
      state.filteredProducts = state.products.filter(item => item.isNewArrival);
    },

    resetProducts: state => {
      state.filteredProducts = state.products;
    },
  },
});

export const {
  setProductLoading,
  setProducts,
  setProductError,
  setSelectedProduct,
  filterByBrand,
  filter,
  searchProducts,
  filterBestSeller,
  filterNewArrival,
  resetProducts,
} = productSlice.actions;

export default productSlice.reducer;