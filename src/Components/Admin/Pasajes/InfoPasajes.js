import React from 'react';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Divider from "@material-ui/core/Divider";
import { withStyles } from '@material-ui/styles';

import Delete from '@material-ui/icons/Delete';
import Add from '@material-ui/icons/NoteAdd';

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

  const [expresionPasaje, setExpresionPasaje] = React.useState("")
  const [expresionPasajeName, setExpresionPasajeName] = React.useState("")
  const [traduccionPasaje, setTraduccionPasaje] = React.useState("")
  const [traduccionPasajeName, setTraduccionPasajeName] = React.useState("")

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
          <IconButton>
            <Add/>
          </IconButton>
        </Grid>
        <Grid item xs={1} className={classes.botoneliminarpasaje}>
          <IconButton>
            <Delete/>
          </IconButton>
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
          >
              Guardar
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(infopasajes)(InfoPasajes);
