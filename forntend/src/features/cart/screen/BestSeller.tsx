import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Back from '../../../assets/svg/Back.svg';
import Backwhite from '../../../assets/svg/Backwhite.svg';
import Heart from '../../../assets/svg/Hart.svg';
import HeartFill from '../../../assets/svg/Hartred.svg';
import ButtonComponent from '../../../shared/components/ButtonComponent';
import font from '../../style/font';
import Filter from '../../../assets/svg/Filter.svg';
import Filterwhite from '../../../assets/svg/Fillterwhite.svg';
import Searchblack from '../../../assets/svg/Searchblack.svg';
import Searchwhite from '../../../assets/svg/Searchwhite.svg';
import { useResponsive } from '../../../shared/hooks/responsive';
import Filtermodal from '../components/Filtermodal';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../shared/types/stackNavigation.type';
import { useAppTheme } from '../../../shared/hooks/theme';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store/store';
import { getShoeImage } from '../../../shared/utils/shoeImageMap';
import {
  ProductType,
  RelatedVariantType,
} from '../../../shared/types/product.type';
import {
  getFavouriteProducts,
  toggleFavouriteProduct,
} from '../utils/favoriteStoreage';
import { useFocusEffect } from '@react-navigation/native';
import {
  filterBestSeller,
  filterNewArrival,
  resetProducts,
} from '../../product/redux/productSlice';
import ProductGridSkeleton from '../components/BestSellerSkeleton';
import { showError } from '../../../shared/utils/showError';

type Props = NativeStackScreenProps<RootStackParamList, 'bestSeller'>;

const BestSeller = ({ route, navigation }: Props) => {
  const screen = route.params?.screen;
  const { wp } = useResponsive();
  const [favIds, setFavIds] = useState<string[]>([]);
  const [showFilter, setShowFilter] = useState(false);
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { filteredProducts } = useSelector(
    (state: RootState) => state.products,
  );

  const loadFavourites = async () => {
    try {
      const favProducts = await getFavouriteProducts();
      setFavIds(favProducts.map(item => item._id));
      setLoading(false);
    } catch (error) {
      showError('Error loading favourites:', error instanceof Error ? error.message : 'Unknown error');
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadFavourites();
    }, []),
  );

  useEffect(() => {
    if (screen === 'bestSeller') {
      dispatch(filterBestSeller());
    } else {
      dispatch(filterNewArrival());
    }

    return () => {
      dispatch(resetProducts());
    };
  }, [dispatch, screen]);

  const handleToggleFavourite = async (product: ProductType) => {
    try {
      const updatedFavs = await toggleFavouriteProduct(product);
      setFavIds(updatedFavs.map(item => item._id));
    } catch (error) {
      showError('Error toggling favourite:', error instanceof Error ? error.message : 'Unknown error');
    }
  };

  const data = filteredProducts;
  const CARD_HEIGHT = 220;
  const ROW_GAP = 16;
  const ROW_HEIGHT = CARD_HEIGHT + ROW_GAP;
  const NUM_COLUMNS = 2;

  const getItemLayout = (_: unknown, index: number) => {
    const rowIndex = Math.floor(index / NUM_COLUMNS);

    return {
      length: ROW_HEIGHT,
      offset: ROW_HEIGHT * rowIndex,
      index,
    };
  };
  const renderItem = ({ item }: { item: ProductType }) => {
    const isFavourite = favIds.includes(item._id);

    return (
      <TouchableOpacity
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="click to view product details"
        accessibilityHint="Opens product details screen"
        style={[styles.card, { width: wp(44) }]}
        onPress={() => navigation.navigate('Details', { item })}
        activeOpacity={0.9}
      >
        <TouchableOpacity
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel="heart icon"
          accessibilityHint="Adds or removes from favourites"
          style={styles.heart}
          onPress={() => handleToggleFavourite(item)}
        >
          {isFavourite ? <HeartFill /> : <Heart />}
        </TouchableOpacity>

        <Image
          accessible={false}
          source={getShoeImage(item.images?.[0])}
          style={[styles.image, { height: wp(25) }]}
          resizeMode="contain"
        />

        {item.isBestSeller && (
          <Text style={[styles.best, { fontSize: wp(2.8) }]}>BEST SELLER</Text>
        )}

        <Text style={[styles.name, { fontSize: wp(4) }]} numberOfLines={1}>
          {item.name}
        </Text>

        <Text style={[styles.subtitle, { fontSize: wp(3.2) }]}>
          {item.brand}
        </Text>

        <View style={styles.row}>
          <Text style={[styles.price, { fontSize: wp(3.8) }]}>
            ₹{item.basePrice}
          </Text>

          <View style={styles.colorRow}>
            {item.relatedVariants
              ?.slice(0, 3)
              .map((v: RelatedVariantType, i: number) => (
                <View
                  key={i}
                  style={[
                    styles.colorDot,
                    {
                      backgroundColor: v.colorCode,
                      marginLeft: i === 0 ? 0 : wp(1),
                    },
                  ]}
                />
              ))}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <ButtonComponent
            accessibilityLabel="Go back"
            accessibilityHint="Returns to the previous screen"
            onPress={() => navigation.goBack()}
          >
            {theme.theme === 'light' ? <Back /> : <Backwhite />}
          </ButtonComponent>

          <Text style={styles.title}>
            {screen === 'bestSeller' ? 'BEST SELLER' : 'New Arrivals'}
          </Text>

          <View style={styles.headerRight}>
            <TouchableOpacity
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="filter products"
              accessibilityHint="Opens filter panel"
              onPress={() => setShowFilter(true)}
            >
              {theme.theme === 'light' ? (
                <Filter width={26} height={26} />
              ) : (
                <Filterwhite width={26} height={26} />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="serach products"
              accessibilityHint="Opens product search"
              onPress={() => navigation.replace('Search')}
            >
              {theme.theme === 'light' ? (
                <Searchblack width={22} height={22} />
              ) : (
                <Searchwhite width={22} height={22} />
              )}
            </TouchableOpacity>
          </View>
        </View>
        {loading ? (
          <ProductGridSkeleton />
        ) : (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            getItemLayout={getItemLayout}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  {screen === 'bestSeller'
                    ? 'No bestseller products available for this filter.'
                    : 'No new arrivals available for this filter.'}
                </Text>

                <Text style={styles.emptySubText}>
                  Try browsing another brand or changing the filter.
                </Text>
              </View>
            }
          />
        )}
      </View>

      <Filtermodal
        visible={showFilter}
        onClose={() => setShowFilter(false)}
        screenType={screen === 'bestSeller' ? 'bestseller' : 'newarrival'}
      />
    </SafeAreaView>
  );
};

export default BestSeller;

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
      padding: 16,
    },

    headerRight: {
      flexDirection: 'row',
      gap: 8,
      alignItems: 'center',
    },

    title: {
      fontSize: 18,
      fontFamily: font.airmedium,
      color: theme.darkText,
    },

    columnWrapper: {
      justifyContent: 'space-between',
    },

    listContent: {
      padding: 16,
      paddingBottom: 20,
      flexGrow: 1,
    },

    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    card: {
      backgroundColor: theme.white,
      borderRadius: 20,
      padding: 12,
      marginBottom: 16,
    },

    heart: {
      position: 'absolute',
      top: 10,
      left: 10,
      zIndex: 10,
      backgroundColor: theme.background,
      padding: 8,
      borderRadius: 30,
    },

    image: {
      width: '100%',
    },

    best: {
      color: '#5B9EE1',
      marginTop: 5,
      fontFamily: font.airlight,
    },

    subtitle: {
      color: theme.mode === 'dark' ? '#A0A7AD' : '#707B81',
      marginTop: 5,
      fontFamily: font.airlight,
    },

    name: {
      fontFamily: font.airbold,
      marginTop: 2,
      color: theme.darkText,
    },

    price: {
      marginTop: 2,
      fontFamily: font.airmedium,
      color: theme.darkText,
    },

    colorRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    colorDot: {
      width: 14,
      height: 14,
      borderRadius: 7,
    },

    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
    },

    emptyText: {
      color: theme.darkText,
      fontFamily: font.airmedium,
      fontSize: 16,
    },
    emptySubText: {
      marginTop: 8,
      color: theme.mode === 'dark' ? '#A0A7AD' : '#707B81',
      fontFamily: font.airlight,
      fontSize: 14,
      textAlign: 'center',
    },
  });
