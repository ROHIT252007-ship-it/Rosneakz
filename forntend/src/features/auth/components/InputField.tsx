import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useMemo } from 'react';
import font from '../../style/font';
import { useAppTheme } from '../../../shared/hooks/theme';

type Props = {
  label?: string;
  placeholder?: string;
  values: string;
  onChangeTexts: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onFocus?: () => void;
  accessibilityLabel?: string;
  accessibilityHint?: string;
};

const InputField = ({
  label,
  placeholder,
  values,
  onChangeTexts,
  secureTextEntry,
  error,
  leftIcon,
  rightIcon,
  onFocus,
  accessibilityLabel,
  accessibilityHint,
}: Props) => {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View style={styles.inputContainer}>
        {leftIcon && <View style={styles.lefticon}>{leftIcon}</View>}

        <TextInput
          accessibilityLabel={accessibilityLabel || label || placeholder}
          accessibilityHint={
            accessibilityHint || `Enter ${label || placeholder || 'text'}`
          }
          accessibilityState={{ disabled: false }}
          style={styles.input}
          placeholder={placeholder}
          value={values}
          onChangeText={onChangeTexts}
          secureTextEntry={secureTextEntry}
          placeholderTextColor={theme.mode === 'dark' ? '#A0A7AD' : '#999'}
          onFocus={onFocus}
        />

        {rightIcon && <View style={styles.icon}>{rightIcon}</View>}
      </View>

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

export default InputField;

const createStyles = (theme: ReturnType<typeof useAppTheme>) =>
  StyleSheet.create({
    container: {
      marginTop: 3,
      marginBottom: 15,
    },

    label: {
      fontFamily: font.airmedium,
      marginBottom: 8,
      fontSize: 16,
      color: theme.darkText,
    },

    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 30,
      paddingHorizontal: 20,
      height: 60,
      minHeight: 44,
      backgroundColor: theme.white,
    },

    input: {
      flex: 1,
      fontSize: 16,
      fontFamily: font.airblack,
      color: theme.darkText,
    },

    lefticon: {
      marginHorizontal: 10,
    },

    icon: {
      marginHorizontal: 5,
    },

    error: {
      color: 'red',
      fontSize: 14,
      marginTop: 7,
      marginLeft: 5,
      fontFamily: font.airmedium,
    },
  });
