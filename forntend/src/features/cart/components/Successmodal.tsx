import React, { useMemo } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import font from '../../style/font';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../shared/types/stackNavigation.type';
import { useAppTheme } from '../../../shared/hooks/theme';
import { useEffect } from 'react';
type Props = {
  visible: boolean;
};

const SuccessModal = ({ visible }: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const theme = useAppTheme();
  

useEffect(() => {
  if (visible) {
    const timer = setTimeout(() => {
      navigation.navigate('Drawer');
    }, 3000);

    return () => clearTimeout(timer);
  }
}, [visible, navigation]);
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          
          <View style={styles.iconBox}>
            <Text style={styles.emoji}>🎉</Text>
          </View>

          <Text style={styles.message}>
            Your Payment Is{'\n'}Successful
          </Text>

          <View
            style={styles.button}
          >
            <Text style={styles.buttonText}>Back To Shopping</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SuccessModal;

const createStyles = (theme: ReturnType<typeof useAppTheme>) =>
  StyleSheet.create({
    modalBackground: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },

    modalContainer: {
      width: '80%',
      backgroundColor: theme.white,
      borderRadius: 15,
      padding: 25,
      alignItems: 'center',
    },

    iconBox: {
      backgroundColor: theme.mode === 'dark' ? '#243447' : '#DFEFFF',
      height: 100,
      width: 100,
      borderRadius: 50,
      justifyContent: 'center',
      alignItems: 'center',
    },

    emoji: {
      fontSize: 60,
    },

    message: {
      fontSize: 16,
      fontFamily: font.airmedium,
      marginVertical: 15,
      textAlign: 'center',
      color: theme.darkText,
    },

    button: {
      backgroundColor: '#5B9EE1',
      paddingVertical: 13,
      paddingHorizontal: 30,
      borderRadius: 50,
      marginTop: 10,
    },

    buttonText: {
      color: '#fff',
      fontFamily: font.airmedium,
      fontSize: 18,
    },
  });