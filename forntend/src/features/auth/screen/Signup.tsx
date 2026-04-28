import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
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
import { NavigationTypeSignUp } from '../types/navigationType';
import { useAppTheme } from '../../../shared/hooks/theme';
import Eyewhite from '../../../assets/svg/Eyewhite.svg';
import Openeyewhite from '../../../assets/svg/OpenEyeWhite.svg';
import Backwhite from '../../../assets/svg/Backwhite.svg';
import { getSignup } from '../services/auth.services';
import {
  validateEmail,
  validateName,
  validatePassword,
} from '../services/auth.validation';
import { showError } from '../../../shared/utils/showError';

const Signup = () => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [secureText, setSecureText] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
const [confirmPassword, setConfirmPassword] = useState<string>('');
const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [nameError, setNameError] = useState('');
  const { hp } = useResponsive();
  const navigation = useNavigation<NavigationTypeSignUp>();
  const theme = useAppTheme();
  const { wp } = useResponsive();
  const handleSignup = async () => {
    const nameerror = validateName(name);
    const emailerror = validateEmail(email);
    const passworderror = validatePassword(password);
const confirmError =
  confirmPassword !== password ? 'Passwords do not match' : '';

setConfirmPasswordError(confirmError);
    setNameError(nameerror);
    setEmailError(emailerror);
    setPasswordError(passworderror);
    if (nameerror || emailerror || passworderror || confirmError){
      return;
    }

    setLoading(true);

    try {
      const res = await getSignup(name, email, password);

      if (res) {
        navigation.replace('Drawer');
      } else {
        Alert.alert('Signup Failed', 'Something went wrong');
      }
    } catch (error) {
      showError('Error', 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const Eyes = () => (
    <TouchableOpacity
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel="eye icon"
      accessibilityHint="Toggles password visibility"
      onPress={() => setSecureText(!secureText)}
    >
      {secureText ? (
        theme.theme === 'light' ? (
          <Vector />
        ) : (
          <Eyewhite />
        )
      ) : theme.theme === 'light' ? (
        <OpenEyes />
      ) : (
        <Openeyewhite />
      )}
    </TouchableOpacity>
  );

  return (
   <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
 <KeyboardAvoidingView
  style={{ flex: 1 }}
  behavior={Platform.OS === 'ios' ? 'padding' : undefined}
>
  <View style={{ padding: wp(4) }}>
        <ButtonComponent
          accessibilityLabel="Go back"
          accessibilityHint="Returns to the previous screen"
          onPress={() => navigation.goBack()}
        >
          {theme.theme == 'light' ? <Back /> : <Backwhite />}
        </ButtonComponent>
        </View>
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[
        styles.scrollContent,
        { padding: wp(4), paddingBottom: hp(4) },
      ]}
    >
     

        {/* Heading */}
       <View style={styles.section}>
          <Heading
            title="Create Account"
            subtitle="Let’s Create Account Together"
          />
        </View>

        {/* Inputs */}
        <View style={[styles.section, { marginTop: hp(3) }]}>
          <InputField
            label="Your Name"
            placeholder="Enter Your Name"
            values={name}
            onChangeTexts={setName}
            error={nameError}
          />

          <InputField
            label="Email Address"
            placeholder="Enter Email"
            values={email}
            onChangeTexts={setEmail}
            error={emailError}
          />

          <InputField
            label="Password"
            placeholder="Enter password"
            values={password}
            onChangeTexts={setPassword}
            secureTextEntry={secureText}
            rightIcon={<Eyes />}
            error={passwordError}
          />
          <InputField
  label="Confirm Password"
  placeholder="Confirm password"
  values={confirmPassword}
  onChangeTexts={setConfirmPassword}
  secureTextEntry={secureText}
  rightIcon={<Eyes />}
  error={confirmPasswordError}
/>
        </View>

        {/* Button */}
        <View style={[styles.section, { marginTop: hp(2) }]}>
          <AuthButtton title={'Sign Up'} onPress={handleSignup} />

          {/* 🔥 Loading Indicator */}
          {loading && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color={theme.darkText} />
            </View>
          )}
        </View>

        {/* Google */}
        <View style={[styles.section, { marginTop: hp(2) }]}>
          <GoogleButton />
        </View>

        {/* Footer */}
       <View style={[styles.footerRow, { marginTop: hp(3), marginBottom: hp(2) }]}>
          <Text style={authstyle.subtitle}>Already have an account?</Text>

          <TouchableOpacity
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="login"
            accessibilityHint="Goes to login screen"
            onPress={() => navigation.goBack()}
          >
            <Text style={[authstyle.title, { color: theme.darkText }]}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
    </ScrollView>
  </KeyboardAvoidingView>
</SafeAreaView>
   
  );
};

export default Signup;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
  flexGrow: 1,
},
  section: {
    width: '100%',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 3,
    width: '100%',
  },
  loaderContainer: {
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
