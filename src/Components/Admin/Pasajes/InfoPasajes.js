import React from 'react';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Divider from "@material-ui/core/Divider";
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';
import { withStyles } from '@material-ui/styles';

import {adminService} from '../../../js/webServices';

import Delete from '@material-ui/icons/Delete';
import Add from '@material-ui/icons/NoteAdd';

import AlertaPasaje from './AlertaPasaje';
import Pasaje from './Pasaje';

const infopasajes={
  cartainfodepasajes:{
    maxWidth:"100%",
  },
  textCont : {
    padding: "0px 20px"
  },
  headerContainer : {
    padding: "20px 0px"
  },
  textfieldlista:{
    width: "100%",
    // padding: "0px 30px"
    // paddingLeft: "150px"
  },
  botoneliminarpasaje:{
    paddingTop:"10px"
  },
  botonEs:{
    left:"5px"
  },
  contenedorselectpasaje:{
    paddingTop:"10px",
    paddingLeft:"280px"
  },
  textopasaje:{
    bottom:"6px",
    paddingLeft:"3px",
  },
  contenedoreditorpasaje:{
    width: "100%",
    padding: "25px"
  }
}

function InfoPasajes(props){
  const {classes}=props;
  const [vista, setVista] = React.useState('de')
  const [expresionClave, setExpresionClave] = React.useState("")
  const [expresionId, setExpresionId] = React.useState("")
  const [openAlP, setOpenAlP] = React.useState(false);

  const [expresionPasaje, setExpresionPasaje] = React.useState("")
  const [expresionPasajeName, setExpresionPasajeName] = React.useState("")
  const [traduccionPasaje, setTraduccionPasaje] = React.useState("")
  const [traduccionPasajeName, setTraduccionPasajeName] = React.useState("")
  const [snack, setSnack] = React.useState({open : false, text : ""})

  React.useEffect(() => {
    const pasajeSeleccionado = props.pasajeSeleccionado
    console.log(pasajeSeleccionado)
    setExpresionClave(pasajeSeleccionado.clave)
    setExpresionId(pasajeSeleccionado.ref_id)
    setExpresionPasaje(pasajeSeleccionado.ref_def_de)
    setExpresionPasajeName(pasajeSeleccionado.ref_libro_de)
    setTraduccionPasaje(pasajeSeleccionado.ref_def_es)
    setTraduccionPasajeName(pasajeSeleccionado.ref_libro_es)
  }, [props.pasajeSeleccionado])

  const handleChangeC = (event) => {
    setClave(event.target.value)
  };

  const handleClickiNuevoPasaje=()=>{
    var params = {
      "ref_id": expresionId,
      "pasaje_de" : expresionPasaje,
      "ref_de" : expresionPasajeName,
      "pasaje_es" : traduccionPasaje,
      "ref_es" : traduccionPasajeName,
      "clave" : expresionClave
    }
    var servicio = "/referencias/new/nuevoPasaje"
    adminService(servicio, "POST", JSON.stringify(params), (data) => {
      console.log("nuevo pasaje", data)
    })
  }

  const handleClickEditarPasaje=()=>{
    var params = {
      "ref_id": expresionId,
      "pasaje_de" : expresionPasaje,
      "ref_de" : expresionPasajeName,
      "pasaje_es" : traduccionPasaje,
      "ref_es" : traduccionPasajeName,
      "clave" : expresionClave
    }
    var servicio = "/referencias/editarPasaje/" + expresionId
    adminService(servicio, "POST", JSON.stringify(params), (data) =>{
      console.log("Edición de pasajes", data)
    })
    if (expresionId == "ref_id"){
      setSnack({open : true, text: "El id que intenta guardar ya existe."})
    }
  }

  // const handleClickEliminarPasaje=()=>{

  // }

  function handleClickOpenAlP() {
    setOpenAlP(true);
  }

  function handleCloseAlP() {
    setOpenAlP(false);
  }

  return(
    <div className={classes.cartainfodepasajes}>
      <Grid container alignItems="center" className={classes.headerContainer}>
        <Grid item xs={10} className={classes.textCont}>
          <TextField
            id="standard-name"
            value={expresionId}
            className={classes.textfieldlista}
          />
        </Grid>
        <Grid item xs={1} className={classes.botoneliminarpasaje}>
          <Tooltip title="Agregar pasaje">
          <IconButton onClick={handleClickiNuevoPasaje}>
            <Add/>
          </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={1} className={classes.botoneliminarpasaje}>
          <Tooltip title="Eliminar pasaje">
            <IconButton onClick={handleClickOpenAlP}>
              <Delete/>
            </IconButton>
          </Tooltip>
          <AlertaPasaje text="¿Quiere eliminar el pasaje seleccionado?" openAlP={openAlP} handleCloseAlP={handleCloseAlP}/>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Button
            // variant="contained"
            className={classNames({"selectedButton" : vista == 'de'})}
            onClick={() => setVista('de')}
            size="small"
          >
            Aleman
          </Button>
          <Button
            // variant="contained"
            className={classNames({"selectedButton" : vista == 'es'}, classes.botonEs)}
            size="small"
            onClick={() => setVista('es')}
          >
            Español
          </Button>
        </Grid>
      </Grid>
      <Divider/>
      {
        vista == 'de' ? 
        <Pasaje 
          clave={expresionClave} setClave={setExpresionClave}
          eId={expresionId} setEId={setExpresionId}
          pasaje={expresionPasaje} setPasaje={setExpresionPasaje}
          pasajeName={expresionPasajeName} setPasajeName={setExpresionPasajeName}/> : 
        <Pasaje 
          clave={expresionClave} setClave={setExpresionClave}
          eId={expresionId} setEId={setExpresionId}
          pasaje={traduccionPasaje} setPasaje={setTraduccionPasaje}
          pasajeName={traduccionPasajeName} setPasajeName={setTraduccionPasajeName}/>
      }
      <Divider className="divisor"/>
      <Grid container justify="flex-end">
        <Grid item>
          <Button
            variant="contained"
            size="small"
            onClick={handleClickEditarPasaje}
          >
              Guardar
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(infopasajes)(InfoPasajes);
