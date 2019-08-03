import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';

import ModalJerarquia from './ModalJerarquia';
import Alertas from './Alertas';
import ModalVerTambien from './ModalVerTambien';
import ModalAdmin from './ModalAdmin';

// import editar from "../../../Imagenes/editar.png";
import Create from "@material-ui/icons/Create";
import Delete from "@material-ui/icons/Delete";

const infoExpresiones= {
  titulo:{
    paddingTop:"10px"
  },
  botonesaccion:{
    // paddingLeft:"120px"
  },
  contenedordeinfo:{
    borderRight: "lightgrey 1px dashed"
  },
  subtitulo:{
    paddingTop:"20px"
  },
  infoPanel:{
    padding: "25px 0px"
  },
  w100: {
    width : "100% !important"
  },
  scrolledHeight: {
    maxHeight: "100px",
    overflow: "scroll"
  }
}

function InfoExpresiones(props){
  const {classes} = props;
  const [openAl, setOpenAl] = React.useState(false);

  function handleClickOpenAl() {
    setOpenAl(true);
  }

  function handleCloseAl() {
    setOpenAl(false);
  }
  
  return(
      <Grid container className={classes.titulo}>
        <Grid item xs className={classes.botonesaccion}>
          <ModalJerarquia padres={props.padres} hijos={props.hijos} expresiones={props.expresiones}/>
        </Grid>
        <Grid item xs className={classes.botonesaccion}>
          <IconButton>
            <Create/>
          </IconButton>
        </Grid>
        <Grid item xs className={classes.botonesaccion}>
          <ModalVerTambien/>
        </Grid>
        <Grid item xs className={classes.botonesaccion}>
          <IconButton onClick={()=>handleClickOpenAl()}>
            <Delete/>
          </IconButton>
          <Alertas openAl={openAl} handleCloseAl={handleCloseAl}/>
        </Grid>
        <Grid item xs className={classes.botonesaccion}>
          <ModalAdmin/>
        </Grid>
      </Grid>
  )
}

export default withStyles(infoExpresiones)(InfoExpresiones);
