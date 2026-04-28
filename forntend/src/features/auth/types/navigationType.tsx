

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../shared/types/stackNavigation.type';

export type NavigationType = NativeStackNavigationProp<
    RootStackParamList,
    "Login"
>;

export type NavigationTypeSignUp = NativeStackNavigationProp<
    RootStackParamList,
    "Signup"
>;