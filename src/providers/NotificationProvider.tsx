import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import Notification, { NotificationType } from '../ui/Notification/Notification';

interface NotificationPayload {
  message: string;
  type?: NotificationType;
}

interface NotificationContextType {
  notification: NotificationPayload | null;
  showNotification: (notification: NotificationPayload) => void;
  clearNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notification, setNotification] = useState<NotificationPayload | null>(null);

  const showNotification = useCallback((notification: NotificationPayload) => {
    setNotification(notification);
    setTimeout(() => setNotification(null), 3000);
  }, []);

  const clearNotification = useCallback(() => setNotification(null), []);

  return (
    <NotificationContext.Provider value={{ notification, showNotification, clearNotification }}>
      {children}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={clearNotification}
        />
      )}
    </NotificationContext.Provider>
  );
};
