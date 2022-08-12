import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button } from '@mui/material';
import "./confirmDialog.scss";

export default function ConfirmDialog(props) {

    const {confirmDialog, setConfirmDialog} = props;

  return (
    <Dialog className="dialog" open={confirmDialog.isOpen}>
        <DialogTitle></DialogTitle>
        <DialogContent className='dialogContent'>
            <Typography variant="h6" >
                {confirmDialog.title}
            </Typography>
            <Typography variant="subtitle2" >
                {confirmDialog.subTitle}
            </Typography>
        </DialogContent>
        <DialogActions className='dialogActions'>
            <Button className="confirm" onClick={confirmDialog.onConfirm}>Yes</Button>
            <Button className="decline" onClick={()=>{setConfirmDialog({...confirmDialog, isOpen: false})}}>No</Button>
        </DialogActions>
    </Dialog>
  )
}
