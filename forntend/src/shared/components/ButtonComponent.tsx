import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useResponsive } from '../hooks/responsive';
import { useAppTheme } from '../hooks/theme';

type Props = {
  children: React.ReactNode;
  onPress?: () => void;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  disabled?: boolean;
};

const ButtonComponent = ({
  children,
  onPress,
  accessibilityLabel = 'Action button',
  accessibilityHint = 'Performs this action',
  disabled = false,
}: Props) => {
  const { wp } = useResponsive();
  const theme = useAppTheme();
  const btnSize = wp(13);

  return (
    <TouchableOpacity
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.7}
      style={[
        styles.container,
        {
          width: btnSize,
          height: btnSize,
          borderRadius: btnSize / 2,
          backgroundColor: theme.white,
        },
      ]}
    >
      {children}
    </TouchableOpacity>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({
  container: {
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
