import { View, StyleSheet, Text, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useResponsive } from '../../../shared/hooks/responsive';
import LinearGradient from 'react-native-linear-gradient';
import fonts from '../../style/font';
import onBoradData from '../data/onBoarding.data';
import { onBroadingType, NavigationType } from '../type/onBroading.type';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '../../../shared/hooks/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getToken } from '../../../shared/services/token';
import SplashScreen from '../../home/screens/Splash';
import { showError } from '../../../shared/utils/showError';
const Onboard = () => {
    const { wp, hp, font } = useResponsive();
    const size = wp(100);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<NavigationType>();
    const screenData: onBroadingType = onBoradData[currentIndex];
  const checkOnboarded = async () => {
  try {
    const [token, onboarded] = await Promise.all([
      getToken(),
      AsyncStorage.getItem('onboarded'),
    ]);

    if (token) {
      navigation.replace('Drawer');
      return;
    }

    if (onboarded === 'true') {
      navigation.replace('Login');
      return;
    }
    setLoading(false);
  } catch (error) {
    showError('Error', error instanceof Error ? error.message : 'Unknown error');
    setLoading(false);
  }
};
    useEffect(() => {
        checkOnboarded();
    }, []);
    const handleSkip = async () => {
    try {
        await AsyncStorage.setItem("onboarded", "true");
        navigation.replace("Login");
    } catch (error) {
        showError("Skip Error", error instanceof Error ? error.message : 'Unknown error');
    }
};
    const indexPlus = async () => {
        try{

            if (currentIndex < onBoradData.length - 1) {
                setCurrentIndex(prev => prev + 1);
            } else {
                await AsyncStorage.setItem("onboarded", "true");
                navigation.replace("Login");
            }
        } catch (error) {
            showError('Error', error instanceof Error ? error.message : 'Unknown error');
        }
    };
    const theme = useAppTheme();
    if (loading) {
        return (
            <SplashScreen />
        );
    }
    return (
        <View style={[styles.containerback, { backgroundColor: theme.background, }]}>

<View style={styles.skipContainer}>
    <TouchableOpacity 
           accessible={true}
           accessibilityRole="button"
  accessibilityLabel="skip button"
  accessibilityHint="Skips onboarding and goes to login"
    onPress={handleSkip}>
        <Text style={styles.skipText}>
            Skip 
        </Text>
    </TouchableOpacity>
</View>
            <LinearGradient
                colors={['#C0E0FF', '#E2F3F9']}
                style={[
                    styles.gradient,
                    {
                        width: size,
                        height: size,
                        borderRadius: size / 2,
                        top: -hp(20),
                        right: -hp(20),
                        opacity: 0.4
                    },
                ]}
            >
                <View style={[styles.innerCircle, { backgroundColor: theme.background, }]} />
            </LinearGradient>

            <View style={{ marginTop: hp(8), width: wp(90) }}>


                <View style={{ alignItems: 'center', height: hp(50), marginTop: wp(0) }}>


                    <View style={styles.nikeimage}>
                        <Image
                            accessible={false}
                            source={require('../../../assets/image/nike-back.png')}
                            style={{
                                width: wp(90),
                                height: hp(50),
                                resizeMode: 'contain'
                            }}
                        />
                    </View>


                    <View style={styles.bootimage}>
                        <Image
                            accessible={true}
                            accessibilityRole="image"
                            accessibilityLabel={`${screenData.firstText} illustration`}
                            source={screenData.image}
                            style={{
                                width: wp(90),
                                height: hp(60),
                                resizeMode: 'contain'
                            }}
                        />
                    </View>


                    <View style={styles.dotimage}>
                        <Image
                            accessible={false}
                            source={require('../../../assets/image/dots.png')}
                            style={{
                                width: wp(90),
                                height: hp(60),
                                resizeMode: 'contain'
                            }}
                        />
                    </View>
                </View>

                {/* Text */}
                <View style={{ marginTop: hp(4) }}>
                    <Text style={[styles.maintext, { color: theme.darkText, fontSize: font(33) }]}>
                        {screenData.firstText}
                    </Text>

                    <Text style={styles.secondtext}>
                        {screenData.secondText}
                    </Text>
                </View>

                {/* Bottom */}
                <View style={[styles.bottomRow, { marginTop: wp(20) }]}>

                    {/* Dots */}
                    <View style={styles.dotsContainer}>
                        {onBoradData.map((item, index) => (
                            <View
                                key={item.id}
                                style={[
                                    styles.dot,
                                    {
                                        width: currentIndex === index ? wp(8) : wp(2),
                                        backgroundColor:
                                            currentIndex === index
                                                ? '#4A90E2'
                                                : '#E5EEF7',
                                    },
                                ]}
                            />
                        ))}
                    </View>

                    {/* Button */}
                    <TouchableOpacity 
                           accessible={true}
           accessibilityRole="button"
  accessibilityLabel="next button"
  accessibilityHint="Goes to next step or login screen"
                    style={styles.btn} onPress={indexPlus}>
                        <Text style={[styles.btntext, { color: theme.white, }]}>
                            {
                                currentIndex === onBoradData.length - 1
                                    ? "Get Started"
                                    : "Next"
                            }
                        </Text>
                    </TouchableOpacity>

                </View>

            </View>
        </View>
    );
};

export default Onboard;

const styles = StyleSheet.create({
    containerback: {
        flex: 1,
        alignItems: 'center',

    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gradient: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    },

    innerCircle: {

        width: '60%',
        height: '60%',
        borderRadius: 999,
    },



    nikeimage: {
        alignItems: 'center',
    },

    bootimage: {
        position: 'absolute',
        top: 40,
    },

    dotimage: {
        position: 'absolute',
    },

    maintext: {
        fontFamily: fonts.airmedium,
    },

    secondtext: {
        fontFamily: fonts.airblack,
        fontSize: 16,
        color: "#9d9d9d",
        marginTop: 10,
    },

    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    dotsContainer: {
        flexDirection: 'row',
    },

    dot: {
        height: 6,
        borderRadius: 10,
        marginRight: 6,
    },

    btn: {
        paddingHorizontal: 30,
        paddingVertical: 16,
        borderRadius: 30,
        backgroundColor: '#5B9EE1',
    },

    btntext: {
        fontSize: 16,
        fontFamily: fonts.airmedium,

    },
    skipContainer: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
},

skipText: {
    fontSize: 18,
    fontFamily: fonts.airmedium,
    color: '#5B9EE1',
},
});
