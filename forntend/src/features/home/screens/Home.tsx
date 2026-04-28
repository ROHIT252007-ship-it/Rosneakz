import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonComponent from '../../../shared/components/ButtonComponent';
import Frame from '../../../assets/svg/Frame.svg';
import Menu from '../../../assets/svg/Menu.svg';
import Menuwhite from '../../../assets/svg/Menuwhite.svg';
import Bagwhite from '../../../assets/svg/Whitebag.svg';
import Location from '../../../assets/svg/Location.svg';
import font from '../../style/font';
import Search from '../../../assets/svg/Search.svg';
import Categories from '../components/Categories';
import Card from '../components/Card';
import Baner from '../components/Baner';
import Buttombar from '../../../shared/components/Buttombar';
import { useResponsive } from '../../../shared/hooks/responsive';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { NavigationTypeHome } from '../types/Hometype';
import { RootDarwerParamList } from '../../../shared/types/drawerNavigation.type';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useAppTheme } from '../../../shared/hooks/theme';
import { getProducts } from '../services/home.services';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../app/store/store';
import {
  setProductError,
  setProductLoading,
  setProducts,
} from '../../product/redux/productSlice';
// import { CartItem } from '../../cart/redux/cartSlice';
import CardSkeleton from '../components/CardSkeleton';
import BanerSkeleton from '../components/BanerSkeleton';
import { showError } from '../../../shared/utils/showError';
import { getCartFromStorage } from '../../cart/services/cartStorage';

const Home = () => {
  const [search, setSearch] = useState<string>('');
  const { wp, hp } = useResponsive();
  const navigation = useNavigation<NavigationTypeHome>();
  const drawerNavigation =
    useNavigation<DrawerNavigationProp<RootDarwerParamList>>();
  const theme = useAppTheme();
  const dispatch = useDispatch();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [selectedBrand, setSelectedBrand] = useState<string>('Nike');
  const { products, loading, error, fetched } = useSelector(
    (state: RootState) => state.products,
  );
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isCartNotEmpty = cartItems.length > 0;
  const safeProducts = Array.isArray(products) ? products : [];

  const filteredProducts = safeProducts.filter(
    item => item.brand === selectedBrand,
  );

  const popularProducts = filteredProducts.filter(item => item.isBestSeller);
  const newArrivalProducts = filteredProducts.filter(item => item.isNewArrival);
  const isLoading = loading;

  const storeProducts = async () => {
    try {
      dispatch(setProductLoading(true));
      const productData = await getProducts();
      dispatch(setProducts(productData));
    } catch (err) {
      dispatch(setProductError('Failed to fetch products'));
    }
  };


  useEffect(() => {
    if (fetched) return;
    storeProducts();
  }, [fetched]);


  const handleSearchSubmit = async (value?: string) => {
    try {
      const finalSearch = (value ?? search).trim();
      setSearch('');

      navigation.navigate('Product', { search: finalSearch });
    } catch (error) {
      showError('Error handling search submit:', error instanceof Error ? error.message : 'Unknown error');
    }
  };

  if (error) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.loaderContainer}>
          <Text style={[styles.heading, { fontSize: wp(4) }]}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={{ flex: 1, padding: wp(4), paddingBottom: hp(12) }}>
        <View style={[styles.header, { marginTop: hp(1) }]}>
          <ButtonComponent
            accessibilityLabel="Open menu"
            accessibilityHint="Opens the navigation drawer"
            onPress={() =>
              drawerNavigation.dispatch(DrawerActions.openDrawer())
            }
          >
            {theme.theme === 'light' ? <Menu /> : <Menuwhite />}
          </ButtonComponent>

          <View>
            <Text style={[styles.title, { fontSize: wp(3.5) }]}>
              Store location
            </Text>

            <View style={styles.location}>
              <Location />
              <Text style={[styles.locationtext, { fontSize: wp(3.8) }]}>
                Dindoli, Surat
              </Text>
            </View>
          </View>

          <ButtonComponent
            accessibilityLabel="Open cart"
            accessibilityHint="Navigates to your shopping cart"
            onPress={() => drawerNavigation.navigate('Cart')}
          >
            {theme.theme === 'light' ? <Frame /> : <Bagwhite />}
            {isCartNotEmpty && <View style={styles.dot} />}
          </ButtonComponent>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.lefticon}>
            <Search />
          </View>

          <TextInput
            accessibilityLabel="search input"
            accessibilityHint="Searches products, brands, or colors"
            style={styles.input}
            value={search}
            onChangeText={setSearch}
            placeholder="Looking for shoes"
            placeholderTextColor={theme.mode === 'dark' ? '#A0A7AD' : '#999'}
            returnKeyType="search"
            onSubmitEditing={() => handleSearchSubmit()}
          />
        </View>

        <View style={{ marginVertical: hp(0.3) }}>
          <Categories
            selectedBrand={selectedBrand}
            onSelectBrand={brand => {
              setSelectedBrand(brand);
            }}
          />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[styles.sectiontext, { marginVertical: hp(2) }]}>
            <Text style={[styles.heading, { fontSize: wp(4) }]}>
              Popular Shoes
            </Text>

            <TouchableOpacity
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="see all button"
              accessibilityHint="Opens best sellers list"
              onPress={() =>
                navigation.navigate('bestSeller', { screen: 'bestSeller' })
              }
            >
              <Text style={[styles.seeall, { fontSize: wp(3.5) }]}>
                See all
              </Text>
            </TouchableOpacity>
          </View>

          {isLoading ? <CardSkeleton /> : <Card data={popularProducts} />}
         
          <View style={[styles.sectiontext, { marginVertical: hp(2) }]}>
            <Text style={[styles.heading, { fontSize: wp(4) }]}>
              New Arrivals
            </Text>

            <TouchableOpacity
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="See all new arrivals"
              accessibilityHint="Opens new arrivals list"
              onPress={() =>
                navigation.navigate('bestSeller', { screen: 'Arrivals' })
              }
            >
              <Text style={[styles.seeall, { fontSize: wp(3.5) }]}>
                See all
              </Text>
            </TouchableOpacity>
          </View>

          {isLoading ? <BanerSkeleton /> : <Baner data={newArrivalProducts} />}
        </ScrollView>
      </View>
      <Buttombar />
    </SafeAreaView>
  );
};

export default Home;

const createStyles = (theme: ReturnType<typeof useAppTheme>) =>
  StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: theme.background,
    },

    loaderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    title: {
      textAlign: 'center',
      fontFamily: font.airlight,
      color: theme.mode === 'dark' ? '#A0A7AD' : '#707B81',
    },

    location: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },

    locationtext: {
      fontFamily: font.airmedium,
      color: theme.darkText,
    },

    heading: {
      fontFamily: font.airmedium,
      color: theme.darkText,
    },

    seeall: {
      color: '#5B9EE1',
      fontFamily: font.airmedium,
    },

    sectiontext: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    input: {
      flex: 1,
      fontSize: 16,
      fontFamily: font.airblack,
      color: theme.darkText,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 30,
      paddingHorizontal: 20,
      height: 60,
      backgroundColor: theme.white,
      marginTop: 15,
    },
    lefticon: {
      marginHorizontal: 10,
    },
    dot: {
      position: 'absolute',
      top: 3,
      right: 3,
      width: 10,
      height: 10,
      borderRadius: 10,
      backgroundColor: '#F87265',
    },
  });