
import { ReactNode } from 'react';

export interface ButtonProps {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'accent' | 'gradient' | 'ghost';
    icon?: ReactNode;
    loading?: boolean;
    fullWidth?: boolean;
    type?: 'button' | 'submit' | 'reset';
}