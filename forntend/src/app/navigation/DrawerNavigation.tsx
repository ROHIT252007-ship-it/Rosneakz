import React from 'react'
import Home from '../../features/home/screens/Home'
import Wishlist from '../../features/cart/screen/Wishlist'
import Cart from '../../features/cart/screen/Cart'
import Profile from '../../features/user/screen/Profile'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { RootDarwerParamList } from '../../shared/types/drawerNavigation.type'
import CustomDrawer from '../../shared/components/Drawer'
import Notification from '../../features/home/screens/Notification'
import Setting from '../../features/home/screens/Setting'

const Drawer = createDrawerNavigator<RootDarwerParamList>();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator
    id="RootDrawer"
      screenOptions={{ headerShown: false,
        drawerStyle:{
          backgroundColor:"#1A2530",
          width:280
        },
       }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
 
      <Drawer.Screen name='Home' component={Home} />
      <Drawer.Screen name='Profile' component={Profile} />
      <Drawer.Screen name='Cart' component={Cart} />
      <Drawer.Screen name='Wishlist' component={Wishlist} />
      <Drawer.Screen name='Notification' component={Notification} />
      <Drawer.Screen name='Setting' component={Setting} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;