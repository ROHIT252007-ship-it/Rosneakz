import React from 'react';
import { View, StyleSheet } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { useAppTheme } from '../../../shared/hooks/theme';

const CartcardSkeleton = () => {
  const theme = useAppTheme();

  const shimmerColors =
    theme.mode === 'dark'
      ? ['#2A2A2A', '#3A3A3A', '#2A2A2A']
      : ['#E5E7EB', '#F3F4F6', '#E5E7EB'];

  return (
    <View style={[styles.card, { backgroundColor: theme.background }]}>
      <View
        style={[
          styles.imageBox,
          { backgroundColor: theme.mode === 'dark' ? theme.background : '#fff' },
        ]}
      >
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          shimmerColors={shimmerColors}
          style={styles.image}
        />
      </View>

      <View style={styles.content}>
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          shimmerColors={shimmerColors}
          style={styles.name}
        />

        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          shimmerColors={shimmerColors}
          style={styles.price}
        />

        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          shimmerColors={shimmerColors}
          style={styles.meta}
        />

        <View style={styles.row}>
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            shimmerColors={shimmerColors}
            style={styles.iconBtn}
          />

          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            shimmerColors={shimmerColors}
            style={styles.quantity}
          />

          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            shimmerColors={shimmerColors}
            style={styles.iconBtn}
          />
        </View>
      </View>

      <View style={styles.right}>
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          shimmerColors={shimmerColors}
          style={styles.totalPrice}
        />

        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          shimmerColors={shimmerColors}
          style={styles.deleteIcon}
        />
      </View>
    </View>
  );
};

export default CartcardSkeleton;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    borderRadius: 15,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
  },

  imageBox: {
    borderRadius: 15,
    marginRight: 12,
    padding: 6,
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },

  content: {
    flex: 1,
  },

  name: {
    width: '75%',
    height: 16,
    borderRadius: 6,
    marginBottom: 8,
  },

  price: {
    width: '35%',
    height: 14,
    borderRadius: 6,
    marginBottom: 8,
  },

  meta: {
    width: '70%',
    height: 12,
    borderRadius: 6,
    marginBottom: 12,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  iconBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
  },

  quantity: {
    width: 20,
    height: 14,
    borderRadius: 6,
  },

  right: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
  },

  totalPrice: {
    width: 55,
    height: 14,
    borderRadius: 6,
  },

  deleteIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});