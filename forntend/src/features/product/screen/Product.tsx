import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Back from '../../../assets/svg/Back.svg';
import Backwhite from '../../../assets/svg/Backwhite.svg';
import ButtonComponent from '../../../shared/components/ButtonComponent';
import font from '../../style/font';
import { RootStackParamList } from '../../../shared/types/stackNavigation.type';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Search from '../../../assets/svg/Search.svg';
import InputField from '../../auth/components/InputField';
import { useResponsive } from '../../../shared/hooks/responsive';
import Productcard from '../components/Productcard';
import { useAppTheme } from '../../../shared/hooks/theme';
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store/store';
import ProductGridSkeleton from '../../cart/components/BestSellerSkeleton';
import { showError } from '../../../shared/utils/showError';

type Props = NativeStackScreenProps<RootStackParamList, 'Product'>;

const Product = ({ route, navigation }: Props) => {
  const searchProp = route.params?.search || '';
  const [search, setSearch] = useState(searchProp);
  const { hp } = useResponsive();
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const { products, loading } = useSelector(
    (state: RootState) => state.products,
  ) as { products: any[]; loading: boolean };
  const handleSearchSubmit = async (value?: string) => {
    try {
      const finalSearch = (value ?? search).trim();
      setSearch('');

      navigation.replace('Product', { search: finalSearch });
    } catch (error) {
      showError('Error handling search submit:', error instanceof Error ? error.message : 'Unknown error');
    }
  };
  const filteredData = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    if (!searchText) return products;

    return products.filter(item => {
      const name = item.name?.toLowerCase() || '';
      const brand = item.brand?.toLowerCase() || '';
      const description = item.description?.toLowerCase() || '';
      const gender = item.gender?.toLowerCase() || '';
      const color = item.color?.toLowerCase() || '';

      return (
        name.includes(searchText) ||
        brand.includes(searchText) ||
        description.includes(searchText) ||
        gender.includes(searchText) ||
        color.includes(searchText)
      );
    });
  }, [products, search]);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.main}>
        <View style={styles.header}>
          <ButtonComponent
            accessibilityLabel="Go back"
            accessibilityHint="Returns to the previous screen"
            onPress={() => navigation.goBack()}
          >
            {theme.theme == 'light' ? <Back /> : <Backwhite />}
          </ButtonComponent>

          <Text style={styles.title}>Product</Text>

          <TouchableOpacity
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="cancel button"
            accessibilityHint="Goes to previous screen"
            onPress={() => navigation.navigate('Drawer')}
          >
            <Text style={styles.cancel}>Cancel</Text>
          </TouchableOpacity>
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

        <View style={styles.productWrapper}>
          {loading ? (
            <ProductGridSkeleton />
          ) : (
            <Productcard data={filteredData} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Product;

const createStyles = (theme: ReturnType<typeof useAppTheme>) =>
  StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: theme.background,
      padding: 15,
    },

    main: {
      flex: 1,
      backgroundColor: theme.background,
    },

    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    title: {
      fontSize: 18,
      fontFamily: font.airmedium,
      color: theme.darkText,
    },

    cancel: {
      color: '#5B9EE1',
      fontFamily: font.airmedium,
    },

    productWrapper: {
      flex: 1,
      marginTop: 20,
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
  });
