import React, { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Back from '../../../assets/svg/Back.svg';
import Backwhite from '../../../assets/svg/Backwhite.svg';
import HeartFill from '../../../assets/svg/Hartred.svg';
import ButtonComponent from '../../../shared/components/ButtonComponent';
import font from '../../style/font';
import Buttombar from '../../../shared/components/Buttombar';
import { useResponsive } from '../../../shared/hooks/responsive';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../shared/types/stackNavigation.type';
import { useAppTheme } from '../../../shared/hooks/theme';
import { ProductType } from '../../../shared/types/product.type';
import { getShoeImage } from '../../../shared/utils/shoeImageMap';
import {
  getFavouriteProducts,
  removeFavouriteProduct,
} from '../utils/favoriteStoreage';
import { showError } from '../../../shared/utils/showError';

const Wishlist = () => {
  const { wp } = useResponsive();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [favourites, setFavourites] = useState<ProductType[]>([]);

  const loadFavourites = async () => {
    try {
      const data = await getFavouriteProducts();
      setFavourites(data);
    } catch (error) {
      showError('Error loading favourites:', error instanceof Error ? error.message : 'Unknown error');
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadFavourites();
    }, []),
  );
  const CARD_HEIGHT = wp(44) * 1.4 + 16;
  const handleRemoveFavourite = (productId: string) => {
    Alert.alert(
      'Remove from Wishlist',
      'Are you sure you want to remove this product from your wishlist?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            try {
              const updated = await removeFavouriteProduct(productId);
              setFavourites(updated);
            } catch (error) {
              showError('Error removing favourite:', error instanceof Error ? error.message : 'Unknown error');
            }
          },
        },
      ],
    );
  };

  const renderItem = ({ item }: { item: ProductType }) => {
    return (
      <TouchableOpacity
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel={`${item.name}, ${item.brand}, ₹${item.basePrice}`}
        accessibilityHint="Opens product details screen"
        style={[styles.card, { width: wp(44) }]}
        onPress={() => navigation.navigate('Details', { item })}
        activeOpacity={0.9}
      >
        <TouchableOpacity
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={`Remove ${item.name} from wishlist`}
          accessibilityHint="Removes from wishlist"
          style={styles.heart}
          onPress={() => handleRemoveFavourite(item._id)}
        >
          <HeartFill width={wp(4.5)} height={wp(4.5)} />
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

     

        <View style={styles.row}>
          <Text style={[styles.price, { fontSize: wp(3.8) }]}>
            ₹{item.basePrice}
          </Text>

          <View style={styles.colorRow}>
            {item.relatedVariants?.slice(0, 3).map((v, i) => (
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
        <View style={[styles.header, { padding: wp(4) }]}>
          <ButtonComponent
            accessibilityLabel="Go back"
            accessibilityHint="Returns to the previous screen"
            onPress={() => navigation.goBack()}
          >
            {theme.theme === 'light' ? <Back /> : <Backwhite />}
          </ButtonComponent>

          <Text style={styles.title}>Favourite</Text>

          <View style={{ width: 32 }} />
        </View>

        <FlatList
          data={favourites}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          getItemLayout={(_, index) => ({
            length: CARD_HEIGHT,
            offset: CARD_HEIGHT * Math.floor(index / 2),
            index,
          })}
          initialNumToRender={8}
          maxToRenderPerBatch={8}
          windowSize={7}
          removeClippedSubviews={true}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No favourite products</Text>
            </View>
          }
        />

        <Buttombar />
      </View>
    </SafeAreaView>
  );
};

export default Wishlist;

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
      fontSize: 18,
      fontFamily: font.airbold,
      color: theme.darkText,
    },

    columnWrapper: {
      justifyContent: 'space-between',
    },

    listContent: {
      padding: 16,
      paddingBottom: 120,
      flexGrow: 1,
    },

    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
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
      marginVertical: 10,
      width: 155,
      height: 120,
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
           width: 21,
      height: 21,
      borderRadius: 11,
      borderColor: theme.mode === 'dark' ? '#223a53' : '#e6e8e9',
      borderWidth: 3,
    },

    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 80,
    },

    emptyText: {
      fontSize: 16,
      fontFamily: font.airmedium,
      color: theme.darkText,
    },
  });
