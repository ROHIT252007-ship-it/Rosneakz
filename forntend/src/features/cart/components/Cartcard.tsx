import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { increment, decrement, removeItem, CartItem } from '../redux/cartSlice';
import Add from '../../../assets/svg/Add.svg';
import Subtract from '../../../assets/svg/Subtract.svg';
import Delete from '../../../assets/svg/Delete.svg';
import { useAppTheme } from '../../../shared/hooks/theme';
import font from '../../style/font';
import { getShoeImage } from '../../../shared/utils/shoeImageMap';

type Props = {
  item: CartItem;
};
const Cartcard = ({ item }: Props) => {
  const dispatch = useDispatch();
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const handleIncrement = () => {
    dispatch(
      increment({
        productId: item.product._id,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
      }),
    );
  };

  const handleDecrement = () => {
    dispatch(
      decrement({
        productId: item.product._id,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
      }),
    );
  };

  const handleRemove = () => {
    dispatch(
      removeItem({
        productId: item.product._id,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
      }),
    );
  };

  return (
    <View style={styles.card}>
      <View style={styles.imageBox}>
        <Image
          accessible={true}
          accessibilityRole="image"
          accessibilityLabel={`${item.product.name} image`}
          source={getShoeImage(item.product.images?.[0])}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>
          {item.product.name}
        </Text>

        <Text style={styles.price}>₹{item.product.basePrice}</Text>

        <Text style={styles.meta}>
          Size: {item.selectedSize} | Color: {item.selectedColor}
        </Text>

        <View style={styles.row}>
          <TouchableOpacity
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={`Decrease ${item.product.name} quantity`}
            accessibilityHint="Decreases quantity by one"
            accessibilityValue={{ text: `${item.quantity}` }}
            onPress={handleDecrement}
          >
            <View style={styles.subBtn}>
              <Subtract width={10} height={10} />
            </View>
          </TouchableOpacity>

          <Text style={styles.quantity}>{item.quantity}</Text>

          <TouchableOpacity
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={`Increase ${item.product.name} quantity`}
            accessibilityHint="Increases quantity by one"
            accessibilityValue={{ text: `${item.quantity}` }}
            onPress={handleIncrement}
          >
            <View style={styles.addBtn}>
              <Add width={10} height={10} />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.right}>
        <Text style={styles.totalPrice}>
          ₹{item.product.basePrice * item.quantity}
        </Text>

        <TouchableOpacity
          accessible={true}
          accessibilityRole="button"
          accessibilityLabel={`Remove ${item.product.name} from cart`}
          accessibilityHint="Removes this item from cart"
          onPress={handleRemove}
        >
          <Delete />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cartcard;

const createStyles = (theme: ReturnType<typeof useAppTheme>) =>
  StyleSheet.create({
    card: {
      flexDirection: 'row',
      backgroundColor: theme.background,
      borderRadius: 15,
      padding: 10,
      marginBottom: 15,
      alignItems: 'center',
    },

    imageBox: {
      backgroundColor: theme.mode === 'dark' ? theme.background : '#fff',
      borderRadius: 15,
      marginRight: 12,
      padding: 6,
    },

    image: {
      width: 80,
      height: 80,
    },

    content: {
      flex: 1,
    },

    name: {
      fontFamily: font.airbold,
      color: theme.darkText,
    },

    price: {
      marginTop: 4,
      fontFamily: font.airmedium,
      color: theme.darkText,
    },

    meta: {
      marginTop: 2,
      marginBottom: 8,
      fontFamily: font.airlight,
      color: theme.mode === 'dark' ? '#A0A7AD' : '#707B81',
      fontSize: 12,
    },

    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },

    subBtn: {
      backgroundColor: theme.mode === 'dark' ? theme.background : '#fff',
      padding: 7,
      minHeight: 44,
      minWidth: 44,
      borderRadius: 14,
      justifyContent: 'center',
      alignItems: 'center',
    },

    addBtn: {
      backgroundColor: '#5B9EE1',
      padding: 9,
      maxHeight: 44,
      maxWidth: 44,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
    },

    quantity: {
      color: theme.darkText,
      fontFamily: font.airmedium,
    },

    right: {
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 80,
    },

    totalPrice: {
      color: theme.darkText,
      fontFamily: font.airmedium,
    },
  });
