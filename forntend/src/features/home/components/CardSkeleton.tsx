import React, { useMemo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { useAppTheme } from '../../../shared/hooks/theme';

const CardSkeleton = () => {
  const skeleton = [1, 2, 3, 4, 5, 6];
  const theme = useAppTheme();

  const shimmerColors =
    theme.theme === 'dark'
      ? ['#2A2F36', '#3A4048', '#2A2F36']
      : ['#E5E7EB', '#F3F4F6', '#E5E7EB'];

  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {skeleton.map((item, index) => {
        return (
          <View style={styles.card} key={index}>
            <View style={styles.imageWrapper}>
              <ShimmerPlaceholder
                LinearGradient={LinearGradient}
                shimmerColors={shimmerColors}
                style={styles.image}
              />
            </View>

            <ShimmerPlaceholder
              LinearGradient={LinearGradient}
              shimmerColors={shimmerColors}
              style={styles.besttext}
            />

            <ShimmerPlaceholder
              LinearGradient={LinearGradient}
              shimmerColors={shimmerColors}
              style={styles.name}
            />

            <ShimmerPlaceholder
              LinearGradient={LinearGradient}
              shimmerColors={shimmerColors}
              style={styles.brand}
            />

            <View style={styles.bottom}>
              <ShimmerPlaceholder
                LinearGradient={LinearGradient}
                shimmerColors={shimmerColors}
                style={styles.price}
              />

              <ShimmerPlaceholder
                LinearGradient={LinearGradient}
                shimmerColors={shimmerColors}
                style={styles.button}
              />
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default CardSkeleton;

const createStyles = (theme: ReturnType<typeof useAppTheme>) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginBottom: 20,
    },

    card: {
      backgroundColor: theme.white,
      borderRadius: 20,
      paddingTop: 10,
      overflow: 'hidden',
      width: 160,
      marginRight: 16,
    },

    imageWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 130,
      paddingHorizontal: 10,
    },

    image: {
      width: 140,
      height: 100,
      borderRadius: 10,
    },

    besttext: {
      width: 80,
      height: 10,
      marginLeft: 10,
      marginTop: 5,
      borderRadius: 5,
    },

    name: {
      width: '70%',
      height: 14,
      marginLeft: 10,
      marginTop: 10,
      borderRadius: 5,
    },

    brand: {
      width: '50%',
      height: 12,
      marginLeft: 10,
      marginTop: 6,
      borderRadius: 5,
    },

    bottom: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 12,
    },

    price: {
      width: 60,
      height: 16,
      borderRadius: 5,
      marginLeft: 10,
      marginBottom: 10,
    },

    button: {
      width: 34,
      height: 38,
      borderTopLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
  });