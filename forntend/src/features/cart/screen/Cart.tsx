import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import CartItem from '../components/Cartcard';
import font from '../../style/font';
import ButtonComponent from '../../../shared/components/ButtonComponent';
import Back from '../../../assets/svg/Back.svg';
import Backwhite from '../../../assets/svg/Backwhite.svg';
import { useResponsive } from '../../../shared/hooks/responsive';
import { useNavigation } from '@react-navigation/native';
import { payoutType } from '../types/payoutType';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../shared/types/stackNavigation.type';
import { useAppTheme } from '../../../shared/hooks/theme';
import { getCartFromStorage } from '../services/cartStorage';
import CartcardSkeleton from '../components/CartSkeleton';
import { RootState } from '../../../app/store/store';
import { CartItem as CartItemType } from '../redux/cartSlice';
import { showError } from '../../../shared/utils/showError';
const CartScreen = () => {
  const items = useSelector((state: RootState) => state.cart?.items || []);
  const [loading, setLoading] = useState(items.length === 0);

  useEffect(() => {
    setLoading(false);
  }, [items]);

  const subtotal =
    items.reduce(
      (sum: number, item: CartItemType) =>
        sum + item.product.basePrice * item.quantity,
      0,
    ) || 0;

  const shopping = subtotal == 0 ? 0 : 50;
  const total = subtotal + shopping;

  const price: payoutType = {
    subtotal,
    shopping,
    total,
  };

  const { wp, hp } = useResponsive();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useAppTheme();
  const checkout = async (price: payoutType) => {
    try {
      const crat = await getCartFromStorage();
      if (crat.length == 0) {
        Alert.alert('Your cart is empty', 'Please add items to proceed.');
        return;
      } else {
        navigation.navigate('Checkout', { price });
      }
    } catch (error) {
      showError('Error during checkout:', error instanceof Error ? error.message : 'Unknown error');
    }
  };
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      <View style={{ flex: 1 }}>
        <View
          style={[
            styles.header,
            { paddingHorizontal: wp(4), marginTop: hp(1) },
          ]}
        >
          <ButtonComponent
            accessibilityLabel="Go back"
            accessibilityHint="Returns to the previous screen"
            onPress={() => navigation.goBack()}
          >
            {theme.theme === 'light' ? <Back /> : <Backwhite />}
          </ButtonComponent>

          <Text
            style={[styles.title, { color: theme.darkText, fontSize: wp(4.2) }]}
          >
            My Cart
          </Text>

          <View style={{ width: wp(8) }} />
        </View>
        {loading ? (
          <>
            <CartcardSkeleton />
            <CartcardSkeleton />
            <CartcardSkeleton />
          </>
        ) : (
          <FlatList
            data={items}
            renderItem={({ item }) => (item ? <CartItem item={item} /> : null)}
            keyExtractor={(item, index) =>
              `${item.product._id}-${item.selectedSize}-${item.selectedColor}-${index}`
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: wp(4),
              paddingTop: hp(2),
              paddingBottom: hp(25),
            }}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={[styles.emptyText, { color: theme.darkText }]}>
                  Your cart is empty
                </Text>
              </View>
            }
          />
        )}
        <View
          style={[
            styles.summary,
            { backgroundColor: theme.white, padding: wp(4) },
          ]}
        >
          <Row label="Subtotal" value={`₹${subtotal.toFixed(2)}`} />
          <Row label="Shipping" value={`₹${shopping.toFixed(2)}`} />

          <View style={styles.divider} />

          <Row label="Total Cost" value={`₹${total.toFixed(2)}`} bold />

          <TouchableOpacity
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="checkout button"
            accessibilityHint="Opens checkout screen"
            onPress={() => checkout(price)}
            style={[styles.checkout, { marginTop: hp(1.5) }]}
          >
            <Text
              style={[
                styles.checkoutText,
                { color: theme.white, fontSize: wp(4) },
              ]}
            >
              Checkout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const Row = ({
  label,
  value,
  bold = false,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) => {
  const theme = useAppTheme();

  return (
    <View style={styles.row}>
      <Text
        style={[styles.rowText, {color: '#707B81'}, bold && [styles.bold, { color: theme.darkText }]]}
      >
        {label}
      </Text>
      <Text
        style={[styles.rowText, { color: theme.darkText }, bold && styles.bold]}
      >
        {value}
      </Text>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontFamily: font.airmedium,
  },

  rowText: {
    fontFamily: font.airmedium,
  },

  bold: {
    fontWeight: 'bold',
  },

  summary: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 15,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  checkout: {
    backgroundColor: '#5B9EE1',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
  },

  checkoutText: {
    fontFamily: font.airbold,
  },

  emptyContainer: {
    marginTop: 40,
    alignItems: 'center',
  },

  emptyText: {
    fontFamily: font.airmedium,
    fontSize: 16,
  },

  divider: {
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#ccc',
    marginVertical: 10,
  },
});
