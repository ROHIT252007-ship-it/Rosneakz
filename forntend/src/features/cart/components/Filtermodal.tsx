import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useMemo, useState } from 'react';
import font from '../../style/font';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { useAppTheme } from '../../../shared/hooks/theme';
import { useDispatch } from 'react-redux';
import { filter } from '../../product/redux/productSlice';

const GENDERS = ['Men', 'Women', 'Unisex'];
const SIZES = [6, 7, 8, 9, 10, 12, 13, 14];

type Props = {
  visible: boolean;
  onClose: () => void;
  screenType: 'bestseller' | 'newarrival';
};

const Filtermodal = ({ visible, onClose, screenType }: Props) => {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const dispatch = useDispatch();

  const [values, setValues] = useState([4299, 5999]);
  const [selectedGender, setSelectedGender] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<number | undefined>(undefined);

  const handleReset = () => {
    setSelectedGender('');
    setSelectedSize(undefined);
    setValues([4299, 5999]);

    dispatch(
      filter({
        type: screenType,
      })
    );

    onClose();
  };

  const handleApplyFilters = () => {
   dispatch(
  filter({
    gender: selectedGender || undefined,
    size: selectedSize,
    minPrice: values[0],
    maxPrice: values[1],
    type: screenType,
  })
);

    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.dece} />

          <View style={styles.headers}>
            <View>
              <Text> </Text>
            </View>

            <View>
              <Text style={styles.title}>Filters</Text>
            </View>

            <TouchableOpacity 
                   accessible={true}
           accessibilityRole="button"
  accessibilityLabel="reset filters"
  accessibilityHint="Resets all filters"
            onPress={handleReset}>
              <Text style={styles.reset}>RESET</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>Gender</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.genders}
          >
            {GENDERS.map((item, index) => {
              const isActive = selectedGender === item;

              return (
                <TouchableOpacity
                       accessible={true}
           accessibilityRole="button"
  accessibilityLabel={`${item} filter`}
  accessibilityHint={`Filters by ${item}`}
                  key={index}
                  onPress={() =>
                    setSelectedGender(prev => (prev === item ? '' : item))
                  }
                  style={[styles.gender, isActive && styles.activeGender]}
                >
                  <Text style={[styles.gendertext, isActive && styles.activeText]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <Text style={styles.subtitle}>Sizes</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.genders}
          >
            {SIZES.map((item, index) => {
              const isActive = selectedSize === item;

              return (
                <TouchableOpacity
                       accessible={true}
           accessibilityRole="button"
  accessibilityLabel={`size ${item} filter`}
  accessibilityHint={`Filters by size ${item}`}
                  key={index}
                  onPress={() =>
                    setSelectedSize(prev => (prev === item ? undefined : item))
                  }
                  style={[styles.gender, isActive && styles.activeGender]}
                >
                  <Text style={[styles.gendertext, isActive && styles.activeText]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          <Text style={styles.subtitle}>Price</Text>

          <View style={styles.priceWrapper}>
            <Text style={styles.rangeText}>
              Range: ₹{values[0]} - ₹{values[1]}
            </Text>

            <MultiSlider
              values={values}
              min={4299}
              max={5999}
              step={1}
              onValuesChange={val => setValues(val)}
              sliderLength={300}
              selectedStyle={styles.selectedSlider}
              unselectedStyle={styles.unselectedSlider}
              markerStyle={styles.marker}
            />
          </View>

          <TouchableOpacity 
                 accessible={true}
           accessibilityRole="button"
  accessibilityLabel="apply filters"
  accessibilityHint="Applies selected filters"
          style={styles.btn} onPress={handleApplyFilters}>
            <Text style={styles.btntext}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Filtermodal;

const createStyles = (theme: ReturnType<typeof useAppTheme>) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0,0,0,0.3)',
    },

    container: {
      backgroundColor: theme.white,
      padding: 15,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
    },

    dece: {
      height: 5,
      width: 60,
      backgroundColor: theme.mode === 'dark' ? '#3A4651' : '#E9EDEF',
      alignSelf: 'center',
      marginVertical: 10,
      borderRadius: 3,
    },

    headers: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 15,
      alignItems: 'center',
    },

    title: {
      fontFamily: font.airmedium,
      fontSize: 24,
      color: theme.darkText,
    },

    reset: {
      fontFamily: font.airlight,
      fontSize: 12,
      color: theme.mode === 'dark' ? '#A0A7AD' : '#707B81',
    },

    subtitle: {
      fontFamily: font.airmedium,
      fontSize: 18,
      marginTop: 10,
      color: theme.darkText,
    },

    genders: {
      marginTop: 10,
      flexDirection: 'row',
      gap: 10,
      paddingRight: 10,
    },

    gender: {
      paddingHorizontal: 30,
      paddingVertical: 15,
      backgroundColor: theme.mode === 'dark' ? theme.background : '#E9EDEF',
      borderRadius: 50,
    },

    gendertext: {
      color: theme.mode === 'dark' ? '#A0A7AD' : '#707B81',
      fontFamily: font.airmedium,
    },

    activeGender: {
      backgroundColor: '#5B9EE1',
    },

    activeText: {
      color: '#fff',
    },

    priceWrapper: {
      alignItems: 'center',
      marginTop: 5,
      marginBottom: 20,
    },

    rangeText: {
      color: theme.darkText,
      fontFamily: font.airmedium,
      marginBottom: 10,
    },

    selectedSlider: {
      backgroundColor: '#5B9EE1',
      height: 5,
      borderRadius: 10,
    },

    unselectedSlider: {
      backgroundColor: theme.mode === 'dark' ? '#3A4651' : '#ddd',
      height: 5,
      borderRadius: 10,
    },

    marker: {
      borderColor: '#5B9EE1',
      backgroundColor: theme.white,
      borderWidth: 2,
      height: 15,
      width: 15,
      top: 3,
    },

    btn: {
      backgroundColor: '#5B9EE1',
      paddingVertical: 15,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
    },

    btntext: {
      color: '#fff',
      fontSize: 18,
      fontFamily: font.airmedium,
    },
  });