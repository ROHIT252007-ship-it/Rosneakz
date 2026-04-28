import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      
      <View style={styles.center}>
        <Image
          accessible={true}
          accessibilityRole="image"
          accessibilityLabel="FootFlex logo"
          source={require('../../../assets/image/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5B9EE1',
  },

  center: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: 350,
    height: 450,
  },
});
