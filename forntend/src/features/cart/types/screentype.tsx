

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../shared/types/stackNavigation.type';



export type NavigationTypeCheckOut = NativeStackNavigationProp<
    RootStackParamList,
    "Checkout"
>;


export type NavigationTypebestSeller = NativeStackNavigationProp<
    RootStackParamList,
    "bestSeller"
>;
export type NavigationTypeProduct = NativeStackNavigationProp<
    RootStackParamList,
    "Product"
>;