import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import font from '../../style/font';
import ButtonComponent from '../../../shared/components/ButtonComponent';
import Back from '../../../assets/svg/Back.svg';
import Backwhite from '../../../assets/svg/Backwhite.svg';
import { useResponsive } from '../../../shared/hooks/responsive';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { NavigationTypeCheckOut } from '../types/screentype';
import { RootStackParamList } from '../../../shared/types/stackNavigation.type';
import Edit from '../../../assets/svg/Edit.svg';
import Phone from '../../../assets/svg/Phone.svg';
import Email from '../../../assets/svg/Email.svg';
import Emailwhite from '../../../assets/svg/Emailwhite.svg';
import Phonewhite from '../../../assets/svg/Phonewhite.svg';
import Downarrow from '../../../assets/svg/Downarrow.svg';
import Paypal from '../../../assets/svg/Paypal.svg';
import UpdateModal from '../components/Updatemodal';
import SuccessModal from '../components/Successmodal';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '../../../shared/hooks/theme';
import { cartStore } from '../services/cartStore';
import { saveCartToStorage } from '../services/cartStorage';
import { useDispatch } from 'react-redux';
import { clearCart } from '../redux/cartSlice';
import { getProfile } from '../../user/services/profile.services';
import { removeToken } from '../../../shared/services/token';
import { validateEmail } from '../../auth/services/auth.validation';

type Props = {
  route: RouteProp<RootStackParamList, 'Checkout'>;
};

const Checkout = ({ route }: Props) => {
  const price = route.params.price;
  const { wp, hp } = useResponsive();
  const navigation = useNavigation<NavigationTypeCheckOut>();
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [phoneModalVisible, setPhoneModalVisible] = useState(false);
  const [addressModalVisible, setAddressModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const dispatch = useDispatch();
const ADDRESS_MAX_LENGTH = 120;
const PHONE_MAX_LENGTH = 10;
const EMAIL_MAX_LENGTH = 50;
  const setData = async () => {
    try {
      const res = await getProfile();
      if (!res) {
        Alert.alert('Error', 'Unable to fetch profile data.');
        return;
      }

      const user = res?.data?.user;
      if (user) {
        setEmail(user.email || '');
        setPhone(user.phone || '');
        setAddress(user.address || '');
      } else {
        Alert.alert(
          'User Not Found',
          'User data not found for setting checkout information.',
        );
      }
    } catch (error: any) {
      console.error('setData error:', error?.message);
    }
  };
  const payout = async () => {
    try {
     const trimmedEmail = email.trim();
const trimmedPhone = phone.trim();
const trimmedAddress = address.trim();

if (!trimmedEmail || !trimmedPhone || !trimmedAddress) {
  Alert.alert(
    'Payment failed',
    'Please fill in all contact and address details.',
  );
  return;
}

if (trimmedAddress.length > ADDRESS_MAX_LENGTH) {
  Alert.alert(
    'Payment failed',
    `Address must be under ${ADDRESS_MAX_LENGTH} characters.`,
  );
  return;
}

if (trimmedPhone.length > PHONE_MAX_LENGTH) {
  Alert.alert(
    'Payment failed',
    `Address must be under ${PHONE_MAX_LENGTH} characters.`,
  );
  return;
}

if (trimmedEmail.length > EMAIL_MAX_LENGTH) {
  Alert.alert(
    'Payment failed',
    `Address must be under ${EMAIL_MAX_LENGTH} characters.`,
  );
  return;
}


      if (price?.total === 0) {
        Alert.alert('Payment failed', 'Total price cannot be zero.');
        return;
      }
      const message=validateEmail(trimmedEmail);
      if(message){
        Alert.alert('Payment failed', message);
        return;
      }
      if (!/^(?:\+91|0)?[6789]\d{9}$/.test(trimmedPhone)) {
        Alert.alert(
          'Payment failed',
          'Please enter a valid 10-digit phone number.',
        );
        return;
      }

      const storeData = await cartStore(trimmedEmail,trimmedPhone,trimmedAddress);

      if (storeData?.success) {
        setShowSuccess(true);
        await saveCartToStorage([]);
        dispatch(clearCart());
      } else {
        Alert.alert(
          'Payment failed',
          storeData?.message || 'Data not stored in database.',
        );
      }
    } catch (error: any) {
      console.error(
        'payout error:',
        error?.response?.data || error?.message || error,
      );
      Alert.alert(
        'Payment failed',
        error?.response?.data?.message ||
          error?.message ||
          'Something went wrong',
      );
    }
  };

  useEffect(() => {
    setData();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View
          style={[
            styles.header,
            { paddingHorizontal: wp(4), marginVertical: hp(2) },
          ]}
        >
          <ButtonComponent
            accessibilityLabel="Go back"
            accessibilityHint="Returns to the previous screen"
            onPress={() => navigation.goBack()}
          >
            {theme.theme == 'light' ? <Back /> : <Backwhite />}
          </ButtonComponent>

          <Text style={[styles.title, { fontSize: wp(4.2) }]}>Checkout</Text>

          <View style={{ width: wp(8) }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: wp(4),
            paddingBottom: hp(25),
          }}
        >
          <View style={styles.mainCard}>
            <Text style={styles.sectionTitle}>Contact Information</Text>

            <View style={styles.card}>
              <View style={styles.row}>
                <View style={styles.iconBox}>
                  {theme.theme == 'light' ? <Email /> : <Emailwhite />}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.text}>
                    {email || 'e.g. name@example.com'}
                  </Text>
                  <Text style={styles.subText}>Email</Text>
                </View>
                <TouchableOpacity
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="email edit icon"
                  accessibilityHint="Opens email editor"
                  onPress={() => setEmailModalVisible(true)}
                >
                  <Edit />
                </TouchableOpacity>
              </View>

              <View style={[styles.row, { marginBottom: 0 }]}>
                <View style={styles.iconBox}>
                  {theme.theme == 'light' ? <Phone /> : <Phonewhite />}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.text}>{phone || 'e.g. 9724356789'}</Text>
                  <Text style={styles.subText}>Phone</Text>
                </View>
                <TouchableOpacity
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="phone edit icon"
                  accessibilityHint="Opens phone editor"
                  onPress={() => setPhoneModalVisible(true)}
                >
                  <Edit />
                </TouchableOpacity>
              </View>
            </View>

            <Text style={styles.sectionTitle}>Address</Text>

            <View style={styles.card}>
              <View style={styles.rowBetween}>
                <Text style={styles.text}>
                  {address || 'e.g. 123 Main St, City, Country'}
                </Text>
                <TouchableOpacity
                  accessible={true}
                  accessibilityRole="button"
                  accessibilityLabel="address edit icon"
                  accessibilityHint="Opens address editor"
                  onPress={() => setAddressModalVisible(true)}
                >
                  <Edit />
                </TouchableOpacity>
              </View>

              <Image
                accessible={true}
                accessibilityRole="image"
                accessibilityLabel="Delivery address map preview"
                source={require('../../../assets/image/Map.png')}
                style={styles.map}
              />
            </View>

            <Text style={styles.sectionTitle}>Payment Method</Text>

            <TouchableOpacity
              accessible={true}
              accessibilityRole="button"
              accessibilityLabel="payment method selector"
              accessibilityHint="Selects payment method"
              style={styles.card}
              activeOpacity={0.8}
              onPress={() => {
                Alert.alert(
                  'Payment Method',
                  'Payment integration is not available yet.',
                );
              }}
            >
              <View style={styles.rowBetween}>
                <View style={styles.row}>
                  <View style={styles.iconBox}>
                    <Paypal />
                  </View>
                  <View>
                    <Text style={styles.text}>Add Payment</Text>
                    <Text style={styles.subText}>Select a payment method</Text>
                  </View>
                </View>
                <Downarrow />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View style={[styles.summary, { padding: wp(4) }]}>
          <Row
            label="Subtotal"
            value={`₹${price?.subtotal?.toFixed(2)}`}
            theme={theme}
          />
          {price?.subtotal > 0 ? (
            <Row
              label="Shipping"
              value={`₹${price?.shopping?.toFixed(2)}`}
              theme={theme}
            />
          ) : (
            <Row label="Shipping" value={`₹0.00`} theme={theme} />
          )}
          <View style={styles.dividerContainer}>
            {Array.from({ length: 25 }).map((_, i) => (
              <View key={i} style={styles.dash} />
            ))}
          </View>

          <Row
            label="Total Cost"
            value={`₹${price?.total?.toFixed(2)}`}
            bold
            theme={theme}
          />

          <TouchableOpacity
            accessible={true}
            accessibilityRole="button"
            accessibilityLabel="payment button"
            accessibilityHint="Starts payment"
            style={[styles.checkout, { marginTop: hp(1.5) }]}
            onPress={() => payout()}
          >
            <Text style={[styles.checkoutText, { fontSize: wp(4) }]}>
              Payment
            </Text>
          </TouchableOpacity>
        </View>

        <UpdateModal
          visible={emailModalVisible}
          type="email"
          value={email}
          onClose={() => setEmailModalVisible(false)}
          onSubmit={(val: string) => setEmail(val.trim())}
        />

        <UpdateModal
          visible={phoneModalVisible}
          type="phone"
          value={phone}
          onClose={() => setPhoneModalVisible(false)}
          onSubmit={(val: string) => setPhone(val.trim())}
        />

        <UpdateModal
          visible={addressModalVisible}
          type="address"
          value={address}
          onClose={() => setAddressModalVisible(false)}
onSubmit={(val: string) =>
  setAddress(val.trim().slice(0, ADDRESS_MAX_LENGTH))
}
        />

        <SuccessModal visible={showSuccess} />
      </View>
    </SafeAreaView>
  );
};

const Row = ({
  label,
  value,
  bold = false,
  theme,
}: {
  label: string;
  value: string;
  bold?: boolean;
  theme: ReturnType<typeof useAppTheme>;
}) => {
  return (
    <View style={rowStyles.row}>
      <Text
        style={[
          rowStyles.rowText,
          { color: '#707B81' },
          bold && rowStyles.bold,
        ]}
      >
        {label}
      </Text>
      <Text
        style={[
          rowStyles.rowText,
          { color: theme.darkText },
          bold && rowStyles.bold,
        ]}
      >
        {value}
      </Text>
    </View>
  );
};

export default Checkout;

const createStyles = (theme: ReturnType<typeof useAppTheme>) =>
  StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: theme.background,
    },

    container: {
      flex: 1,
      backgroundColor: theme.background,
    },

    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    title: {
      fontFamily: font.airmedium,
      color: theme.darkText,
    },

    mainCard: {
      backgroundColor: theme.white,
      padding: 15,
      borderRadius: 20,
    },

    summary: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      backgroundColor: theme.white,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      elevation: 15,
    },

    rowBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 6,
    },

    row: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      marginBottom: 15,
    },

    dividerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: 10,
    },

    dash: {
      width: 8,
      height: 1,
      backgroundColor: theme.mode === 'dark' ? '#4B5563' : '#ccc',
    },

    checkout: {
      backgroundColor: '#5B9EE1',
      paddingVertical: 14,
      borderRadius: 30,
      alignItems: 'center',
    },

    checkoutText: {
      color: theme.white,
      fontFamily: font.airbold,
    },

    sectionTitle: {
      fontSize: 14,
      marginVertical: 10,
      fontFamily: font.airmedium,
      color: theme.darkText,
    },

    card: {
      backgroundColor: theme.white,
      borderRadius: 15,
      marginVertical: 10,
      padding: 12,
    },

    iconBox: {
      width: 40,
      height: 40,
      backgroundColor: theme.background,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },

    text: {
      fontSize: 14,
      fontFamily: font.airlight,
      color: theme.darkText,
    },

    subText: {
      fontSize: 12,
      color: theme.mode === 'dark' ? '#A0A7AD' : '#888',
      fontFamily: font.airlight,
    },

    map: {
      width: '100%',
      height: 120,
      borderRadius: 12,
      marginTop: 10,
    },
  });

const rowStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  rowText: {
    fontFamily: font.airmedium,
  },

  bold: {
    fontFamily: font.airbold,
  },
});
