import React, { useMemo } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { NavigationTypeHome } from '../types/Hometype';
import { useAppTheme } from '../../../shared/hooks/theme';
import { ProductType } from '../../../shared/types/product.type';
import { getShoeImage } from '../../../shared/utils/shoeImageMap';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../cart/redux/cartSlice';
import { useToast } from '../../../shared/components/ToastProvider';

type Props = {
  data: ProductType[];
};

const Card = ({ data }: Props) => {
  const { wp } = useResponsive();
  const navigation = useNavigation<NavigationTypeHome>();
  const theme = useAppTheme();
  const dispatch = useDispatch();

  const styles = useMemo(() => createStyles(theme), [theme]);
  const { showSuccess, showError } = useToast();
  const handleAddToCart = (item: ProductType) => {
    const defaultSize = item.sizes?.[0];

    if (!defaultSize) {
      showError('Size not available for this product');
    }

    dispatch(
      addToCart({
        product: item,
        selectedSize: defaultSize,
        selectedColor: item.color,
      }),
    );

    showSuccess('Product added to cart');
  };

  const renderItem = ({ item }: { item: ProductType }) => (
    <TouchableOpacity
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`${item.name}, ${item.brand}, rupees ${item.basePrice}`}
      accessibilityHint="Opens product details"
      style={[styles.card, { width: wp(45) }]}
      onPress={() => navigation.navigate('Details', { item })}
      activeOpacity={0.9}
    >
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
  if (!data || data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No products available</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data.length > 6 ? data.slice(0, 6) : data}
      renderItem={renderItem}
      keyExtractor={item => item._id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    />
  );
};

export default Card;

const createStyles = (theme: ReturnType<typeof useAppTheme>) =>
  StyleSheet.create({
    container: {
      gap: 16,
    },

    card: {
      backgroundColor: theme.white,
      borderRadius: 20,
      paddingTop: 10,
      overflow: 'hidden',
    },

    imageWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 130,
      paddingHorizontal: 10,
    },

    image: {
      width: 170,
      height: 150,
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
      paddingTop: 3,
      color: theme.darkText,
    },

    brandtext: {
      fontFamily: font.airlight,
      fontSize: 13,
      paddingHorizontal: 10,
      paddingTop: 2,
      color: '#707B81',
    },

    pricetext: {
      fontFamily: font.airmedium,
      fontSize: 18,
      paddingHorizontal: 10,
      color: theme.darkText,
      paddingLeft: 10,
    },

    bottom: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
    },

    add: {
      backgroundColor: '#5B9EE1',
      height: 44,
      width: 38,
      borderBottomRightRadius: 20,
      borderTopLeftRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyContainer: {
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 40,
      paddingHorizontal: 'auto',
    },

    emptyText: {
      fontSize: 16,
      fontFamily: font.airmedium,
      color: theme.darkText,
    },
  });
