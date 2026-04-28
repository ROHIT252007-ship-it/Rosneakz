import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Text,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import ButtonComponent from '../../../shared/components/ButtonComponent';
import Heading from '../components/Heading';
import { SafeAreaView } from 'react-native-safe-area-context';
import Back from '../../../assets/svg/Back.svg';
import InputField from '../components/InputField';
import Backwhite from '../../../assets/svg/Backwhite.svg';
import AuthButtton from '../components/AuthButton';
import { useResponsive } from '../../../shared/hooks/responsive';
import font from '../../style/font';
import { useNavigation } from '@react-navigation/native';
import { NavigationType } from '../types/navigationType';
import { useAppTheme } from '../../../shared/hooks/theme';
import Vector from '../../../assets/svg/Vector.svg';
import OpenEyes from '../../../assets/svg/OpenEyes.svg';
import Eyewhite from '../../../assets/svg/Eyewhite.svg';
import Openeyewhite from '../../../assets/svg/OpenEyeWhite.svg';
import { validateEmail, validatePassword } from '../services/auth.validation';
import { changePassword } from '../services/auth.services';
import OtpInput from '../components/OtpInput';
import { sendOtp, verifyOtp } from '../services/otp.services';
import { showError } from '../../../shared/utils/showError';

const Recovery = () => {
  const [email, setEmail] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [step, setStep] = useState<1 | 2 | 3>(1);
const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
const [otpError, setOtpError] = useState<string>('');
  const [secureText, setSecureText] = useState<boolean>(true);
  const { hp } = useResponsive();
  const navigation = useNavigation<NavigationType>();
  const theme = useAppTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const { wp } = useResponsive();
const handleContinue = async () => {
  const emailValidationError = validateEmail(email);

  if (emailValidationError) {
    setEmailError(emailValidationError);
    return;
  }

  setEmailError('');
  setLoading(true);

  try {
    const res = await sendOtp(email);

    if (res?.success) {
      setStep(2);
    } else {
      Alert.alert('Error', res?.message || 'Failed to send OTP');
    }
  } catch (error) {
    showError('Error', 'Server error while sending OTP');
  } finally {
    setLoading(false);
  }
};

const handleVerifyOtp = async () => {
  const otpValue = otp.join('');

  if (otpValue.length !== 6) {
    setOtpError('Please enter 6 digit OTP');
    return;
  }

  setOtpError('');
  setLoading(true);

  try {
    const res = await verifyOtp(email, otpValue);

    if (res?.success) {
      setStep(3);
    } else {
      Alert.alert('Error', res?.message || 'Invalid OTP');
    }
  } catch (error) {
    showError('Error', 'OTP verification failed');
  } finally {
    setLoading(false);
  }
};

  const handleResetPassword = async () => {
    const passwordError = validatePassword(newPassword);

    if (passwordError) {
      setPasswordError(passwordError);
      return;
    }

    setLoading(true);

    try {
      const chnageSuccess = await changePassword(email, newPassword);

      if (chnageSuccess) {
        navigation.replace('Login');
      } else {
        Alert.alert('Error', 'Something went wrong');
      }
    } catch (error) {
      showError('Error', 'Server error');
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
    <SafeAreaView style={styles.safeArea}>
      <View
        style={[
          styles.screenWrapper,
          { backgroundColor: theme.background, padding: wp(4) },
        ]}
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

        <View style={[styles.section, { marginTop: hp(6) }]}>
          <Heading
  title={
    step === 1
      ? 'Recovery Password'
      : step === 2
      ? 'Verify OTP'
      : 'Reset Password'
  }
  subtitle={
    step === 1
      ? 'Please Enter Your Email Address To Receive a Verification Code'
      : step === 2
      ? 'Enter the 6 digit OTP sent to your email'
      : 'Please enter your new password'
  }
/>
        </View>

        <View style={[styles.section, { marginTop: hp(6) }]}>
         {step === 1 && (
  <InputField
    label="Email Address"
    placeholder="Enter Email"
    values={email}
    onChangeTexts={setEmail}
    error={emailError}
  />
)}

{step === 2 && (
  <>
    <OtpInput otp={otp} setOtp={setOtp} />
    {otpError ? (
      <Text style={{ color: 'red', marginTop: 8 }}>{otpError}</Text>
    ) : null}
  </>
)}

{step === 3 && (
  <InputField
    label="New Password"
    placeholder="Enter New Password"
    values={newPassword}
    onChangeTexts={setNewPassword}
    secureTextEntry={secureText}
    rightIcon={<Eyes />}
    error={passwordError}
  />
)}
        </View>

        <View style={[styles.section, { marginTop: hp(3) }]}>
          <AuthButtton
  title={step === 1 ? 'Send OTP' : step === 2 ? 'Verify OTP' : 'Reset Password'}
  onPress={
    step === 1
      ? handleContinue
      : step === 2
      ? handleVerifyOtp
      : handleResetPassword
  }
/>
          {loading && (
            <View style={styles.loader}>
              <ActivityIndicator size="large" color={theme.darkText} />
            </View>
          )}
        </View>

        {step !== 1 && (
  <TouchableOpacity
    accessible={true}
    accessibilityRole="button"
    accessibilityLabel="back to email"
    accessibilityHint="Goes to email step"
    style={[styles.backToEmailWrapper, { marginTop: hp(2) }]}
    onPress={() => {
      setStep(1);
      setOtp(['', '', '', '', '', '']);
      setNewPassword('');
    }}
  >
    <Text style={[styles.backToEmailText, { color: theme.darkText }]}>
      Back to email
    </Text>
  </TouchableOpacity>
)}
      </View>
    </SafeAreaView>
  );
};

export default Recovery;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  screenWrapper: {
    flex: 1,
  },
  section: {
    width: '100%',
  },
  backToEmailWrapper: {
    alignSelf: 'center',
  },
  backToEmailText: {
    fontSize: 14,
    fontFamily: font.airmedium,
  },
  loader: {
    marginTop: 15,
    alignItems: 'center',
  },
});
