import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';

import InfoPasajes from './InfoPasajes';

const botonpasaje = {
  Botonp:{
     width:"80%"
  },
  contenedorbotonp:{
    paddingLeft: "140px",
    paddingTop: "20px"
  },
  contenedorpaperpasajes:{
    paddingTop:"20px"
  }
}

function NuevoPasaje(props){
  const {classes}=props
  return(
    <div>
      <div className={classes.contenedorbotonp}>
        <Button variant="contained" className={classes.Botonp}>
          Nueva Expresión
        </Button>
      </div>
      <div className={classes.contenedorpaperpasajes}>
        <InfoPasajes/>
      </div>
    </div>
  )
}

export default withStyles(botonpasaje)(NuevoPasaje);
