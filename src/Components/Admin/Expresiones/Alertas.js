import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function Alertas(props){
  return(
    <Dialog
      open={props.openAl}
      onClose={props.handleCloseAl}
      aria-labelledby="simple-dialog-title"
      aria-describedby="simple-dialog-description"
    >
      <DialogTitle id="simple-dialog-title">Alerta</DialogTitle>
      <DialogContent>
        <DialogContentText id="simple-dialog-description">
          {props.text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleCloseAl}>
          Cancelar
        </Button>
        <Button onClick={props.accept}>
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Alertas;
