import React, { createContext } from 'react';

export const NotificationContext = createContext({
    notificationMessage: '',
    setNotificationMessage: () => { },
    notificationType: 'info',
    setNotificationType: () => { },
    showNotification: false,
    setShowNotification: () => { },
});

export const NotificationProvider = ({ children }) => {
    const [showNotification, setShowNotification] = React.useState(false);
    const [notificationMessage, setNotificationMessage] = React.useState('');
    const [notificationType, setNotificationType] = React.useState('info');

    const notify = (message, type) => {
        setNotificationMessage(message);
        setNotificationType(type);
        setShowNotification(true);
    }

    return (
        <NotificationContext.Provider value={{
            notificationMessage,
            setNotificationMessage,
            notificationType,
            setNotificationType,
            showNotification,
            setShowNotification,
            notify,
        }}>
            {children}
        </NotificationContext.Provider>
    )
}