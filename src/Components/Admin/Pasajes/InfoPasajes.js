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
import SwipeableViews from 'react-swipeable-views';
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

var emptyPasajeNuevo = {
  clave: "",
  ref_def_de: "",
  ref_def_es: "",
  ref_id: "",
  ref_libro_de: "",
  ref_libro_es: ""
}

function InfoPasajes(props){
  const {classes}=props;
  const [vista, setVista] = React.useState(0)
  const [expresionClave, setExpresionClave] = React.useState("")
  const [expresionId, setExpresionId] = React.useState("")
  const [openAlP, setOpenAlP] = React.useState(false);
  const [snack, setSnack] = React.useState({open : false, text : ""})

  const [expresionPasaje, setExpresionPasaje] = React.useState("")
  const [expresionPasajeName, setExpresionPasajeName] = React.useState("")
  const [traduccionPasaje, setTraduccionPasaje] = React.useState("")
  const [traduccionPasajeName, setTraduccionPasajeName] = React.useState("")
  const [opcionGuardado, setOpcionGuardado] = React.useState("editar")
  
  React.useEffect(() => {
    const pasajeSeleccionado = props.pasajeSeleccionado
    console.log("pasaje",pasajeSeleccionado)
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
    props.setPasajeSeleccionado(emptyPasajeNuevo)
    props.setPasajeSeleccionadoId("")

    setOpcionGuardado("nuevo")
  }

  const handleClickEditarPasaje=()=>{
    console.log(expresionPasaje)
    var params = {
      "ref_id": btoa(expresionId),
      "pasaje_de" : btoa(expresionPasaje),
      "ref_de" : btoa(expresionPasajeName),
      "pasaje_es" : btoa(traduccionPasaje),
      "ref_es" : btoa(traduccionPasajeName),
      "clave" : expresionClave
    }
    if (opcionGuardado != "editar"){
        var servicio = "/referencias/new/nuevoPasaje"
        adminService(servicio, "POST", JSON.stringify(params), (data) =>{
          console.log("nuevo pasaje", data)
          setSnack({open : true, text: "Pasaje creado con éxito"})
          props.setReload(!props.reload)
        })
      }else{
        var servicio = "/referencias/editarPasaje/" + expresionId
        adminService(servicio, "POST", JSON.stringify(params), (data) => {
          setSnack({open : true, text: "Pasaje editado con éxito"})
          console.log("Edición de pasajes", data)
      })
    }
  }

  const handleClickEliminarPasaje=()=>{
    setOpenAlP(false);
    if (props.pasajeSeleccionado > 0){
      setSnack({open : true, text: "Este pasaje está relacionado con expresiones del diccionario. Por favor, elimine dichas relaciones antes de continuar."})
      return true
    }else{
      adminService("/referencias/eliminarPasaje/" + expresionId, "DELETE", {}, (datad) => {
        setSnack({open : true, text: "Pasaje eliminado con éxito."})
        handleClickiNuevoPasaje()
        // props.setPasajeSeleccionado(emptyPasajeNuevo)
        props.setReload(!props.reload)
        console.log("pasaje eliminado", datad)
      })
    }
  }

  function handleClickOpenAlP() {
    setOpenAlP(true);
  }

  function handleCloseAlP() {
    setOpenAlP(false);
  }

  const handleChangePasajes=(event)=>{
    setExpresionId(event.target.value);
  }

  return(
    <div className={classes.cartainfodepasajes}>
      <Snackbar
        anchorOrigin={{ vertical : "top", horizontal : "left" }}
        key={`top,left`}
        open={snack.open}
        onClose={() => setSnack({open : false, text : ""})}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{snack.text}</span>}
      />
      <Grid container alignItems="center" className={classes.headerContainer}>
        <Grid item xs={10} className={classes.textCont}>
          <TextField
            id="standard-name"
            value={expresionId}
            className={classes.textfieldlista}
            onChange={handleChangePasajes}
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
          <AlertaPasaje text="¿Quiere eliminar el pasaje seleccionado?" openAlP={openAlP} handleCloseAlP={handleCloseAlP} accept={handleClickEliminarPasaje}/>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Button
            // variant="contained"
            className={classNames({"selectedButton" : vista == 0})}
            onClick={() => setVista(0)}
            size="small"
          >
            Aleman
          </Button>
          <Button
            // variant="contained"
            className={classNames({"selectedButton" : vista == 1}, classes.botonEs)}
            size="small"
            onClick={() => setVista(1)}
          >
            Español
          </Button>
        </Grid>
      </Grid>
      <Divider/>
      <SwipeableViews axis={ vista == 0 ? 'x-reverse' : 'x'}
        index={vista}
        onChangeIndex={setVista}>
          <Pasaje 
          clave={expresionClave} setClave={setExpresionClave}
          eId={expresionId} setEId={setExpresionId}
          pasaje={expresionPasaje} setPasaje={setExpresionPasaje}
          pasajeName={expresionPasajeName} setPasajeName={setExpresionPasajeName}
          />
          <Pasaje 
          clave={expresionClave} setClave={setExpresionClave}
          eId={expresionId} setEId={setExpresionId}
          pasaje={traduccionPasaje} setPasaje={setTraduccionPasaje}
          pasajeName={traduccionPasajeName} setPasajeName={setTraduccionPasajeName}
          />
      </SwipeableViews>
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