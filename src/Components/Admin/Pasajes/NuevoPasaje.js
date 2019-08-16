import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';

import InfoPasajes from './InfoPasajes';

import {adminService} from '../../../js/webServices';

import '../../../css/pasajes.css';

const botonpasaje = {
  Botonp:{
     width:"80%"
  },
  contenedorbotonp:{
    // paddingLeft: "140px",
    // paddingTop: "20px"
  },
  contenedorpaperpasajes:{
    // padding:"20px 0px"
  }
}

const emptyPasaje = {
  clave: "",
  ref_def_de: "",
  ref_def_es: "",
  ref_id: "",
  ref_libro_de: "",
  ref_libro_es: ""}

function NuevoPasaje(props){
  const {classes}=props

  const [pasaje, setPasaje] = React.useState(emptyPasaje)
  
  React.useEffect(()=>{
    // console.log(props.pasajeSeleccionado)
    if(props.pasajeSeleccionado != ''){
      var service = "/referencias/" + props.pasajeSeleccionado
      adminService(service, "GET", {}, (data) => {
        setPasaje(data.data.response[0])
      })
    }else{
      setPasaje(emptyPasaje)
    }
  }, [props.pasajeSeleccionado])

  return(
    <div className={classes.contenedorpaperpasajes}>
      {/* <div className={classes.contenedorpaperpasajes}> */}
        <InfoPasajes pasajeSeleccionado={pasaje} setPasajeSeleccionado={setPasaje}/>
    </div>
  )
}

export default withStyles(botonpasaje)(NuevoPasaje);
