import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { useResponsive } from '../../../shared/hooks/responsive';
import font from '../../style/font';
import { useAppTheme } from '../../../shared/hooks/theme';

type Props = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
};

const AuthButtton = ({ title, onPress, disabled = false }: Props) => {
  const { wp, hp } = useResponsive();
  const theme = useAppTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityHint="Submits this form"
      accessibilityState={{ disabled }}
      style={[
        styles.container,
        {
          width: wp(90),
          height: hp(6),
          borderRadius: wp(90) / 2,
        },
      ]}
    >
      <Text style={[styles.btntext, { color: theme.white }]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default AuthButtton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#5B9EE1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btntext: {
    fontFamily: font.airmedium,
    fontSize: 18,
  },
});
