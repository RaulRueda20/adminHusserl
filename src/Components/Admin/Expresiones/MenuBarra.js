import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/styles';

import ModalJerarquia from './ModalJerarquia';
import Alertas from './Alertas';
import ModalVerTambien from './ModalVerTambien';
import ModalAdmin from './ModalAdmin';
import ModalEditar from './ModalEditExpresion';

// import editar from "../../../Imagenes/editar.png";
import Delete from "@material-ui/icons/Delete";

import {adminService} from '../../../js/webServices';

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
  const [allExpresiones, setAllExpresiones] = React.useState([])

  function handleClickOpenAl() {
    setOpenAl(true);
  }

  function handleCloseAl() {
    setOpenAl(false);
  }

  function deleteExpresion(){
    console.log("ok")
    setOpenAl(false);
  }

  React.useEffect(()=>{
    var service = "/expresiones/getAllList"
    adminService(service, "GET", {}, (data) => {
      // console.log(data)
      setAllExpresiones(data.data.response)
      // console.log("lista de expresiones", data)
      // setExpresiones(data.data.response)
      // setIdExpresion(data.data.response.length > 0 ? data.data.response[0].id : "")
    })
  }, [true])

  return(
      <Grid container className={classes.titulo}>
        <Grid item xs className={classes.botonesaccion}>
          <ModalJerarquia padres={props.padres} hijos={props.hijos} expresiones={allExpresiones}/>
        </Grid>
        <Grid item xs className={classes.botonesaccion}>
          <ModalEditar expresion={props.expresion}/>
        </Grid>
        <Grid item xs className={classes.botonesaccion}>
          <ModalVerTambien expresiones={allExpresiones}/>
        </Grid>
        <Grid item xs className={classes.botonesaccion}>
          <Tooltip title="Eliminar expresión">
            <IconButton onClick={()=>handleClickOpenAl()}>
              <Delete/>
            </IconButton>
          </Tooltip>
          <Alertas text="¿Quiere eliminar la expresión seleccionada?" openAl={openAl} handleCloseAl={handleCloseAl} accept={deleteExpresion}/>
        </Grid>
        <Grid item xs className={classes.botonesaccion}>
          <ModalAdmin/>
        </Grid>
      </Grid>
  )
}

export default withStyles(infoExpresiones)(InfoExpresiones);
