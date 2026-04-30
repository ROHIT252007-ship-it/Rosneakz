import React, { useCallback, useMemo, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useResponsive } from '../../../shared/hooks/responsive';
import Add from '../../../assets/svg/Add.svg';
import font from '../../style/font';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NavigationTypeHome } from '../../home/types/Hometype';
import Heart from '../../../assets/svg/Hart.svg';
import HeartFill from '../../../assets/svg/Hartred.svg';
import { useAppTheme } from '../../../shared/hooks/theme';
import { ProductType } from '../../../shared/types/product.type';
import { getShoeImage } from '../../../shared/utils/shoeImageMap';

import { useDispatch } from 'react-redux';
import { addToCart } from '../../cart/redux/cartSlice';
import { useToast } from '../../../shared/components/ToastProvider';
import {
  getFavouriteProducts,
  toggleFavouriteProduct,
} from '../../cart/utils/favoriteStoreage';

type Props = {
  data: ProductType[];
};

const Productcard = ({ data }: Props) => {
  const { wp } = useResponsive();
  const navigation = useNavigation<NavigationTypeHome>();
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [favIds, setFavIds] = useState<string[]>([]);
  const dispatch = useDispatch();
  const loadFavourites = async () => {
    try {
      const favProducts = await getFavouriteProducts();
      setFavIds(favProducts.map(item => item._id));
    } catch (error) {
      showError('Error loading favourites:', error instanceof Error ? error.message : 'Unknown error');
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadFavourites();
    }, []),
  );

  const handleToggleFavourite = async (product: ProductType) => {
    try {
      const updatedFavs = await toggleFavouriteProduct(product);
      setFavIds(updatedFavs.map(item => item._id));
    } catch (error) {
      showError('Error toggling favourite:', error instanceof Error ? error.message : 'Unknown error');
    }
  };
  const { showSuccess, showError } = useToast();
  const handleAddToCart = (item: ProductType) => {
    const size = item.sizes?.[0];

    if (!size) {
      showError('Size not available for this product');
    }

    dispatch(
      addToCart({
        product: item,
        selectedSize: size,
        selectedColor: item.color,
      }),
    );

    showSuccess('Product added to cart');
  };

  const renderItem = ({ item }: { item: ProductType }) => {
    const isFav = favIds.includes(item._id);

    return (
      <TouchableOpacity
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={`${item.name}, ${item.brand}, rupees ${item.basePrice}`}
        accessibilityHint="Opens product details"
        style={[styles.card, { width: wp(44) }]}
        onPress={() => navigation.navigate('Details', { item })}
        activeOpacity={0.9}
      >
        <TouchableOpacity
          style={styles.heart}
          onPress={() => handleToggleFavourite(item)}
          activeOpacity={0.8}
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={`${isFav ? 'Remove' : 'Add'} ${item.name} ${
            isFav ? 'from' : 'to'
          } favourites`}
          accessibilityHint="Updates your wishlist"
          accessibilityState={{ selected: isFav }}
        >
          {isFav ? (
            <HeartFill width={wp(4.5)} height={wp(4.5)} />
          ) : (
            <Heart width={wp(4.5)} height={wp(4.5)} />
          )}
        </TouchableOpacity>

        <View style={styles.imageWrapper}>
          <Image
            accessible={false}
            source={getShoeImage(item.images?.[0])}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        {item.isBestSeller ? (
          <Text style={styles.besttext}>BEST SELLER</Text>
        ) : null}

        <Text style={styles.nametext} numberOfLines={1}>
          {item.name}
        </Text>

        <View style={styles.colorRow}>
          {item.relatedVariants?.slice(0, 3).map((variant, i) => (
            <View
              key={variant._id || i}
              style={[
                styles.colorDot,
                {
                  backgroundColor: variant.colorCode,
                  width: wp(3),
                  height: wp(3),
                  borderRadius: wp(1.5),
                  marginLeft: i === 0 ? 0 : wp(1),
                },
              ]}
            />
          ))}
        </View>

        <View style={styles.bottom}>
          <Text style={styles.pricetext}>₹{item.basePrice}</Text>
          <TouchableOpacity
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={`Add ${item.name} to cart`}
            accessibilityHint="Adds this product with the default size to cart"
            style={styles.add}
            onPress={() => handleAddToCart(item)}
            activeOpacity={0.8}
          >
            <Add />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item._id}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    />
  );
};

export default Productcard;

const createStyles = (theme: ReturnType<typeof useAppTheme>) =>
  StyleSheet.create({
    container: {
      gap: 16,
      paddingBottom: 10,
    },

    columnWrapper: {
      justifyContent: 'space-between',
      marginBottom: 16,
    },

    card: {
      backgroundColor: theme.white,
      borderRadius: 20,
      paddingTop: 14,
      overflow: 'hidden',
    },

    imageWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
    },

    image: {
      marginVertical: 10,
      width: 155,
      height: 120,
    },

    besttext: {
      color: '#5B9EE1',
      fontFamily: font.airlight,
      paddingHorizontal: 10,
      paddingVertical: 3,
    },

    nametext: {
      fontFamily: font.airbold,
      fontSize: 16,
      paddingHorizontal: 10,
     marginVertical:5,
      color: theme.darkText,
    },

    brandtext: {
      fontFamily: font.airlight,
      fontSize: 13,
      paddingHorizontal: 10,
      paddingBottom: 3,
      color: theme.mode === 'dark' ? '#A0A7AD' : '#707B81',
    },

    pricetext: {
      fontFamily: font.airmedium,
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 3,
      color: theme.darkText,
    },

    bottom: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    add: {
      backgroundColor: '#5B9EE1',
      height: 38,
      width: 34,
      borderBottomRightRadius: 20,
      borderTopLeftRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },

    heart: {
      position: 'absolute',
      top: 10,
      left: 10,
      zIndex: 10,
      backgroundColor: theme.background,
      padding: 8,
      borderRadius: 30,
      minHeight: 44,
      minWidth: 44,
      justifyContent: 'center',
      alignItems: 'center',
    },

    colorRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingBottom: 6,
    },

    colorDot: {
      width: 21,
      height: 21,
      borderRadius: 11,
     borderColor: theme.mode === 'dark' ? '#223a53' : '#e6e8e9',
     borderWidth:2
    },
  });
