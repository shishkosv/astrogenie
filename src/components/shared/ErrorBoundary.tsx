import React, { Component, ReactNode } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  children: ReactNode;
  fallback: React.FC<{
    error: Error;
    resetError: () => void;
  }>;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: string;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: '' };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null, errorInfo: '' });
  };

  public render() {
    if (this.state.hasError && this.state.error) {
      return this.props.fallback({
        error: this.state.error,
        resetError: this.resetError,
      });
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  message: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4a0e4e',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
}); 