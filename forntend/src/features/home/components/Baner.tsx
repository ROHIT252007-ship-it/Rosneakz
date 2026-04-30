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
import font from '../../style/font';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../shared/types/stackNavigation.type';
import { useAppTheme } from '../../../shared/hooks/theme';
import { ProductType } from '../../../shared/types/product.type';
import { getShoeImage } from '../../../shared/utils/shoeImageMap';

type Props = {
  data: ProductType[];
};

const Baner = ({ data }: Props) => {
  const { wp } = useResponsive();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useAppTheme();

  const styles = useMemo(() => createStyles(theme), [theme]);

  const renderItem = ({ item }: { item: ProductType }) => {
    const image = getShoeImage(item.images?.[0]);
    return (
      <TouchableOpacity
             accessible={true}
           accessibilityRole="button"
  accessibilityLabel="banner item"
  accessibilityHint="Opens product details screen"
        style={[styles.card, { width: wp(90) }]}
        onPress={() => navigation.navigate('Details', { item })}
        activeOpacity={0.9}
      >
        <View style={styles.imageWrapper}>
          <Image
            accessible={false}
            source={image}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <View style={styles.text}>
          {item.isBestSeller ? (
            <Text style={styles.besttext}>BEST CHOICE</Text>
          ) : null}

          <Text style={styles.nametext} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.pricetext}>₹{item.basePrice}</Text>
        </View>
      </TouchableOpacity>
    );
  };
if (!data || data.length === 0) {
  return (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No products available</Text>
    </View>
  );
}

  return (
    <FlatList
      data={data.length > 3 ? data.slice(0, 3) : data}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={wp(90) + 20}
      decelerationRate="fast"
      snapToAlignment="start"
      contentContainerStyle={styles.container}
     
    />
  );
};

export default Baner;

const createStyles = (theme: ReturnType<typeof useAppTheme>) =>
  StyleSheet.create({
    container: {
      gap: 20,
    },
emptyContainer: {
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  paddingVertical: 40,
},

emptyText: {
  fontSize: 16,
  fontFamily: font.airmedium,
  color: theme.darkText,
},
    card: {
      flexDirection: 'row-reverse',
      backgroundColor: theme.white,
      borderRadius: 20,
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 18,
      alignItems: 'center',
    },

    imageWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      
    },

    image: {
      width: 140,
      height: 120,
      margin:'auto',

    },

    besttext: {
      color: '#5B9EE1',
      fontFamily: font.airlight,
      paddingHorizontal: 10,
      paddingVertical: 3,
    },

    nametext: {
      fontFamily: font.airbold,
      fontSize: 20,
      paddingHorizontal: 10,
      paddingVertical: 3,
      color: theme.darkText,
    },

    brandtext: {
      fontFamily: font.airlight,
      fontSize: 14,
      paddingHorizontal: 10,
      color: '#707B81',
    },

    pricetext: {
      fontFamily: font.airmedium,
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 3,
      color: theme.darkText,
    },

    text: {
      justifyContent: 'center',
      flex: 1,
    },
  });
