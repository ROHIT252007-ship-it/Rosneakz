import { StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import React from 'react';
import { useResponsive } from '../../../shared/hooks/responsive';
import font from '../../style/font';
import { useAppTheme } from '../../../shared/hooks/theme';
import { signInWithGoogle } from '../services/googleLogin.services';
import Google from '../../../assets/svg/Google.svg';
import { storeToken } from '../../../shared/services/token';
import { useNavigation } from '@react-navigation/native';
import { NavigationType } from '../types/navigationType';
import { showError } from '../../../shared/utils/showError';

const GoogleButton = () => {
  const { wp, hp } = useResponsive();
  const theme = useAppTheme();
  const navigation = useNavigation<NavigationType>();
  const handleGoogleLogin = async () => {
    try {
      const res = await signInWithGoogle();

      if (res?.success) {
        const token = res.token;
        const saveToken = await storeToken(token);
        if (saveToken) {
          navigation.replace('Drawer');
        } else {
          Alert.alert('Error', 'Failed to save token');
        }
      } else {
        Alert.alert('Error', res?.message || 'Login failed');
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Google login failed';
      showError('Google Login Error', message);
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel="Sign in with Google"
      accessibilityHint="Starts Google sign in"
      style={[
        styles.container,
        {
          width: wp(90),
          height: hp(6),
          borderRadius: wp(90) / 2,
          backgroundColor: theme.white,
        },
      ]}
      onPress={handleGoogleLogin}
    >
      <Google />
      <Text style={[styles.btntext, { color: theme.darkText }]}>
        Sign In With Google
      </Text>
    </TouchableOpacity>
  );
};

export default GoogleButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btntext: {
    fontFamily: font.airmedium,
    fontSize: 18,
  },
});
