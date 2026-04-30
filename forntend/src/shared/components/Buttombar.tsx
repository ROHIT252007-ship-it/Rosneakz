import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Home from '../../assets/svg/Home.svg';
import Notification from '../../assets/svg/Notification.svg';
import User from '../../assets/svg/User.svg';
import Hart from '../../assets/svg/Hart.svg';
import Whitebag from '../../assets/svg/Whitebag.svg';
import HomeBlue from '../../assets/svg/Homeblue.svg';
import NotificationBlue from '../../assets/svg/Notificationblue.svg';
import UserBlue from '../../assets/svg/Userblue.svg';
import HartBlue from '../../assets/svg/Hartblue.svg';
import Buttomback from '../../assets/svg/Buttomback.svg';
import Buttombackdark from '../../assets/svg/ButtomBackDark.svg';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/stackNavigation.type';
import { useAppTheme } from '../hooks/theme';

const CENTER_WIDTH = 80;
const BAR_HEIGHT = 90;

const Buttombar = () => {
  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute();
  const theme = useAppTheme();

  const buttomData = [
    {
      id: 1,
      icon: Home,
      activeIcon: HomeBlue,
      screen: 'Drawer',
      activeOn: 'Home',
      label: 'Home',
    },
    {
      id: 2,
      icon: Hart,
      activeIcon: HartBlue,
      screen: 'Wishlist',
      activeOn: 'Wishlist',
      label: 'Wishlist',
    },
    {
      id: 3,
      icon: Whitebag,
      activeIcon: Whitebag,
      screen: 'Cart',
      activeOn: 'Cart',
      label: 'Cart',
    },
    {
      id: 4,
      icon: Notification,
      activeIcon: NotificationBlue,
      screen: 'Notification',
      activeOn: 'Notification',
      label: 'Notifications',
    },
    {
      id: 5,
      icon: User,
      activeIcon: UserBlue,
      screen: 'Profile',
      activeOn: 'Profile',
      label: 'Profile',
    },
  ];

  const sideIconWidth = (SCREEN_WIDTH - CENTER_WIDTH) / 4;
  const handlePress = (screen: string) => {
    if (screen === 'Drawer') {
      navigation.navigate('Drawer', { screen: 'Home' });
    } else {
      navigation.navigate(screen as never);
    }
  };

  return (
    <View style={[styles.wrapper, { width: SCREEN_WIDTH }]}>
      {theme.theme === 'dark' ? (
        <Buttombackdark
          width={SCREEN_WIDTH}
          height={BAR_HEIGHT}
          preserveAspectRatio="none"
          style={StyleSheet.absoluteFill}
        />
      ) : (
        <Buttomback
          width={SCREEN_WIDTH}
          height={BAR_HEIGHT}
          preserveAspectRatio="none"
          style={StyleSheet.absoluteFill}
        />
      )}
      <View style={[styles.iconRow, { width: SCREEN_WIDTH }]}>
        {buttomData.map((item, index) => {
          const isCenter = index === 2;
          const isActive = route.name === item.activeOn;
          const Icon = isActive ? item.activeIcon : item.icon;

          return (
            <TouchableOpacity
              accessible={true}
              accessibilityRole="tab"
              accessibilityLabel={item.label}
              accessibilityHint={`Navigates to ${item.label}`}
              accessibilityState={{ selected: isActive }}
              key={item.id}
              onPress={() => handlePress(item.screen)}
              style={[
                styles.iconWrapper,
                isCenter ? { width: CENTER_WIDTH } : { width: sideIconWidth },
                isCenter && styles.centerWrapper,
              ]}
              activeOpacity={0.8}
            >
              {isCenter ? (
                <View
                  style={[
                    styles.centerButton,
                    {
                      shadowColor:
                        theme.theme === 'dark' ? '#3a7bc8' : '#5B9EE1',
                    },
                  ]}
                >
                  <Icon width={28} height={28} />
                </View>
              ) : (
                <Icon width={24} height={24} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default Buttombar;

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: BAR_HEIGHT,
    zIndex: 1000,
    elevation: 10,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: BAR_HEIGHT,
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  centerWrapper: {
    marginTop: -55,
  },
  centerButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#5B9EE1',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowOffset: { width: 0, height: 40 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
});
