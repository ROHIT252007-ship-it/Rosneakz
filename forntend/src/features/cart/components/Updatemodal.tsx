import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useAppTheme } from '../../../shared/hooks/theme';
import font from '../../style/font';
import { validateEmail } from '../../auth/services/auth.validation';

type Props = {
  visible: boolean;
  type: 'email' | 'phone' | 'address';
  value: string;
  onClose: () => void;
  onSubmit: (updatedValue: string) => void;
};

const UpdateModal = ({ visible, type, value, onClose, onSubmit }: Props) => {
  const theme = useAppTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [inputValue, setInputValue] = useState(value);
  const [error, setError] = useState(''); 

  useEffect(() => {
  setInputValue(value);
  setError('');
}, [value, visible]);
const validateInput = () => {
  const value = inputValue.trim();

  if (!value) {
    return `${type === 'email' ? 'Email' : type === 'phone' ? 'Phone number' : 'Address'} is required`;
  }

  if (type === 'email') {
    const message=validateEmail(inputValue);
    if (message) {
    return message;
  }
  }

  if (type === 'phone') {
    const phoneRegex =/^(?:\+91[\-\s]?)?[6-9]\d{9}$/;

    if (!phoneRegex.test(value)) {
      return 'Please enter a valid 10-digit phone number';
    }
  }

  if (type === 'address' && value.length < 5) {
    return 'Address must be at least 5 characters';
  }

  return '';
};

 const handleSubmit = () => {
  const validationError = validateInput();

  if (validationError) {
    setError(validationError);
    return;
  }

  let safeValue = inputValue.trim();

  if (type === 'address') {
    safeValue = safeValue.slice(0, 200);
  }

  onSubmit(safeValue);
  onClose();
};

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>
            Update {type === 'email' ? 'Email' : type === 'phone' ? 'Phone Number' : 'Address'}
          </Text>

          <TextInput
          accessibilityLabel={`input for updating ${type === 'email' ? 'email' : type === 'phone' ? 'phone number' : 'address'}`}
  accessibilityHint={`Updates your ${type === 'email' ? 'email' : type === 'phone' ? 'phone number' : 'address'}`}
            style={styles.input}
            placeholder={type === 'email' ? 'Enter new email' : type === 'phone' ? 'e.g. 9876543210' : 'Enter new address'}
            placeholderTextColor={theme.mode === 'dark' ? '#A0A7AD' : '#999'}
            keyboardType={type === 'phone' ? 'phone-pad' : 'email-address'}
            value={inputValue}
            maxLength={type === "address" ? 200 : undefined}
           onChangeText={(text) => {
  setInputValue(text);
  setError('');
}}
          />
{error ? <Text style={styles.errorText}>{error}</Text> : null}
          <View style={styles.buttons}>
            <TouchableOpacity 
                   accessible={true}
           accessibilityRole="button"
  accessibilityLabel="submit updated information"
  accessibilityHint="Saves changes and closes modal"
            style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity
                   accessible={true}
           accessibilityRole="button"
  accessibilityLabel="cancel update"
  accessibilityHint="Discards changes and closes modal"
              style={[styles.button, styles.cancel]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default UpdateModal;

const createStyles = (theme: ReturnType<typeof useAppTheme>) =>
  StyleSheet.create({
    modalBackground: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },

    modalContainer: {
      width: '85%',
      backgroundColor: theme.white,
      borderRadius: 15,
      padding: 20,
    },

    title: {
      fontSize: 18,
      fontFamily: font.airbold,
      marginBottom: 12,
      color: theme.darkText,
    },

    input: {
      borderWidth: 1,
      borderColor: theme.mode === 'dark' ? '#3A4651' : '#ccc',
      borderRadius: 10,
      padding: 10,
      marginBottom: 20,
      color: theme.darkText,
      fontFamily: font.airmedium,
    },

    buttons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    button: {
      flex: 1,
      backgroundColor: '#4A90E2',
      paddingVertical: 10,
      borderRadius: 10,
      marginHorizontal: 5,
      alignItems: 'center',
    },

    cancel: {
      backgroundColor: theme.mode === 'dark' ? '#3A4651' : '#999',
    },

    buttonText: {
      color: '#fff',
      fontFamily: font.airmedium,
    },
    errorText: {
  color: 'red',
  fontSize: 12,
  fontFamily: font.airmedium,
  marginBottom: 12,
},
  });