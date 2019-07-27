import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';

import ModalAdmin from './ModalAdmin';
import InfoExpresiones from './InfoExpresiones';
import CartaPasajes from './CartaPasajes';

const stylebonton = {
  Boton1:{
     width:"80%"
  },
  contenedorPaper:{
    paddingLeft:"10px",
    paddingTop: "30px"
  },
  contenedorPasajes:{
    paddingTop: "10px",
    paddingRight: "807px"
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

  console.log("cuando mando props expresiones a NuevaExpresion",props.expresiones)

  return (
    <div>
      <div>
        <Button variant="contained" className={classes.Boton1} onClick={() => handleOpen()}>
          Nueva Expresión
        </Button>
        <ModalAdmin open={open} handleClose={handleClose}/>
      </div>
      <div className={classes.contenedorPaper}>
        <InfoExpresiones expresiones={props.expresiones}/>
      </div>
      <div className={classes.contenedorPasajes}>
        <CartaPasajes/>
      </div>
    </div>
  )
}

export default withStyles(stylebonton)(NuevaExpresion);