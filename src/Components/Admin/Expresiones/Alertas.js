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
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title"></DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          ¿Quiere eliminar la expresión seleccionada?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleCloseAl}>
          Cancelar
        </Button>
        <Button onClick={props.handleCloseAl}>
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Alertas;
