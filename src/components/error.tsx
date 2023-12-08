// components/ErrorComponent.js
import React from 'react';
import { Alert, AlertColor } from '@mui/material';

interface ErrorComponentProps {
  message: string;
  type: AlertColor;
}

const ErrorComponent = ({ message, type }: ErrorComponentProps) => {
  return <Alert severity={type}>{message}</Alert>;
};

export default ErrorComponent;
