import { AlertColor } from '@mui/material';

export interface ErrorProps {
  isActive: boolean;
  message: string;
  type: AlertColor;
}
