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
import '../../../css/expresiones.css';

import {adminService} from '../../../js/webServices';

const infoExpresiones= {
  titulo:{
    paddingTop:"10px"
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
      setAllExpresiones(data.data.response)
    })
  }, [true])

  return(
      <Grid container className={classes.titulo}>
        <Grid item xs>
          <ModalJerarquia padres={props.padres} hijos={props.hijos} expresiones={allExpresiones}/>
        </Grid>
        <Grid item xs>
          <ModalEditar expresion={props.expresion}/>
        </Grid>
        <Grid item xs>
          <ModalVerTambien expresiones={allExpresiones}/>
        </Grid>
        <Grid item xs>
          <Tooltip title="Eliminar expresión">
            <IconButton onClick={()=>handleClickOpenAl()}>
              <Delete/>
            </IconButton>
          </Tooltip>
          <Alertas text="¿Quiere eliminar la expresión seleccionada?" openAl={openAl} handleCloseAl={handleCloseAl} accept={deleteExpresion}/>
        </Grid>
        <Grid item xs>
          <ModalAdmin/>
        </Grid>
      </Grid>
  )
}

export default withStyles(infoExpresiones)(InfoExpresiones);
