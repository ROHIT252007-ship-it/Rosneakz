import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  PermissionsAndroid,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Back from '../../../assets/svg/Back.svg';
import Backwhite from '../../../assets/svg/Backwhite.svg';
import ButtonComponent from '../../../shared/components/ButtonComponent';
import font from '../../style/font';
import Edit from '../../../assets/svg/Editblue.svg';
import Camera from '../../../assets/svg/Camera.svg';
import { useNavigation } from '@react-navigation/native';
import { NavigationTypeProfile } from '../types/screentype';
import Buttombar from '../../../shared/components/Buttombar';
import { URL } from '@env';
import {
  launchImageLibrary,
  ImageLibraryOptions,
  Asset,
} from 'react-native-image-picker';
import { useAppTheme } from '../../../shared/hooks/theme';
import { getProfile, updateUser } from '../services/profile.services';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import { saveCartToStorage } from '../../cart/services/cartStorage';
import { clearCart } from '../../cart/redux/cartSlice';
import { removeToken } from '../../../shared/services/token';
import { useDispatch } from 'react-redux';
import { useResponsive } from '../../../shared/hooks/responsive';
import { showError } from '../../../shared/utils/showError';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const Profile = () => {
  const navigation = useNavigation<NavigationTypeProfile>();
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [lodingProfile, setLoadingProfile] = useState(true);
  const { wp } = useResponsive();
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await getProfile();

      if (!res) {
        Alert.alert('Error', 'Unable to fetch profile data.');
        return;
      }

      const user = res?.data?.user;
      if (user) {
        setName(user.name || '');
        setEmail(user.email || '');
        setImage(user.image || null);
      }
    } catch (error) {
      showError('Error', error instanceof Error ? error.message : 'Unknown error');
    } finally {
      setLoadingProfile(false);
    }
  };

  const requestPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const permission =
          Platform.Version >= 33
            ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
            : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

        const granted = await PermissionsAndroid.request(permission);
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
    } catch (error) {
      showError('Permission error:', error instanceof Error ? error.message : 'Unknown error');
      Alert.alert('Error', 'Failed to request permission');
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    try {
      const hasPermission = await requestPermission();

      if (!hasPermission) {
        Alert.alert('Permission denied', 'Please allow gallery permission');
        return;
      }
      const options: ImageLibraryOptions = {
        mediaType: 'photo',
        quality: 0.8,
        selectionLimit: 1,
      };

      launchImageLibrary(options, res => {
        if (res.didCancel) {
          return;
        }

        if (res.errorCode) {
          Alert.alert('Error', res.errorMessage || 'Failed to pick image');
          return;
        }

        if (!res.assets || res.assets.length === 0) {
          Alert.alert('Error', 'No image selected');
          return;
        }

        const asset: Asset = res.assets[0];

        if (asset.fileSize && asset.fileSize > MAX_IMAGE_SIZE) {
          Alert.alert(
            'Image too large',
            'Please select an image smaller than 2MB',
          );
          return;
        }

        if (!asset.uri) {
          Alert.alert('Error', 'Invalid image selected');
          return;
        }

        setSelectedImage(asset.uri);
      });
    } catch (error) {
      showError('Image picker error:', error instanceof Error ? error.message : 'Unknown error');
    }
  };

  const getProfileImage = () => {
    if (selectedImage) {
      return { uri: selectedImage };
    }

    if (image && typeof image === 'string') {
      const safePath = image
        .split('/')
        .map(part => encodeURIComponent(part))
        .join('/');

      return { uri: `${URL}/${safePath}` };
    }

    return require('../../../assets/image/Profile.png');
  };

  const updateProfile = async () => {
    try {
      if (!name.trim()) {
        Alert.alert('Validation Error', 'Please enter your name');
        return;
      }

      setLoading(true);

      const updatedData = await updateUser(
        name.trim(),
        selectedImage || undefined,
      );
      if (!updatedData) {
        Alert.alert('Error', 'Unable to fetch profile data.');
        return;
      }

      if (updatedData?.success) {
        Alert.alert(
          'Success',
          updatedData.message || 'Profile updated successfully',
        );

        setEdit(false);
        setSelectedImage(null);
        await loadProfile();
      } else {
        Alert.alert(
          'Error',
          updatedData?.message || 'Failed to update profile',
        );
      }
    } catch (error: any) {
      console.error('updateUser error:', error?.response?.data);
      console.error('updateUser message:', error?.message);
      console.error('updateUser full error:', error);

      Alert.alert(
        'Error',
        error?.response?.data?.message ||
          error?.message ||
          'Failed to update profile',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.main}>
        <View style={[styles.header, { padding: wp(4) }]}>
          <ButtonComponent
            accessibilityLabel="Go back"
            accessibilityHint="Returns to the previous screen"
            onPress={() => navigation.goBack()}
          >
            {theme.theme === 'light' ? <Back /> : <Backwhite />}
          </ButtonComponent>

          <Text style={styles.title}>Profile</Text>

          <TouchableOpacity
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel={
              edit ? 'Cancel profile editing' : 'Edit profile'
            }
            accessibilityHint={
              edit
                ? 'Discards unsaved profile changes'
                : 'Enables profile editing'
            }
            accessibilityState={{ selected: edit }}
            onPress={() => {
              if (edit) {
                setEdit(false);
                setSelectedImage(null);
                loadProfile();
              } else {
                setEdit(true);
              }
            }}
          >
            <Edit width={24} height={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <TouchableOpacity
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="Change profile picture"
            accessibilityHint={
              edit
                ? 'Opens image picker'
                : 'Enable edit mode before changing picture'
            }
            accessibilityState={{ disabled: !edit }}
            disabled={!edit}
            onPress={pickImage}
            style={styles.imageWrapper}
            activeOpacity={0.9}
          >
            {lodingProfile ? (
              <ShimmerPlaceholder
                LinearGradient={LinearGradient}
                shimmerColors={
                  theme.theme == 'light'
                    ? ['#E1E9EE', '#F2F8FC', '#E1E9EE']
                    : ['#2A2E32', '#3B3F44', '#2A2E32']
                }
                style={styles.image}
              />
            ) : (
              <Image
                accessible={false}
                source={getProfileImage()}
                style={styles.image}
              />
            )}
            {edit && (
              <View style={styles.editBadge}>
                <Camera />
              </View>
            )}
          </TouchableOpacity>
          <View style={styles.form}>
            <Text style={styles.label}>Full Name</Text>
            <View style={styles.inputContainer}>
              <TextInput
                accessibilityLabel="Full name"
                accessibilityHint="Enter your name"
                accessibilityState={{ disabled: !edit }}
                style={styles.input}
                value={name}
                onChangeText={setName}
                editable={edit}
                placeholder="Enter name"
                placeholderTextColor={
                  theme.mode === 'dark' ? '#A0A7AD' : '#999'
                }
              />
            </View>

            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputContainer}>
              <TextInput
                accessibilityLabel="Email address"
                accessibilityHint="Shows your email address"
                accessibilityState={{ disabled: true }}
                style={styles.input}
                value={email}
                editable={false}
                placeholder="enter a email"
              />
            </View>

            {edit && (
              <TouchableOpacity
                accessible={true}
                accessibilityRole="button"
                accessibilityLabel={loading ? 'Saving profile' : 'Save profile'}
                accessibilityHint="Saves profile changes"
                accessibilityState={{ disabled: loading }}
                style={[styles.saveBtn, loading && { opacity: 0.6 }]}
                onPress={updateProfile}
                disabled={loading}
              >
                <Text style={styles.saveText}>
                  {loading ? 'Saving...' : 'Save'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {!edit && <Buttombar />}
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const createStyles = (theme: ReturnType<typeof useAppTheme>) =>
  StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: theme.background,
    },
    main: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    title: {
      fontSize: 18,
      fontFamily: font.airmedium,
      color: theme.darkText,
    },
    container: {
      alignItems: 'center',
      marginTop: 20,
    },
    imageWrapper: {
      position: 'relative',
      marginBottom: 30,
    },
    image: {
      width: 120,
      height: 120,
      borderRadius: 60,
    },
    editBadge: {
      position: 'absolute',
      bottom: -15,
      right: 47,
      backgroundColor: '#5B9EE1',
      padding: 8,
      borderRadius: 30,
    },
    form: {
      width: '90%',
    },
    label: {
      fontSize: 14,
      marginBottom: 6,
      fontFamily: font.airmedium,
      color: theme.darkText,
    },
    inputContainer: {
      backgroundColor: theme.white,
      borderRadius: 30,
      paddingHorizontal: 20,
      height: 55,
      justifyContent: 'center',
      marginBottom: 15,
    },
    input: {
      fontSize: 16,
      fontFamily: font.airblack,
      color: theme.darkText,
    },
    saveBtn: {
      marginTop: 10,
      backgroundColor: '#5B9EE1',
      paddingVertical: 14,
      borderRadius: 30,
      alignItems: 'center',
    },
    saveText: {
      color: '#fff',
      fontSize: 16,
      fontFamily: font.airmedium,
    },
  });
