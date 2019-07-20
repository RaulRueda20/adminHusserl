import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';

import ModalAdmin from './ModalAdmin';

const stylebonton = {
  Boton1:{
     width:"80%"
  }
}


function NuevaExpresion(props){
  const { classes } = props;
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" className={classes.Boton1} onClick={() => handleOpen()}>
        Nueva Expresión
      </Button>
      <ModalAdmin open={open} handleClose={handleClose}/>
    </div>
  )
}

export default withStyles(stylebonton)(NuevaExpresion);
