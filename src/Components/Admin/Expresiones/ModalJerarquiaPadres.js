import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/styles';
import Snackbar from '@material-ui/core/Snackbar';
import ClearIcon from '@material-ui/icons/Clear';

import {adminService} from '../../../js/webServices';

const estiloModalJerarquiaPadres={
  botonhijos:{
    left:"10px",
    size:"small"
  },
  listacontenedor:{
    height: "25vh",
    overflow: "scroll"
  },
  listaitemj:{
    background: "rgb(230,230,230)",
    borderBottom:"rgb(150,150,150) dotted",
  },
  busquedaj:{
    width:"100%",
  },
  contenedorbusquedaj:{
    paddingTop:"10px"
  },
  botonAgregar:{
    width:"50%",
    left:"50%",
  }
}

function ModalJerarquiaPadres(props){
  const {classes}=props;
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [selectedExpresions, setSelectedExpresions] = React.useState([]);
  const [snack, setSnack] = React.useState({open : false, text : ""})
  
  function handleListItemClick(event, index) {
    setSelectedIndex(index);
  }

  function handleClose() {
    setSnack({open: false, text: ""});
  }

  const checkExistence = () => {
    var padre=props.padres.padre
    var service = "/expresiones/agregarPadre/" + selectedExpresions
    adminService(service, "POST", JSON.stringify(padre), (datax)=>{
      console.log("datos de padres",datax)
    })
    if(selectedExpresions.length == 0){
      setSnack({open : true, text: "No ha seleccionado ninguna expresión."})
      return true
    }
    for(var i in selectedExpresions){
      for(var j in props.padres){
        if(selectedExpresions[i] == props.padres[j].padre){
          setSnack({open : true, text: "La expresión '" + props.padres[j].padre + " - " + props.padres[j].expresion + "' ya forma parte de la jerarquía."})
          return true
        }
      }
    }
    console.log("ok")
    return false
  }

  const addEToList = (id) => {
    var se = selectedExpresions
    if(se.indexOf(id) < 0) se.push(id)
    else se.splice(selectedExpresions.indexOf(id), 1)
    document.getElementById(id).classList.toggle("selected")
    setSelectedExpresions(se)
  }

  const handleClickEliminarPadre=()=>{
    var padre_id=props.padres.id
    var padre_expresion=props.padres.padre
    var service = "/expresiones/eliminarRelacion/" +  padre_id + "/" +  padre_expresion
    adminService(service, "DELETE", {}, (datax) => {
      console.log("Eliminación de padres",datax)
    })
    setSnack({open : true, text: "Se ha eliminado el padre de la expresión"})
    return true
  }

  return(
    <div>
      <Snackbar
        anchorOrigin={{ vertical : "top", horizontal : "left" }}
        key={`top,left`}
        open={snack.open}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{snack.text}</span>}
      />
      <List className={classes.listacontenedor}>
        {props.padres.map(padre=>(
          <ListItem
            key={padre.padre}
            className={classes.listaitemj}
            // selected={selectedIndex === 1}
          >
            <ListItemText
              primary={padre.expresion}
              // secondary={secondary ? 'Secondary text' : null}
            />
            <ListItemSecondaryAction>
              <IconButton size="small" onClick={handleClickEliminarPadre}>
                <ClearIcon fontSize="small"/>
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Typography variant="h3">
        Expresiones
      </Typography>
      <FormControl className={classes.busquedaj}>
        <Input
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </FormControl>
      <List className={classes.listacontenedor}>
        {props.expresiones.map(expresionp=>(
          <li 
          id={expresionp.t_id}
          key={expresionp.t_id} 
          className={"sideList"} 
          onClick={() => addEToList(expresionp.t_id)}>
            {expresionp.t_id + " - " + expresionp.t_term_de + " // " + expresionp.t_term_es}
          </li>
        ))}
      </List>
      <Button
        variant="contained"
        className={classes.botonAgregar}
        onClick={checkExistence}
      >
        Agregar
      </Button>
    </div>
  )
}

export default withStyles(estiloModalJerarquiaPadres)(ModalJerarquiaPadres);
