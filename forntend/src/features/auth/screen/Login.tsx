import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import ButtonComponent from '../../../shared/components/ButtonComponent';
import Heading from '../components/Heading';
import { SafeAreaView } from 'react-native-safe-area-context';
import Back from '../../../assets/svg/Back.svg';
import InputField from '../components/InputField';
import Vector from '../../../assets/svg/Vector.svg';
import OpenEyes from '../../../assets/svg/OpenEyes.svg';
import AuthButtton from '../components/AuthButton';
import GoogleButton from '../components/GoogleButton';
import { authstyle } from '../style/auth';
import { useResponsive } from '../../../shared/hooks/responsive';
import font from '../../style/font';
import { useNavigation } from '@react-navigation/native';
import { NavigationType } from '../types/navigationType';
import { useAppTheme } from '../../../shared/hooks/theme';
import Eyewhite from '../../../assets/svg/Eyewhite.svg';
import Openeyewhite from '../../../assets/svg/OpenEyeWhite.svg';
import Backwhite from '../../../assets/svg/Backwhite.svg';
import { getLogin } from '../services/auth.services';
import { validateEmail, validatePassword } from '../services/auth.validation';
import { storeToken } from '../../../shared/services/token';
import { showError } from '../../../shared/utils/showError';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [secureText, setSecureText] = useState<boolean>(true);
  const { wp, hp } = useResponsive();
  const navigation = useNavigation<NavigationType>();
  const theme = useAppTheme();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = async () => {
    const emailerror = validateEmail(email);
    const passwordError = validatePassword(password);

    setEmailError(emailerror);
    setPasswordError(passwordError);
    if (emailerror || passwordError) {
      return;
    }

    setLoading(true);

    try {
      const res = await getLogin(email, password);
      if (res) {
        navigation.replace('Drawer');
      } else {
        Alert.alert('Login Failed', 'Invalid credentials');
      }
    } catch (error) {
      showError('Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const Eyes = () => {
    return (
      <TouchableOpacity
        onPress={() => setSecureText(!secureText)}
        accessible={true}
        accessibilityRole="button"
        accessibilityLabel="Eye Icon"
        accessibilityHint="Toggles password visibility"
      >
        {secureText ? (
          theme.theme === 'dark' ? (
            <Eyewhite />
          ) : (
            <Vector />
          )
        ) : theme.theme === 'dark' ? (
          <Openeyewhite />
        ) : (
          <OpenEyes />
        )}
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{ backgroundColor: theme.background, flex: 1, padding: wp(4) }}
      >
        <View>
          <ButtonComponent
            accessibilityLabel="Go back"
            accessibilityHint="Returns to the previous screen"
            onPress={() => navigation.goBack()}
          >
            {theme.theme == 'light' ? <Back /> : <Backwhite />}
          </ButtonComponent>
        </View>
        <View style={{ marginTop: hp(2) }}>
          <Heading
            title="Hello Again!"
            subtitle="Welcome Back You’ve Been Missed!"
          />
        </View>
        <View style={{ marginTop: hp(6) }}>
          <View>
            <InputField
              label="Email Address"
              placeholder="Enter Email"
              values={email}
              onChangeTexts={setEmail}
              error={emailError}
            />
          </View>
          <View>
            <InputField
              label="Password"
              placeholder="Enter password"
              values={password}
              onChangeTexts={setPassword}
              secureTextEntry={secureText}
              rightIcon={<Eyes />}
              error={passwordError}
            />
          </View>
          <TouchableOpacity
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="recovery password"
            accessibilityHint="Goes to password recovery"
            onPress={() => navigation.navigate('Recovery')}
          >
            <Text style={style.recovery}>Recovery Password</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: hp(3) }}>
          <AuthButtton title="Sign In" onPress={handleLogin} />
          {loading && (
            <View style={style.loaderContainer}>
              <ActivityIndicator size="large" color={theme.darkText} />
            </View>
          )}
        </View>
        <View style={{ marginTop: hp(3) }}>
          <GoogleButton />
        </View>
        <View
          style={{
            marginTop: hp(13),
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 3,
          }}
        >
          <Text style={authstyle.subtitle}>Don't Have An Account?</Text>
          <TouchableOpacity
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="sign up"
            accessibilityHint="Goes to sign up screen"
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={[authstyle.title, { color: theme.darkText }]}>
              Sign Up For Free
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const style = StyleSheet.create({
  recovery: {
    textAlign: 'right',
    fontSize: 14,
    fontFamily: font.airmedium,
    color: '#707B81',
  },
  loaderContainer: {
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
