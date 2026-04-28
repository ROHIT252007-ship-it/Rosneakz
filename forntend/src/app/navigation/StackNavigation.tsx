import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Onboard from '../../features/onboard/screens/Onboard'
import Login from '../../features/auth/screen/Login'
import Signup from '../../features/auth/screen/Signup'
import Recovery from '../../features/auth/screen/Recovery'
import Details from '../../features/product/screen/Details'
import { RootStackParamList } from '../../shared/types/stackNavigation.type'
import Checkout from '../../features/cart/screen/Checkout'
import Bestsele from '../../features/cart/screen/BestSeller'
import Search from '../../features/home/screens/Search'
import DrawerNavigation from './DrawerNavigation'
import Product from '../../features/product/screen/Product'
import { navigationRef } from './navigationRef'

const StackNavigation = () => {
    const Stack=createNativeStackNavigator<RootStackParamList>()
  return (

<NavigationContainer ref={navigationRef}>

<Stack.Navigator screenOptions={{headerShown:false}}>
  <Stack.Screen name='Onboard' component={Onboard} />
  <Stack.Screen name='Login' component={Login} />
  <Stack.Screen name='Signup' component={Signup} />
  <Stack.Screen name='Recovery' component={Recovery} />
  <Stack.Screen name='Drawer' component={DrawerNavigation} />
  <Stack.Screen name='Details' component={Details} />
  
  <Stack.Screen name='Checkout' component={Checkout} />
  <Stack.Screen name='bestSeller' component={Bestsele} />
  <Stack.Screen name='Search' component={Search} />
  <Stack.Screen name='Product' component={Product} />


</Stack.Navigator>

    </NavigationContainer>

  )
}

export default StackNavigation