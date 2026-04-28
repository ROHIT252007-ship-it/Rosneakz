import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import font from '../../style/font';
import { useAppTheme } from '../../../shared/hooks/theme';
import { brandType } from '../data/Categoriesdata';
import CategoriesSkeleton from './CategoreiesSkeleton';

type Props = {
  item: brandType;
  selectedBrand: string;
  onSelectBrand: (brand: string) => void;
};

const CategoriesComponent = ({ item, selectedBrand, onSelectBrand }: Props) => {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const isSelected = selectedBrand === item.name;

if (!loaded) {
return  <CategoriesSkeleton />;
}else{
   return (
    
    <View style={styles.wrapper}>
      <TouchableOpacity
             accessible={true}
           accessibilityRole="button"
  accessibilityLabel="brand category"
  accessibilityHint="Filters by selected brand"
        style={isSelected ? styles.card1 : styles.card2}
        onPress={() => onSelectBrand(item.name)}
        activeOpacity={0.9}
      >
        <View style={styles.imageBox}>
          <Image
            accessible={false}
            source={item.image}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        {isSelected ? <Text style={styles.text}>{item.name}</Text> : null}
      </TouchableOpacity>

      
      </View>
   );
    } 
  
};

export default CategoriesComponent;

const createStyles = (theme: ReturnType<typeof useAppTheme>) =>
  StyleSheet.create({
    wrapper: {
      position: 'relative',
    },

    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },

    card1: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      marginVertical: 5,
      marginHorizontal:7,
      borderRadius: 45,
      backgroundColor: '#5B9EE1',
      padding: 5,
    },

    card2: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
      marginVertical: 5,
      marginHorizontal:7,
      borderRadius: 45,
      backgroundColor: theme.white,
      padding: 5,
    },

    imageBox: {
      padding: 7,
      backgroundColor: theme.white,
      borderRadius: 25,
    },

    image: {
      width: 20,
      height: 20,
    },

    text: {
      fontSize: 14,
      fontFamily: font.airmedium,
      color: '#FFFFFF',
      margin: 2,
    },
  });
