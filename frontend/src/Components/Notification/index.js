import { Alert, Snackbar } from "@mui/material";
import { useContext } from "react";
import { NotificationContext } from "../../Context/NotificationContext";

function Notification() {

    const { showNotification, setShowNotification, notificationMessage, notificationType } = useContext(NotificationContext);

    return (
        <Snackbar 
            open={showNotification}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            autoHideDuration={6000} 
            message="Receiver successfully created"
            onClose={() => setShowNotification(false)}
        >
            <Alert severity={notificationType}>
                {notificationMessage}
            </Alert>
        </Snackbar>
    );
}

export default Notification;