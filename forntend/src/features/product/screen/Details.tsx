import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import ButtonComponent from '../../../shared/components/ButtonComponent';
import Back from '../../../assets/svg/Back.svg';
import Backwhite from '../../../assets/svg/Backwhite.svg';
import Bagwhite from '../../../assets/svg/Whitebag.svg';
import Frame from '../../../assets/svg/Frame.svg';
import font from '../../style/font';
import { useResponsive } from '../../../shared/hooks/responsive';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../shared/types/stackNavigation.type';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppTheme } from '../../../shared/hooks/theme';
import { getShoeImage } from '../../../shared/utils/shoeImageMap';
import { ProductType } from '../../../shared/types/product.type';
import { addToCart } from '../../cart/redux/cartSlice';
import { getCartFromStorage } from '../../cart/services/cartStorage';
import { useToast } from '../../../shared/components/ToastProvider';
import ProductDetailSkeleton from '../components/DetailsSkeleton';
import { RootState } from '../../../app/store/store';
type Props = {
  route: RouteProp<RootStackParamList, 'Details'>;
};

const Details = ({ route }: Props) => {
  const { wp, hp } = useResponsive();
  const dispatch = useDispatch();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const { showSuccess, showError } = useToast();

const allProducts = useSelector(
  (state: RootState) => state.products.products
);

const loading = useSelector(
  (state: RootState) => state.products.loading
);
  const initialItem = route.params?.item as ProductType | undefined;

  const [mainProduct, setMainProduct] = useState<ProductType | null>(
    initialItem || null,
  );

  const [selectedSize, setSelectedSize] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<string>('');

  useEffect(() => {
    if (!mainProduct) return;

    setSelectedSize(mainProduct.sizes?.[0] || 0);
    setSelectedImage(mainProduct.images?.[0] || '');
  }, [mainProduct]);

  const handleVariantChange = (variantId: string) => {
    const matchedProduct = allProducts.find(
      (product: ProductType) => product._id === variantId,
    );

    if (!matchedProduct) {
      Alert.alert(
        'Variant Unavailable',
        'This color variant is currently unavailable. Please try another option.',
      );
      return;
    }

    setMainProduct(matchedProduct);
  };

  const galleryItems = mainProduct
    ? [
        {
          _id: mainProduct._id,
          color: mainProduct.color,
          colorCode: mainProduct.colorCode,
          thumbnail: mainProduct.images?.[0],
        },
        ...(mainProduct.relatedVariants || []),
      ]
    : [];

  const handleAddToCart = async () => {
    try {
      if (!mainProduct) {
        showError('Error', 'Product details are not available.');
        return;
      }

      if (!selectedSize) {
        showError('Please select a size before adding to cart.');
        return;
      }

      dispatch(
        addToCart({
          product: mainProduct,
          selectedSize,
          selectedColor: mainProduct.color,
        }),
      );

      await getCartFromStorage();

      showSuccess(
        'Added to Cart',
        `${mainProduct.name} (${mainProduct.color}) - Size ${selectedSize} has been added to your cart.`,
      );
    } catch (error) {
      console.error('Error adding to cart:', error);
      showError(
        'Error',
        'An error occurred while adding the product to cart. Please try again.',
      );
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      {loading || !mainProduct ? (
        <ProductDetailSkeleton />
      ) : (
        <View style={styles.container}>
          <View style={[styles.header, { padding: wp(4) }]}>
            <ButtonComponent
              accessibilityLabel="Go back"
              accessibilityHint="Returns to the previous screen"
              onPress={() => navigation.goBack()}
            >
              {theme.theme === 'light' ? <Back /> : <Backwhite />}
            </ButtonComponent>

            <Text style={[styles.title, { fontSize: wp(4.5) }]}>
              {mainProduct.gender}&apos;s Shoes
            </Text>

            <ButtonComponent
              accessibilityLabel="Open cart"
              accessibilityHint="Navigates to your shopping cart"
              onPress={() => navigation.navigate('Drawer', { screen: 'Cart' })}
            >
              {theme.theme === 'light' ? <Frame /> : <Bagwhite />}
            </ButtonComponent>
          </View>

          <View style={styles.imageContainer}>
            <Image
              accessible={true}
              accessibilityRole="image"
              accessibilityLabel={`${mainProduct.name} product image`}
              source={getShoeImage(selectedImage)}
              style={{ width: wp(90), height: hp(30) }}
              resizeMode="contain"
            />
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: hp(14) }}
          >
            <View style={[styles.contentCard, { padding: wp(4) }]}>
              {mainProduct.isBestSeller && (
                <Text style={styles.best}>BEST SELLER</Text>
              )}

              <Text style={styles.name}>{mainProduct.name}</Text>
              <Text style={styles.subtitle}>₹{mainProduct.basePrice}</Text>
              <Text style={styles.desc}>{mainProduct.description}</Text>

              <Text style={styles.sectionTitle}>Gallery</Text>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {galleryItems.map((variant, i: number) => {
                  const isSelected = mainProduct._id === variant._id;

                  return (
                    <TouchableOpacity
                      accessible={true}
                      accessibilityRole="button"
                      accessibilityLabel={`View ${
                        variant.color || 'selected'
                      } ${mainProduct.name} image`}
                      accessibilityHint="Updates the main product image"
                      accessibilityState={{ selected: isSelected }}
                      key={variant._id || i}
                      style={[
                        styles.galleryCard,
                        isSelected && styles.activeGalleryCard,
                      ]}
                      onPress={() => handleVariantChange(variant._id)}
                      activeOpacity={0.9}
                    >
                      <Image
                        accessible={false}
                        source={getShoeImage(variant.thumbnail)}
                        style={styles.thumb}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              <View style={styles.sizeHeader}>
                <Text style={styles.sectionTitle}>Size</Text>
                <Text style={styles.sizeGuide}>Available Sizes</Text>
              </View>

              <ScrollView
                horizontal
                contentContainerStyle={styles.sizeContainer}
              >
                {mainProduct.sizes?.map((size: number) => {
                  const isSelected = size === selectedSize;

                  return (
                    <TouchableOpacity
                      accessible={true}
                      accessibilityRole="button"
                      accessibilityLabel={`Size ${size}`}
                      accessibilityHint={`Selects size ${size}`}
                      accessibilityState={{ selected: isSelected }}
                      key={size}
                      style={[styles.sizeBox, isSelected && styles.activeSize]}
                      onPress={() => setSelectedSize(size)}
                      activeOpacity={0.9}
                    >
                      <Text
                        style={[
                          styles.sizeText,
                          isSelected && { color: theme.white },
                        ]}
                      >
                        {size}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              <Text style={styles.sectionTitle}>Colors</Text>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {galleryItems.map((variant, index: number) => {
                  const isSelected = mainProduct._id === variant._id;

                  return (
                    <TouchableOpacity
                      accessible={true}
                      accessibilityRole="button"
                      accessibilityLabel={`${variant.color} color`}
                      accessibilityHint={`Selects ${variant.color} color`}
                      accessibilityState={{ selected: isSelected }}
                      key={variant._id || index}
                      style={[
                        styles.colorItem,
                        isSelected && styles.activeColorItem,
                      ]}
                      onPress={() => handleVariantChange(variant._id)}
                      activeOpacity={0.9}
                    >
                      <View
                        style={[
                          styles.colorCircle,
                          { backgroundColor: variant.colorCode || '#000' },
                        ]}
                      />
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </ScrollView>

          <View
            style={[
              styles.bottomBar,
              { paddingHorizontal: wp(4), height: hp(11) },
            ]}
          >
            <View>
              <Text style={styles.priceLabel}>Price</Text>
              <Text style={styles.price}>₹{mainProduct.basePrice}</Text>
            </View>

            <TouchableOpacity
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel={`Add ${mainProduct.name} size ${selectedSize} to cart`}
              accessibilityHint="Adds the selected product to cart"
              style={styles.cartBtn}
              onPress={handleAddToCart}
            >
              <Text style={styles.cartText}>Add To Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Details;

const createStyles = (theme: ReturnType<typeof useAppTheme>) =>
  StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: theme.background,
    },
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontFamily: font.airbold,
      color: theme.darkText,
    },

    imageContainer: {
      alignItems: 'center',
      marginVertical: 20,
    },

    contentCard: {
      backgroundColor: theme.white,
      borderRadius: 20,
      top: 25,
    },
    best: {
      fontSize: 14,
      color: '#5B9EE1',
      fontFamily: font.airlight,
    },
    name: {
      fontFamily: font.airbold,
      marginTop: 4,
      fontSize: 24,
      color: theme.darkText,
    },
    subtitle: {
      fontFamily: font.airmedium,
      fontSize: 20,
      color: theme.darkText,
      marginTop: 4,
    },
    desc: {
      color: theme.mode === 'dark' ? '#A0A7AD' : '#707B81',
      marginTop: 8,
      lineHeight: 20,
      fontSize: 16,
      fontFamily: font.airlight,
    },
    sectionTitle: {
      fontFamily: font.airmedium,
      fontSize: 18,
      marginTop: 16,
      marginBottom: 8,
      color: theme.darkText,
    },
    galleryCard: {
      backgroundColor: theme.background,
      marginRight: 10,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 8,
    },
    activeGalleryCard: {
      borderWidth: 1.5,
      borderColor: '#5B9EE1',
    },
    thumb: {
      width: 70,
      height: 70,
    },
    sizeHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    sizeGuide: {
      color: theme.mode === 'dark' ? '#A0A7AD' : '#707B81',
      fontSize: 12,
      fontFamily: font.airlight,
    },
    sizeContainer: {
      flexDirection: 'row',
      gap: 10,
      marginTop: 10,
      paddingBottom: 4,
    },
    sizeBox: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: theme.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    activeSize: {
      backgroundColor: '#5B9EE1',
    },
    sizeText: {
      fontFamily: font.airmedium,
      color: theme.darkText,
    },
    colorItem: {
      width: 42,
      height: 42,
      borderRadius: 21,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
      backgroundColor: theme.background,
    },
    activeColorItem: {
      borderWidth: 1.5,
      borderColor: '#5B9EE1',
    },
    colorCircle: {
      width: 24,
      height: 24,
      borderRadius: 12,
    },
    bottomBar: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      elevation: 20,
      backgroundColor: theme.white,
    },
    priceLabel: {
      color: theme.mode === 'dark' ? '#A0A7AD' : '#707B81',
      fontSize: 16,
      fontFamily: font.airlight,
    },
    price: {
      fontSize: 20,
      fontFamily: font.airbold,
      color: theme.darkText,
    },
    cartBtn: {
      backgroundColor: '#5B9EE1',
      paddingHorizontal: 35,
      paddingVertical: 17,
      borderRadius: 50,
    },
    cartText: {
      color: theme.white,
      fontFamily: font.airmedium,
      fontSize: 18,
    },
  });
