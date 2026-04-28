import React, { useRef } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

type Props = {
  otp: string[];
  setOtp: (val: string[]) => void;
};

const OtpInput = ({ otp, setOtp }: Props) => {
  const inputs = useRef<Array<TextInput | null>>([]);

  const handleChange = (text: string, index: number) => {
    if (text.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Move to next input
    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (text: string, index: number) => {
    if (!text && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View
      style={styles.container}
      accessible={true}
      accessibilityRole="text"
      accessibilityLabel="One-Time Password Input"
      accessibilityHint="Enter 6 digits. Each field accepts one digit."
    >
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={ref => {
            inputs.current[index] = ref;
          }}
          style={styles.box}
          keyboardType="numeric"
          maxLength={1}
          value={digit}
          onChangeText={text => handleChange(text, index)}
          onKeyPress={({ nativeEvent }) => {
            if (nativeEvent.key === 'Backspace') {
              handleBackspace(digit, index);
            }
          }}
          accessible={true}
          accessibilityLabel={`OTP digit ${index + 1} of 6`}
          accessibilityHint={digit ? `Current value: ${digit}` : 'Empty, enter a digit'}
          accessibilityRole="keyboardkey"
          testID={`otp-input-${index}`}
          editable={true}
          selectTextOnFocus={true}
        />
      ))}
    </View>
  );
};

export default OtpInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  box: {
    width: 50,
    height: 55,
    borderWidth: 2,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    minHeight: 48, // Minimum touch target size (WCAG)
  },
});