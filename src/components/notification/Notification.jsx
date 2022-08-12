import React from 'react'
import "./notification.scss";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

export default function Notification(props) {
    const {notify, setNotify} = props;
    const handleClose = (event, reason) => {
        setNotify({
            ...notify,
            isOpen: false
        });
    }
    return (
        <Snackbar
            open={notify.isOpen}
            autoHideDuration={3000}
            onClose={handleClose}
        >
            <Collapse in={notify.isOpen}>
                <Alert
                    severity={notify.type}
                    onClose={handleClose}
                    action={
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => {
                            handleClose();
                          }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                >
                    {notify.message}
                </Alert>
            </Collapse>
        </Snackbar>
    )
}
