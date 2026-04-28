import React, { useMemo } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { useAppTheme } from '../../../shared/hooks/theme';

const ProductGridSkeleton = () => {
  const theme = useAppTheme();

  const skeleton = Array.from({ length: 8 });

  const shimmerColors =
    theme.theme === 'dark'
      ? ['#2A2F36', '#3A4048', '#2A2F36']
      : ['#E5E7EB', '#F3F4F6', '#E5E7EB'];

  const styles = useMemo(() => createStyles(theme), [theme]);

  const renderItem = () => {
    return (
      <View style={styles.card}>
        {/* heart */}
        <View style={styles.heart} />

        {/* image */}
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          shimmerColors={shimmerColors}
          style={styles.image}
        />

        {/* best seller */}
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          shimmerColors={shimmerColors}
          style={styles.best}
        />

        {/* name */}
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          shimmerColors={shimmerColors}
          style={styles.name}
        />

        {/* brand */}
        <ShimmerPlaceholder
          LinearGradient={LinearGradient}
          shimmerColors={shimmerColors}
          style={styles.brand}
        />

        {/* bottom row */}
        <View style={styles.row}>
          <ShimmerPlaceholder
            LinearGradient={LinearGradient}
            shimmerColors={shimmerColors}
            style={styles.price}
          />

          <View style={styles.colorRow}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={skeleton}
      renderItem={renderItem}
      keyExtractor={(_, i) => i.toString()}
      numColumns={2}
      columnWrapperStyle={styles.columnWrapper}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ProductGridSkeleton;

const createStyles = (theme: ReturnType<typeof useAppTheme>) =>
  StyleSheet.create({
    listContent: {
      padding: 16,
    },

    columnWrapper: {
      justifyContent: 'space-between',
    },

    card: {
      backgroundColor: theme.white,
      borderRadius: 20,
      padding: 12,
      marginBottom: 16,
      width: '48%',
    },

    heart: {
      position: 'absolute',
      top: 10,
      left: 10,
      width: 30,
      height: 30,
      borderRadius: 30,
      backgroundColor: theme.background,
      zIndex: 10,
    },

    image: {
      width: '100%',
      height: 120,
      borderRadius: 10,
    },

    best: {
      width: 80,
      height: 10,
      marginTop: 5,
      borderRadius: 5,
    },

    name: {
      width: '80%',
      height: 14,
      marginTop: 6,
      borderRadius: 5,
    },

    brand: {
      width: '50%',
      height: 12,
      marginTop: 5,
      borderRadius: 5,
    },

    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 10,
    },

    price: {
      width: 50,
      height: 14,
      borderRadius: 5,
    },

    colorRow: {
      flexDirection: 'row',
      gap: 4,
    },

    dot: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor:
        theme.theme === 'dark' ? '#3A4048' : '#E5E7EB',
    },
  });