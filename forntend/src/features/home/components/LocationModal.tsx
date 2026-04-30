import React, { useMemo, useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import font from '../../style/font';
import Search from '../../../assets/svg/Search.svg';
import { useAppTheme } from '../../../shared/hooks/theme';
import Location from '../../../assets/svg/Location.svg';
export type LocationType = {
  _id: string;
  shop_name: string;
  shop_area: string;
  city: string;
};

type Props = {
  visible: boolean;
  locations: LocationType[];
  selectedLocationId?: string;
  onClose: () => void;
  onSelect: (location: LocationType) => void;
};

const SelectShopModal = ({
  visible,
  locations,
  selectedLocationId,
  onClose,
  onSelect,
}: Props) => {
  const [search, setSearch] = useState('');
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const filteredLocations = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) return locations;

    return locations.filter(
      item =>
        item.shop_name.toLowerCase().includes(value) ||
        item.shop_area.toLowerCase().includes(value) ||
        item.city.toLowerCase().includes(value),
    );
  }, [search, locations]);

  const handleSelect = (item: LocationType) => {
    onSelect(item);
    console.log('Selected Location:', item);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.modalBox}>
          <View style={styles.handle} />

          <Text style={styles.title}>Select Shop</Text>
          <Text style={styles.subtitle}>Choose your nearest FootFlex store</Text>

          <View style={styles.inputContainer}>
            <View style={styles.lefticon}>
              <Search />
            </View>

            <TextInput
              accessibilityLabel="search input"
              accessibilityHint="Search by shop, area or city"
              style={styles.input}
              value={search}
              onChangeText={setSearch}
              placeholder="Search by shop, area or city"
              placeholderTextColor={theme.mode === 'dark' ? '#A0A7AD' : '#999'}
              returnKeyType="search"
            />
          </View>

          <FlatList
            data={filteredLocations}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={<Text style={styles.emptyText}>No shop found</Text>}
            renderItem={({ item }) => {
              const isSelected = selectedLocationId === item._id;

              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[styles.shopCard, isSelected && styles.selectedCard]}
                  onPress={() => handleSelect(item)}
                >
                  <View style={styles.iconBox}>
        
                    <Location width={20} height={50} />
                  </View>

                  <View style={styles.shopInfo}>
                    <Text style={styles.shopName}>{item.shop_name}</Text>
                    <Text style={styles.addressText}>
                      {item.shop_area}, {item.city}
                    </Text>
                  </View>

            
                </TouchableOpacity>
              );
            }}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default SelectShopModal;

const createStyles = (theme: ReturnType<typeof useAppTheme>) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.45)',
      justifyContent: 'flex-end',
    },
    modalBox: {
      maxHeight: '82%',
      backgroundColor: theme.white,
      paddingHorizontal: 20,
      paddingTop: 12,
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
    },
    handle: {
      width: 46,
      height: 5,
      borderRadius: 20,
      backgroundColor: '#D1D5DB',
      alignSelf: 'center',
      marginBottom: 16,
    },
    title: {
      fontSize: 24,
      fontFamily: font.airblack,
      color: theme.darkText,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 14,
      color: theme.mode === 'dark' ? '#A0A7AD' : '#707B86',
      textAlign: 'center',
      marginTop: 4,
      marginBottom: 16,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 30,
      paddingHorizontal: 20,
      height: 56,
      backgroundColor: theme.background,
      marginBottom: 14,
    },
    lefticon: {
      marginRight: 10,
    },
    input: {
      flex: 1,
      fontSize: 15,
      fontFamily: font.airblack,
      color: theme.darkText,
    },
    listContent: {
      paddingBottom: 24,
    },
    shopCard: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 14,
      borderRadius: 18,
      backgroundColor: theme.background,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: theme.mode === 'dark' ? '#2A3542' : '#EEF2F6',
    },
    selectedCard: {
      backgroundColor: theme.mode === 'dark' ? '#20364D' : '#EEF6FF',
      borderColor: '#5B9EE1',
    },
    iconBox: {
      width: 44,
      height: 44,
      borderRadius: 14,
      backgroundColor: theme.mode === 'dark' ? '#26384A' : '#EAF3FC',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    iconText: {
      fontSize: 20,
    },
    shopInfo: {
      flex: 1,
    },
    shopName: {
      fontSize: 16,
      fontFamily: font.airblack,
      color: theme.darkText,
    },
    addressText: {
      fontSize: 13,
      color: theme.mode === 'dark' ? '#A0A7AD' : '#707B86',
      marginTop: 3,
    },
    radioOuter: {
      width: 22,
      height: 22,
      borderRadius: 11,
      borderWidth: 2,
      borderColor: '#CBD5E1',
      alignItems: 'center',
      justifyContent: 'center',
    },
    radioOuterActive: {
      borderColor: '#5B9EE1',
    },
    radioInner: {
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: '#5B9EE1',
    },
    emptyText: {
      textAlign: 'center',
      color: theme.mode === 'dark' ? '#A0A7AD' : '#707B86',
      marginTop: 20,
    },
  });