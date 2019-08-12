import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/styles';

import '../../../css/expresiones.css';

const styles = {
 TextFieldbus:{
    width:"100%"
   }
 }


function Busqueda(props){
  const { classes } = props;

  var expresiones=props.expresiones
  
  const handleChangeBusquedaExpresiones = (event) => {
    var expresionBuscada=event.target.value
    expresiones.map(expresion=>{
      var expresionNombre=expresion.expresion_de  +  expresion.expresion_es +  expresion.id
      var expresionEncontrada= expresionNombre.indexOf(expresionBuscada)
      console.log("expresion buscada",expresionBuscada)
      document.getElementById(expresion.id).classList.remove("hiddenE")
      if (expresionEncontrada == -1){
        document.getElementById(expresion.id).className += " hiddenE";
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
        onChange={handleChangeBusquedaExpresiones}
      />
    </FormControl>
  )
}

export default withStyles(styles)(Busqueda);
