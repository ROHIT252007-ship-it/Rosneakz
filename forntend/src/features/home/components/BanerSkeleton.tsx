import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { useResponsive } from '../../../shared/hooks/responsive';
import { useAppTheme } from '../../../shared/hooks/theme';

const BanerSkeleton = () => {
  const { wp } = useResponsive();
  const theme = useAppTheme();

  const styles = useMemo(() => createStyles(theme, wp), [theme, wp]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.imageWrapper}>
          <View style={styles.image} />
        </View>

        <View style={styles.text}>
          <View style={styles.besttext} />
          <View style={styles.nametext} />
          <View style={styles.brandtext} />
          <View style={styles.pricetext} />
        </View>
      </View>
    </View>
  );
};

export default BanerSkeleton;

const createStyles = (theme: ReturnType<typeof useAppTheme>, wp: (value: number) => number) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 4,
    },

    card: {
      width: wp(90),
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
      borderRadius: 16,
      backgroundColor: theme.theme === 'dark' ? '#2A2F36' : '#E5E7EB',
    },

    text: {
      justifyContent: 'center',
      flex: 1,
    },

    besttext: {
      width: 90,
      height: 14,
      borderRadius: 6,
      marginBottom: 10,
      marginLeft: 10,
      backgroundColor: theme.theme === 'dark' ? '#2A2F36' : '#E5E7EB',
    },

    nametext: {
      width: '80%',
      height: 22,
      borderRadius: 6,
      marginBottom: 10,
      marginLeft: 10,
      backgroundColor: theme.theme === 'dark' ? '#2A2F36' : '#E5E7EB',
    },

    brandtext: {
      width: '45%',
      height: 16,
      borderRadius: 6,
      marginBottom: 10,
      marginLeft: 10,
      backgroundColor: theme.theme === 'dark' ? '#2A2F36' : '#E5E7EB',
    },

    pricetext: {
      width: '35%',
      height: 18,
      borderRadius: 6,
      marginLeft: 10,
      backgroundColor: theme.theme === 'dark' ? '#2A2F36' : '#E5E7EB',
    },
  });