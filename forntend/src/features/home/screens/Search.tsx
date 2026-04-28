import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
} from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Back from '../../../assets/svg/Back.svg';
import Backwhite from '../../../assets/svg/Backwhite.svg';
import ButtonComponent from '../../../shared/components/ButtonComponent';
import font from '../../style/font';
import Watch from '../../../assets/svg/Watch.svg';
import { useNavigation } from '@react-navigation/native';
import SearchIcon from '../../../assets/svg/Search.svg';
import { NavigationTypeSearch } from '../types/Hometype';
import { useAppTheme } from '../../../shared/hooks/theme';
import { useResponsive } from '../../../shared/hooks/responsive';
import { showError } from '../../../shared/utils/showError';

const RECENT_SEARCHES_KEY = 'RECENT_SEARCHES';
const MAX_RECENT_SEARCHES = 8;

const Search = () => {
  const navigation = useNavigation<NavigationTypeSearch>();
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { wp } = useResponsive();
  const [search, setSearch] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const loadRecentSearches = useCallback(async () => {
    try {
      const data = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);

      if (!data) {
        setRecentSearches([]);
        return;
      }

      const parsed = JSON.parse(data);

      if (Array.isArray(parsed)) {
        const validSearches = parsed.filter(
          item => typeof item === 'string' && item.trim().length > 0,
        );
        setRecentSearches(validSearches);
      } else {
        setRecentSearches([]);
      }
    } catch (error) {
      showError('loadRecentSearches error:', error instanceof Error ? error.message : 'Unknown error');
      setRecentSearches([]);
    }
  }, []);

  useEffect(() => {
    loadRecentSearches();
  }, [loadRecentSearches]);

  const saveRecentSearches = async (items: string[]) => {
    try {
      await AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(items));
    } catch (error) {
      showError('saveRecentSearches error:', error instanceof Error ? error.message : 'Unknown error');
    }
  };

  const handleSearchSubmit = async (value?: string) => {
    try {
      const finalSearch = (value ?? search).trim();

      if (!finalSearch) return;

      const updated = [
        finalSearch,
        ...recentSearches.filter(
          item => item.toLowerCase() !== finalSearch.toLowerCase(),
        ),
      ].slice(0, MAX_RECENT_SEARCHES);

      setRecentSearches(updated);
      await saveRecentSearches(updated);
      setSearch('');

      navigation.replace('Product', { search: finalSearch });
    } catch (error) {
        showError('Error handling search submit:', error instanceof Error ? error.message : 'Unknown error');
    }
  };

  const handleRecentPress = async (item: string) => {
    try {
      await handleSearchSubmit(item);
    } catch (error) {
      showError('Error handling recent search press:', error instanceof Error ? error.message : 'Unknown error');
    }
  };

  const clearRecentSearches = async () => {
    try {
      await AsyncStorage.removeItem(RECENT_SEARCHES_KEY);
      setRecentSearches([]);
    } catch (error) {
      showError('clearRecentSearches error:', error instanceof Error ? error.message : 'Unknown error');
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.main}>
        <View style={[styles.header, { padding: wp(4) }]}>
          <ButtonComponent
            accessibilityLabel="Go back"
            accessibilityHint="Returns to the previous screen"
            onPress={() => navigation.goBack()}
          >
            {theme.theme === 'light' ? <Back /> : <Backwhite />}
          </ButtonComponent>

          <Text style={styles.title}>Search</Text>

          <TouchableOpacity
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="cancel button"
            accessibilityHint="Goes to home screen"
            onPress={() => navigation.navigate('Drawer')}
          >
            <Text style={styles.cancel}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <View style={styles.lefticon}>
                <SearchIcon />
              </View>

              <TextInput
                accessibilityLabel="search input"
                accessibilityHint="Searches products, brands, or colors"
                style={styles.input}
                value={search}
                onChangeText={setSearch}
                placeholder="Looking for shoes"
                placeholderTextColor={
                  theme.mode === 'dark' ? '#A0A7AD' : '#999'
                }
                autoFocus
                returnKeyType="search"
                onSubmitEditing={() => handleSearchSubmit()}
              />
            </View>
          </View>
        </View>

        <View style={styles.headingRow}>
          <Text style={styles.heading}>Recent Searches</Text>

          {recentSearches.length > 0 && (
            <TouchableOpacity
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="clear recent searches"
              accessibilityHint="Clears recent searches"
              onPress={clearRecentSearches}
            >
              <Text style={styles.clearText}>Clear All</Text>
            </TouchableOpacity>
          )}
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            recentSearches.length === 0 ? styles.emptyContainer : undefined
          }
        >
          {recentSearches.length > 0 ? (
            recentSearches.map((item, index) => {
              return (
                <TouchableOpacity
                  accessible={true}
                  key={`${item}-${index}`}
                  style={styles.recentSearch}
                  onPress={() => handleRecentPress(item)}
                  accessibilityRole="button"
                  accessibilityLabel={`Search for ${item}`}
                  accessibilityHint={`Searches for ${item}`}
                >
                  <Watch />
                  <Text style={styles.searchText}>{item}</Text>
                </TouchableOpacity>
              );
            })
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No recent searches</Text>
              <Text style={styles.emptySubtitle}>
                Start searching for shoes, brands, or colors.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Search;

const createStyles = (theme: ReturnType<typeof useAppTheme>) =>
  StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: theme.background,
    },

    main: {
      flex: 1,
      backgroundColor: theme.background,
    },

    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    title: {
      fontSize: 18,
      fontFamily: font.airmedium,
      color: theme.darkText,
    },

    cancel: {
      color: '#5B9EE1',
      fontFamily: font.airmedium,
    },

    container: {
      alignItems: 'center',
      marginTop: 20,
    },

    form: {
      width: '90%',
    },

    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 30,
      paddingHorizontal: 20,
      height: 60,
      backgroundColor: theme.white,
    },

    input: {
      flex: 1,
      fontSize: 16,
      fontFamily: font.airblack,
      color: theme.darkText,
    },

    lefticon: {
      marginHorizontal: 10,
    },

    headingRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 15,
      marginTop: 15,
    },

    heading: {
      color: theme.darkText,
      fontFamily: font.airmedium,
      fontSize: 18,
      paddingHorizontal: 15,
    },

    clearText: {
      color: '#5B9EE1',
      fontFamily: font.airmedium,
      fontSize: 14,
      paddingHorizontal: 15,
    },

    scrollView: {
      flex: 1,
      paddingHorizontal: 15,
      marginTop: 10,
    },

    recentSearch: {
      flexDirection: 'row',
      marginVertical: 10,
      gap: 10,
      alignItems: 'center',
    },

    searchText: {
      color: theme.darkText,
      fontFamily: font.airlight,
      fontSize: 14,
    },

    emptyContainer: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 24,
    },

    emptyState: {
      alignItems: 'center',
    },

    emptyTitle: {
      color: theme.darkText,
      fontFamily: font.airmedium,
      fontSize: 16,
      marginBottom: 8,
    },

    emptySubtitle: {
      color: theme.darkText,
      fontFamily: font.airlight,
      fontSize: 14,
      textAlign: 'center',
      opacity: 0.7,
    },
  });
