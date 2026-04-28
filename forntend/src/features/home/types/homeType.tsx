

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../shared/types/stackNavigation.type';

export type NavigationTypeHome = NativeStackNavigationProp<
    RootStackParamList,
    "Drawer"
>;

export type NavigationTypeDetails = NativeStackNavigationProp<
    RootStackParamList,
    "Details"
>;
export type NavigationTypeSearch = NativeStackNavigationProp<
    RootStackParamList,
    "Search"
>;