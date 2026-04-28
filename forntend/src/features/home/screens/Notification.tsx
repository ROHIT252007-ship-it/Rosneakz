import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  SectionList,
} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import ButtonComponent from '../../../shared/components/ButtonComponent';
import Back from '../../../assets/svg/Back.svg';
import Backwhite from '../../../assets/svg/Backwhite.svg';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootDarwerParamList } from '../../../shared/types/drawerNavigation.type';
import font from '../../style/font';
import Buttombar from '../../../shared/components/Buttombar';
import { useAppTheme } from '../../../shared/hooks/theme';
import { getShoeImage } from '../../../shared/utils/shoeImageMap';
import { apiClient } from '../../../shared/services/apiClient';
import { useResponsive } from '../../../shared/hooks/responsive';
import { showError } from '../../../shared/utils/showError';

type NotificationItem = {
  id: string;
  title: string;
  description: string;
  originalPrice: string;
  discountPrice: string;
  image: any;
  time: string;
  isUnread?: boolean;
};

type Section = {
  title: string;
  data: NotificationItem[];
};

const NotificationCard = ({ item }: { item: NotificationItem }) => {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.card}>
      <Image
        accessible={true}
        accessibilityRole="image"
        accessibilityLabel={`${item.title} image`}
        source={item.image}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.content}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>

        <View style={styles.priceRow}>
          <Text style={styles.discountPrice}>₹{item.discountPrice}</Text>
          <Text style={styles.originalPrice}> ₹{item.originalPrice}</Text>
        </View>
      </View>

      <View style={styles.right}>
        <Text style={styles.time}>{item.time}</Text>
        {item.isUnread && <View style={styles.dot} />}
      </View>
    </View>
  );
};

const Notification = () => {
  const [data, setData] = useState<Section[]>([]);
  const navigation = useNavigation<DrawerNavigationProp<RootDarwerParamList>>();
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { wp } = useResponsive();
  const fetchNotifications = async () => {
    try {
      const res = await apiClient.get(`/notification`);
      const apiData = res.data.data;

      const grouped: any = {};

      apiData.forEach((item: any) => {
        if (!grouped[item.sectionTitle]) {
          grouped[item.sectionTitle] = [];
        }

        grouped[item.sectionTitle].push({
          id: item._id,
          title: item.title,
          description: item.description,
          originalPrice: item.originalPrice,
          discountPrice: item.discountPrice,
          image: getShoeImage(item.image),
          time: item.time,
          isUnread: item.isUnread,
        });
      });

      const finalData = Object.keys(grouped).map(key => ({
        title: key,
        data: grouped[key],
      }));

      setData(finalData);
    } catch (error) {
      showError('Notification Error:', error instanceof Error ? error.message : 'Unknown error');
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={[styles.header, { padding: wp(4) }]}>
          <ButtonComponent
            accessibilityLabel="Go back"
            accessibilityHint="Returns to the previous screen"
            onPress={() => navigation.goBack()}
          >
            {theme.theme == 'light' ? <Back /> : <Backwhite />}
          </ButtonComponent>

          <Text style={styles.title}>Notification</Text>

          <TouchableOpacity
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="cancel button"
            accessibilityHint="Goes to home screen"
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.cancel}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <SectionList
          sections={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <NotificationCard item={item} />}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No notifications yet.</Text>
            </View>
          }
          maxToRenderPerBatch={8}
          windowSize={5}
          removeClippedSubviews={true}
          initialNumToRender={8}
        />

        <Buttombar />
      </View>
    </SafeAreaView>
  );
};

export default Notification;

const createStyles = (theme: ReturnType<typeof useAppTheme>) =>
  StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: theme.background,
    },

    container: {
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

    listContainer: {
      paddingHorizontal: 16,
      paddingBottom: 100,
    },

    sectionHeader: {
      fontSize: 18,
      fontFamily: font.airbold,
      color: theme.darkText,
      backgroundColor: theme.background,
      paddingVertical: 12,
    },

    card: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 16,
      padding: 12,
      marginBottom: 10,
      backgroundColor: theme.white,
    },

    image: {
      width: 70,
      height: 70,
      borderRadius: 10,
      backgroundColor: theme.background,
    },

    content: {
      flex: 1,
      marginLeft: 12,
    },

    cardTitle: {
      fontSize: 14,
      fontFamily: font.airbold,
      color: theme.darkText,
    },

    description: {
      fontSize: 13,
      marginTop: 2,
      fontFamily: font.airlight,
      color: theme.darkText,
    },

    priceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 6,
      gap: 5,
    },

    discountPrice: {
      fontSize: 14,
      fontFamily: font.airbold,
      color: theme.darkText,
    },

    originalPrice: {
      fontSize: 13,
      color: '#9E9E9E',
      textDecorationLine: 'line-through',
      fontFamily: font.airlight,
    },

    right: {
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
      alignSelf: 'flex-start',
      gap: 8,
    },

    time: {
      fontSize: 11,
      color: '#9E9E9E',
      fontFamily: font.airlight,
    },

    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#5B9EE1',
      marginTop: 4,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 60,
    },

    emptyText: {
      fontSize: 16,
      fontFamily: font.airmedium,
      color: theme.darkText,
    },
  });
