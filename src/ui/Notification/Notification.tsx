import React from 'react';
import styles from './Notification.module.css';
import { CircleTickIcon } from '../../asset/icons';
export type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface NotificationProps {
  message: string;
  type?: NotificationType;
  onClose?: () => void;
}

const iconMap: Record<NotificationType, React.ReactNode> = {
  success: <CircleTickIcon fill="var(--color-secondary)" />, 
  info: 'ℹ️',
  warning: '⚠️',
  error: '❌',
};

const Notification: React.FC<NotificationProps> = ({ message, type = 'info', onClose }) => {
  return (
    <div className={`${styles.notification} ${styles[type]}`}>
      <span className={styles.icon}>{iconMap[type]}</span>
      <span className={styles.message}>{message}</span>
      {onClose && (
        <button className={styles.close} onClick={onClose} aria-label="Close notification">
          ×
        </button>
      )}
    </div>
  );
};

export default Notification;
