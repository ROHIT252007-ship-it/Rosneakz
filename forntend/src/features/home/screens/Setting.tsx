import { StyleSheet, Text, View, TouchableOpacity, Switch } from 'react-native';
import React, { useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useResponsive } from '../../../shared/hooks/responsive';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootDarwerParamList } from '../../../shared/types/drawerNavigation.type';
import ButtonComponent from '../../../shared/components/ButtonComponent';
import Back from '../../../assets/svg/Back.svg';
import Backwhite from '../../../assets/svg/Backwhite.svg';
import Right from '../../../assets/svg/Rightarrow.svg';
import Notification from '../../../assets/svg/Notification.svg';
import Location from '../../../assets/svg/Shopping.svg';
import Delete from '../../../assets/svg/Delete.svg';
import Payment from '../../../assets/svg/Payment.svg';
import {useThemeContext} from '../../../shared/hooks/theme';
import { useAppTheme } from '../../../shared/hooks/theme';
import font from '../../style/font';
import { useToast } from '../../../shared/components/ToastProvider';
import CustomSwitch from '../components/Switch';

const Setting = () => {
  const { wp, hp } = useResponsive();
  const navigation = useNavigation<DrawerNavigationProp<RootDarwerParamList>>();

  const [faceId, setFaceId] = useState(false);
  const [push, setPush] = useState(true);
  const [location, setLocation] = useState(true);
  // const [dark, setDark] = useState(false);
  const { showSuccess } = useToast();
  const {theme, mode, toggleTheme} = useThemeContext();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const Row = ({ icon, title }: any) => (
    <TouchableOpacity
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`${title} setting`}
      accessibilityHint={`Opens ${title}`}
      style={styles.row}
      onPress={() => showSuccess(title)}
    >
      <View style={styles.left}>
        {icon}
        <Text style={styles.rowText}>{title}</Text>
      </View>
      <Text style={styles.arrow}>
        <Right />
      </Text>
    </TouchableOpacity>
  );

  const SwitchRow = ({ title, value, onChange }: any) => (
    <View style={styles.row}>
      <Text style={styles.rowText}>{title}</Text>
      {/* <Switch
        accessible={true}
        accessibilityRole="switch"
        accessibilityLabel={title}
        accessibilityHint={`Turns ${title.toLowerCase()} ${
          value ? 'off' : 'on'
        }`}
        accessibilityValue={{ text: value ? 'On' : 'Off' }}
        value={value}
        onValueChange={onChange}
        trackColor={{
          false: theme.white,
          true: '#5B9EE1',
        }}
          style={{
    transform: [{ scaleX: 1.7 }, { scaleY: 1.7 }],
  }}
        thumbColor="#fff"
      /> */}
      <CustomSwitch
      value={value}
      onChange={onChange}
      theme={theme}
    />
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* ================= HEADER ================= */}
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

          <Text style={[styles.title, { fontSize: wp(4.5) }]}>
            Account & Settings
          </Text>

          <View style={{ width: wp(8) }} />
        </View>

        <View style={{ padding: 16 }}>
          <Text style={styles.section}>Account</Text>

          <View style={styles.card}>
            <Row icon={<Notification />} title="Notification Setting" />
            <View style={styles.divider} />

            <Row icon={<Location />} title="Shipping Address" />
            <View style={styles.divider} />

            <Row icon={<Payment />} title="Payment Info" />
            <View style={styles.divider} />

            <Row icon={<Delete />} title="Delete Account" />
             <View style={styles.divider} />
          </View>

          {/* ================= APP SETTINGS ================= */}
          <Text style={[styles.section, { marginTop: hp(3) }]}>
            App Settings
          </Text>

          <View style={styles.card}>
            <SwitchRow
              title="Enable Face ID For Log In"
              value={faceId}
              onChange={setFaceId}
            />
            <View style={styles.divider} />

            <SwitchRow
              title="Enable Push Notifications"
              value={push}
              onChange={setPush}
            />
            <View style={styles.divider} />

            <SwitchRow
              title="Enable Location Services"
              value={location}
              onChange={setLocation}
            />
            <View style={styles.divider} />

           <SwitchRow
  title="Dark Mode"
  value={mode === 'dark'}
  onChange={toggleTheme}
/>
<View style={styles.divider} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Setting;

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

    section: {
      fontSize: 18,
      fontFamily: font.airbold,
      color: theme.darkText,
      marginBottom: 12,
    },

    card: {
      backgroundColor: theme.background,
    },

    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 55,
    },

    left: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },

    rowText: {
      fontSize: 15,
      fontFamily: font.airmedium,
      color: theme.darkText,
    },

    arrow: {
      fontSize: 18,
      color: theme.darkText,
    },

    divider: {
      height: .8,
      backgroundColor: theme.mode === 'dark' ? '#161F28' : '#E0E0E0',
    },
  });
