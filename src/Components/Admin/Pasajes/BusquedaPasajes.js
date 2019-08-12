import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/styles';

// import {adminService} from '../../../js/webServices';

import '../../../css/pasajes.css';

const styles = {
 TextFieldbus:{
    width:"100%"
   }
 }

function BusquedaPasajes(props){
  const { classes } = props;
  
  var pasajes=props.pasajes

  
  const handleChangeBusqueda = (event) => {
    var busqueda = event.target.value
    pasajes.map(pasaje=>{
      var pasajeNombre=pasaje.ref_libro_de + pasaje.ref_libro_es + pasaje.ref_id
      var pasajeBuscado= pasajeNombre.indexOf(busqueda)
      console.log("pasajeNombre",pasajeNombre)
      document.getElementById(pasaje.ref_id).classList.remove("hidden")
      if (pasajeBuscado == -1){
        document.getElementById(pasaje.ref_id).className += " hidden";
      }
    })
  }

  return (
    <FormControl className={classes.TextFieldbus}>
      <InputLabel htmlFor="input-with-icon-adornment">Busqueda por letra</InputLabel>
      <Input
        id="input-with-icon-adornment"
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        onChange={handleChangeBusqueda}
      />
    </FormControl>
  )
}

export default withStyles(styles)(BusquedaPasajes);