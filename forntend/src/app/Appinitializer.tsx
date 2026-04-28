import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setCartItems } from '../features/cart/redux/cartSlice';
import { getCartFromStorage } from '../features/cart/services/cartStorage';
import { showError } from '../shared/utils/showError';

const AppInitializer = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const restoreCart = async () => {
      try {
        const items = await getCartFromStorage();

        if (!Array.isArray(items)) {
          dispatch(setCartItems([]));
          return;
        }

        dispatch(setCartItems(items));

          
      } catch (error) {
        showError('restoreCart error:','Failed to restore cart', 'Unable to load your cart. Please try again later.');
        dispatch(setCartItems([]));
      }
    };

    restoreCart();
  }, [dispatch]);

  return <>{children}</>;
};

export default AppInitializer;