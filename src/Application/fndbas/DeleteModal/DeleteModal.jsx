import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {  Button } from '@mui/material';

export default function DeleteModal({open,handleClose,Delete}) {
  return (
    <Dialog open={open} onClose={handleClose}
      aria-labelledby="delete-object"
      aria-describedby="delete-description">
      <DialogTitle id="delete-object">
        {"Delete"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-description">
          Do you want to delete?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>No</Button>
        <Button onClick={Delete}>Yes</Button>
      </DialogActions>
    </Dialog>
  )
}
