import { RootStackParamList } from '../../../shared/types/stackNavigation.type';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';



export type onBroadingType = {
    id: number,
    image: any,
    firstText: string,
    secondText: string,
}

export type NavigationType = NativeStackNavigationProp<
    RootStackParamList,
    "Onboard"
>;

