import React from 'react';
import { Platform, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import NativeDateTimePicker from '@react-native-community/datetimepicker';

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
        style={{
          padding: '15px',
          fontSize: '16px',
          borderRadius: '8px',
          border: '1px solid #e2e8f0',
          backgroundColor: '#f8f9fa',
          width: '100%',
        }}
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

const styles = StyleSheet.create({
  dateButton: {
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginTop: 8,
    width: '100%',
  },
  dateButtonText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  }
}); 