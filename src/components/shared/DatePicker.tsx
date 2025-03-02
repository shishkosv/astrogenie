import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from '../icons/Icon';
import { datePickerStyles as styles } from './styles/DatePickerStyles';

interface DatePickerProps {
  label?: string;
  value: Date;
  onChange: (date: Date) => void;
  error?: string;
  minimumDate?: Date;
  maximumDate?: Date;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  error,
  minimumDate,
  maximumDate,
}) => {
  const [show, setShow] = useState(false);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (Platform.OS === 'web') {
    return (
      <View style={styles.container}>
        {label && <Text style={styles.label}>{label}</Text>}
        <input
          type="date"
          value={value.toISOString().split('T')[0]}
          onChange={(e) => onChange(new Date(e.target.value))}
          style={styles.webInput}
          min={minimumDate?.toISOString().split('T')[0]}
          max={maximumDate?.toISOString().split('T')[0]}
        />
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        style={[styles.button, error ? styles.errorBorder : null]}
        onPress={() => setShow(true)}
      >
        <Text style={styles.buttonText}>{formatDate(value)}</Text>
        <Icon name="calendar" size={20} color="#666" />
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}

      {show && (
        <DateTimePicker
          value={value}
          mode="date"
          display="default"
          onChange={(event, selectedDate?: Date) => {
            setShow(false);
            if (selectedDate) {
              onChange(selectedDate);
            }
          }}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}
    </View>
  );
};

// Styles have been moved to DatePickerStyles.ts 