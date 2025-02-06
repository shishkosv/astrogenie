import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView, Platform, Dimensions } from 'react-native';
import Icon from '../icons/Icon';

interface DropdownProps {
  label?: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  options,
  onChange,
  placeholder = 'Select an option',
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [layout, setLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const triggerRef = useRef<View>(null);
  const windowHeight = Dimensions.get('window').height;

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  const measureTrigger = () => {
    if (Platform.OS === 'web') {
      triggerRef.current?.measure((x, y, width, height, pageX, pageY) => {
        setLayout({ x: pageX, y: pageY, width, height });
      });
    }
  };

  const handleOpen = () => {
    measureTrigger();
    setIsOpen(true);
  };

  // Calculate if dropdown should open upward
  const shouldOpenUpward = layout.y > windowHeight / 2;

  const OptionsList = () => (
    <View 
      style={[
        styles.optionsList,
        Platform.OS === 'web' && {
          position: 'fixed',
          top: shouldOpenUpward ? undefined : layout.y + layout.height,
          bottom: shouldOpenUpward ? windowHeight - layout.y : undefined,
          left: layout.x,
          width: layout.width,
        }
      ]}
    >
      <ScrollView 
        style={styles.optionsScroll}
        showsVerticalScrollIndicator={false}
      >
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={styles.option}
            onPress={() => handleSelect(option)}
          >
            <Text style={[
              styles.optionText,
              option === value && styles.selectedOption
            ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View ref={triggerRef}>
        <TouchableOpacity
          style={[styles.trigger, error && styles.errorBorder]}
          onPress={handleOpen}
        >
          <Text style={[styles.selectedText, !value && styles.placeholder]}>
            {value || placeholder}
          </Text>
          <Icon 
            name={isOpen ? 'chevron-up' : 'chevron-down'} 
            size={20} 
            color="#666" 
          />
        </TouchableOpacity>
      </View>

      {Platform.OS === 'web' ? (
        isOpen && <OptionsList />
      ) : (
        <Modal
          visible={isOpen}
          transparent
          animationType="fade"
          onRequestClose={() => setIsOpen(false)}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setIsOpen(false)}
          >
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>{label || 'Select Option'}</Text>
                <TouchableOpacity onPress={() => setIsOpen(false)}>
                  <Icon name="x" size={24} color="#333" />
                </TouchableOpacity>
              </View>
              <OptionsList />
            </View>
          </TouchableOpacity>
        </Modal>
      )}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    zIndex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  trigger: {
    height: 40,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  selectedText: {
    fontSize: 16,
    color: '#333',
  },
  placeholder: {
    color: '#666',
  },
  optionsList: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    ...Platform.select({
      web: {
        position: 'absolute',
        zIndex: 1000,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      default: {
        flex: 1,
      }
    }),
  },
  optionsScroll: {
    maxHeight: 200,
  },
  option: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOption: {
    color: '#4a0e4e',
    fontWeight: '600',
  },
  errorBorder: {
    borderColor: '#DC2626',
  },
  errorText: {
    color: '#DC2626',
    fontSize: 12,
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
}); 