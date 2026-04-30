import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { useAppTheme } from '../../../shared/hooks/theme';

const CategoriesSkeleton = () => {
    const theme = useAppTheme();
   const shimmerColors =
    theme.theme === 'dark'
      ? ['#2A2F36', '#3A4048', '#2A2F36']
      : ['#E5E7EB', '#F3F4F6', '#E5E7EB'];
  return (
    <View style={styles.container}>      
       
          <View style={styles.card}>

            <ShimmerPlaceholder
              LinearGradient={LinearGradient}
              style={styles.image}
               shimmerColors={shimmerColors}
            />

          

          </View>


    </View>
  );
};

export default CategoriesSkeleton;

const styles = StyleSheet.create({
  container: {
    margin: 5,
    gap: 5,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 3.5,
    borderRadius: 45,
    backgroundColor: '#E0E0E0',
    padding: 5,
  },

  image: {
    width: 27,
    height: 27,
    borderRadius: 20,
  },
});