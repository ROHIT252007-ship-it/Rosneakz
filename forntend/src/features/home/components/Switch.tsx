import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

type Props = {
  value: boolean;
  onChange: (value: boolean) => void;
  theme: any; // better: AppTheme type use karo
};

const CustomSwitch = ({ value, onChange, theme }: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      onPress={() => onChange(!value)}
      style={[
        styles.switchTrack,
        {
          backgroundColor: value ? '#5B9EE1' : theme.mode=='dark'?'#161F28' : '#E4E4E4',
        },
      ]}
    >
      <View
        style={[
          styles.switchThumb,
          {
            alignSelf: value ? 'flex-end' : 'flex-start',
          },
        ]}
      />
    </TouchableOpacity>
  );
};

export default CustomSwitch;

const styles = StyleSheet.create({
  switchTrack: {
    width: 58,
    height: 32,
    borderRadius: 20,
    padding: 3,
    justifyContent: 'center',
  },

  switchThumb: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
  },
});