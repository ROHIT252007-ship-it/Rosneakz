import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { useAppTheme } from '../../../shared/hooks/theme';

const ProductDetailSkeleton = () => {
  const theme = useAppTheme();

  const shimmerColors =
    theme.mode === 'dark'
      ? ['#2A2A2A', '#3A3A3A', '#2A2A2A']
      : ['#E5E7EB', '#F3F4F6', '#E5E7EB'];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.headerRow}>
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          shimmerColors={shimmerColors}
          style={styles.headerBtn}
        />
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          shimmerColors={shimmerColors}
          style={styles.headerTitle}
        />
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          shimmerColors={shimmerColors}
          style={styles.headerBtn}
        />
      </View>

      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        shimmerColors={shimmerColors}
        style={styles.mainImage}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.card, { backgroundColor: theme.white }]}>
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            shimmerColors={shimmerColors}
            style={styles.bestSeller}
          />

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
            style={styles.desc1}
          />
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            shimmerColors={shimmerColors}
            style={styles.desc2}
          />

          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            shimmerColors={shimmerColors}
            style={styles.sectionTitle}
          />

          <View style={styles.galleryRow}>
            {[1, 2, 3, 4].map(item => (
              <ShimmerPlaceholder
                key={item}
                LinearGradient={LinearGradient}
                shimmerColors={shimmerColors}
                style={styles.galleryItem}
              />
            ))}
          </View>

          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            shimmerColors={shimmerColors}
            style={styles.sectionTitle}
          />

          <View style={styles.sizeRow}>
            {[1, 2, 3, 4, 5].map(item => (
              <ShimmerPlaceholder
                key={item}
                LinearGradient={LinearGradient}
                shimmerColors={shimmerColors}
                style={styles.sizeItem}
              />
            ))}
          </View>

          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            shimmerColors={shimmerColors}
            style={styles.sectionTitle}
          />

          <View style={styles.colorRow}>
            {[1, 2, 3, 4].map(item => (
              <ShimmerPlaceholder
                key={item}
                LinearGradient={LinearGradient}
                shimmerColors={shimmerColors}
                style={styles.colorItem}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={[styles.bottomBar, { backgroundColor: theme.white }]}>
        <View>
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            shimmerColors={shimmerColors}
            style={styles.bottomPriceLabel}
          />
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            shimmerColors={shimmerColors}
            style={styles.bottomPrice}
          />
        </View>

        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          shimmerColors={shimmerColors}
          style={styles.button}
        />
      </View>
    </View>
  );
};

export default ProductDetailSkeleton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
  },

  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  headerTitle: {
    width: 140,
    height: 22,
    borderRadius: 8,
  },

  mainImage: {
    width: '90%',
    height: 220,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 20,
  },

  card: {
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 16,
    marginBottom: 120,
  },

  bestSeller: {
    width: 100,
    height: 14,
    borderRadius: 6,
    marginBottom: 10,
  },

  name: {
    width: '70%',
    height: 26,
    borderRadius: 8,
    marginBottom: 10,
  },

  price: {
    width: '35%',
    height: 22,
    borderRadius: 8,
    marginBottom: 12,
  },

  desc1: {
    width: '95%',
    height: 16,
    borderRadius: 6,
    marginBottom: 8,
  },

  desc2: {
    width: '70%',
    height: 16,
    borderRadius: 6,
    marginBottom: 18,
  },

  sectionTitle: {
    width: 90,
    height: 20,
    borderRadius: 6,
    marginBottom: 12,
    marginTop: 8,
  },

  galleryRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },

  galleryItem: {
    width: 70,
    height: 70,
    borderRadius: 14,
  },

  sizeRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },

  sizeItem: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },

  colorRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },

  colorItem: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },

  bottomBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 16,
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  bottomPriceLabel: {
    width: 50,
    height: 14,
    borderRadius: 6,
    marginBottom: 8,
  },

  bottomPrice: {
    width: 80,
    height: 22,
    borderRadius: 8,
  },

  button: {
    width: 150,
    height: 52,
    borderRadius: 30,
  },
});