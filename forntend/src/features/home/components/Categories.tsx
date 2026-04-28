import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useMemo } from 'react';
import { brandLigth, brandDark, brandType } from '../data/Categoriesdata';
import { useAppTheme } from '../../../shared/hooks/theme';
import CategoriesComponent from './CategoriesComponent';

type Props = {
  selectedBrand: string;
  onSelectBrand: (brand: string) => void;
};

const Categories = ({ selectedBrand, onSelectBrand }: Props) => {
  const theme = useAppTheme();

  const brand: brandType[] = useMemo(() => {
    return theme.theme === 'dark' ? brandDark : brandLigth;
  }, [theme.theme]);

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {brand.map((item) => (
          <CategoriesComponent
            key={item.id}
            item={item}
            selectedBrand={selectedBrand}
            onSelectBrand={onSelectBrand}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});