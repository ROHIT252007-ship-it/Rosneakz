import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import Home from '../../assets/svg/Home.svg'
import Profile from '../../assets/svg/User.svg'
import Greybag from '../../assets/svg/Greybag.svg'
import Hart from '../../assets/svg/Hart.svg'
import Notification from '../../assets/svg/Notification.svg'
import Logout from '../../assets/svg/SignOut.svg'
import font from '../../features/style/font';
import Setting from '../../assets/svg/Setting.svg'
import { removeToken } from '../services/token';
import { clearCart } from '../../features/cart/redux/cartSlice';
import { useDispatch } from 'react-redux';
import { saveCartToStorage } from '../../features/cart/services/cartStorage';
import { CommonActions } from '@react-navigation/native';
import { URL } from '@env';
import { getProfile } from '../../features/user/services/profile.services';
import { store } from '../../app/store/store';
import { showError } from '../utils/showError';


const Drawer = (props: any) => {
  const dispatch = useDispatch();
  const navigation = props.navigation;
  const [name, setName] = useState('');
  const [image, setImage] = useState<string | null>(null);
  useEffect(() => {
    loadProfile();
  }, []);
  const loadProfile = async () => {
    try {
      const res = await getProfile();

      if (!res) {
        console.error('Error', 'Unable to fetch profile data.');
        return;
      }
    

        const user = res?.data?.user;
        if (user) {
          setName(user.name || 'User');
          setImage(user.image || null);
        }
      
    } catch (error) {
      showError('Error', error instanceof Error ? error.message : 'Unknown error');
    }
  };


  const getProfileImage = () => {
    if (image && typeof image === 'string') {
      const safePath = image
        .split('/')
        .map(part => encodeURIComponent(part))
        .join('/');

      return { uri: `${URL}/${safePath}` };
    }
    return require('../../assets/image/Profile.png');
  };


  const handleLogout = async () => {
    try {

      const currentCart = store.getState().cart.items;
      await saveCartToStorage(currentCart);
      await removeToken();
      dispatch(clearCart()); 
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      );
    } catch (error) {
      showError('Logout error:', error instanceof Error ? error.message : 'Unknown error');
    }
  }
  return (
    <DrawerContentScrollView {...props}
    >


      <TouchableOpacity  onPress={() => props.navigation.navigate('Profile')} style={styles.profileContainer}>
        <Image
          accessible={true}
          accessibilityRole="image"
          accessibilityLabel="Profile picture"
          source={getProfileImage()}
          style={styles.image}
          onError={() => setImage(null)}
        />
        <Text style={[styles.email,{color:'#707B81'}]}>Hey,</Text>
        <Text style={styles.name}>{name}</Text>
      </TouchableOpacity>


      <DrawerItem
        icon={() => <Profile />}
        label="Profile"
        labelStyle={{ color: '#FFFFFF', fontSize: 16, fontFamily: font.airmedium }}
        onPress={() => props.navigation.navigate('Profile')}
      />

      <DrawerItem
        icon={() => <Home />}
        label="Home"
        labelStyle={{ color: '#FFFFFF', fontSize: 16, fontFamily: font.airmedium }}
        onPress={() => props.navigation.navigate('Home')}
      />


      <DrawerItem
        icon={() => <Greybag />}
        label="My Cart"
        labelStyle={{ color: '#FFFFFF', fontSize: 16, fontFamily: font.airmedium }}
        onPress={() => props.navigation.navigate('Cart')}
      />

      <DrawerItem
        icon={() => <Hart />}
        label="Favorite"
        labelStyle={{ color: '#FFFFFF', fontSize: 16, fontFamily: font.airmedium }}
        onPress={() => props.navigation.navigate('Wishlist')}
      />





      <DrawerItem
        icon={() => <Notification />}
        label="Notifications"
        labelStyle={{ color: '#FFFFFF', fontSize: 16, fontFamily: font.airmedium }}
        onPress={() => props.navigation.navigate('Notification')}
      />

      <DrawerItem
        icon={() => <Setting width={24} height={24} />}
        label="Settings"
        labelStyle={{ color: '#FFFFFF', fontSize: 16, fontFamily: font.airmedium }}
        onPress={() => props.navigation.navigate('Setting')}
      />

      <View style={{ height: 2, borderWidth: 1, width: 200, borderColor: "#2D3B48", marginLeft: 15 }}></View>

      <DrawerItem
        icon={() => <Logout />}
        label="Sign Out"
        labelStyle={{ color: '#ffffff', fontSize: 16, fontFamily: font.airmedium }}
        onPress={() => handleLogout()}
      />

    </DrawerContentScrollView>
  );
};

export default Drawer;

const styles = StyleSheet.create({
  profileContainer: {
    padding: 20,
    marginTop: 30,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#fff"
  },
  email: {
    fontSize: 12,
    color: '#666',
  },
  logout: {
    marginTop: 20,
    marginLeft: 20,
  },
});
