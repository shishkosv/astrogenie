import React from 'react';
import { Platform, TouchableOpacity, Text, View } from 'react-native';
import NativeDateTimePicker from '@react-native-community/datetimepicker';
import { dateTimePickerStyles as styles } from './styles/DateTimePickerStyles';

interface DateTimePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  showPicker?: boolean;
  onPress?: () => void;
}

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  value,
  onChange,
  showPicker = false,
  onPress
}) => {
  if (Platform.OS === 'web') {
    return (
      <input
        type="datetime-local"
        value={value.toISOString().slice(0, 16)} // Format: YYYY-MM-DDThh:mm
        onChange={(e) => {
          const newDate = new Date(e.target.value);
          onChange(newDate);
        }}
        style={styles.webInput}
      />
    );
  }

  return (
    <View>
      <TouchableOpacity 
        style={styles.dateButton}
        onPress={onPress}
      >
        <Text style={styles.dateButtonText}>
          {value.toLocaleString()}
        </Text>
      </TouchableOpacity>

      {Platform.OS === 'android' ? (
        showPicker && (
          <NativeDateTimePicker
            value={value}
            mode="datetime"
            display="default"
            onChange={(event, selectedDate) => {
              if (selectedDate) {
                onChange(selectedDate);
              }
            }}
          />
        )
      ) : (
        <NativeDateTimePicker
          value={value}
          mode="datetime"
          display="default"
          onChange={(event, selectedDate) => {
            if (selectedDate) {
              onChange(selectedDate);
            }
          }}
          style={{ width: '100%' }}
        />
      )}
    </View>
  );
}; 