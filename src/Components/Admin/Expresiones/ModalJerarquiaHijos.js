import React from 'react'
import classNames from 'classnames';
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
import ClearIcon from '@material-ui/icons/Clear';
import Snackbar from '@material-ui/core/Snackbar';
import LinearProgress from '@material-ui/core/LinearProgress';
import {adminService} from '../../../js/webServices';

import '../../../css/expresiones.css';

const addHijos = (expresionId,index,lista, last) => {
  var service = "/expresiones/agregarHijo/" + expresionId
  adminService(service, "POST", JSON.stringify({"hijo" : lista[index].split("o")[1]}), (datax) => {
    if(index + 1 < lista.length){
      return addHijos(expresionId, index+1, lista, last)
    }else{
      return last()
    }
  })
}

const estiloModalJerarquiaHijos={
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

function ModalJerarquiaHijos(props){
  const {classes}=props;
  const [selectedExpresions, setSelectedExpresions] = React.useState([]);
  const [snack, setSnack] = React.useState({open : false, text : ""})
  const [loading, setLoading] = React.useState(false) 

  const checkExistence = () => {
    if(selectedExpresions.length == 0){
      setSnack({open : true, text: "No ha seleccionado ninguna expresión."})
      return true
    }
    for(var i in selectedExpresions){
      for(var j in props.hijos){
        if(selectedExpresions[i].split("o")[1] == props.hijos[j].hijo){
          setSnack({open : true, text: "La expresión '" + props.hijos[j].hijo + " - " + props.hijos[j].expresion + "' ya forma parte de la jerarquía."})
          return true
        }
      }
    }
    return false
  }

  const add = () => {
    if(!checkExistence()){
      setLoading(true)
      addHijos(props.expresionSeleccionada.id, 0, selectedExpresions, () => {
        setLoading(false)
        setSnack({open : true, text: "Se ha(n) agregado el/los hijo(s) con éxito."})
        props.setReload(!props.reload)
      })
    }
  }

  function handleClose() {
    setSnack({open: false, text: ""});
  }

  const addEToList = (id) => {
    var se = selectedExpresions
    if(se.indexOf(id) < 0) se.push(id)
    else se.splice(selectedExpresions.indexOf(id), 1)
    document.getElementById(id).classList.toggle("selected")
    setSelectedExpresions(se)
  }

  const handleClickEliminarHijo=(hijo)=>{
    var service = "/expresiones/eliminarRelacion/" + hijo.hijo + "/" + props.expresionSeleccionada.id
    adminService(service, "DELETE", {}, (datax) => {
      setSnack({open : true, text: "Se ha eliminado el hijo de la expresión"})
      props.setReload(!props.reload)
    })
  }

  var expresionesHijos= props.expresiones

  const handleChangeBusquedaHijos = (event) => {
    var expresionHijosBuscada=event.target.value
    expresionesHijos.map(expresionp=>{
      var expresionHijosNombre=expresionp.t_id + expresionp.t_term_de + expresionp.t_term_es
      var expresionHijosEncontrada= expresionHijosNombre.indexOf(expresionHijosBuscada)
      document.getElementById('hijo'+expresionp.t_id).classList.remove("hiddenE")
      if (expresionHijosEncontrada == -1){
        document.getElementById('hijo'+expresionp.t_id).className += " hiddenE";
      }
    })
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
      <LinearProgress className={classNames([{"hidden" : !loading}, "loadingBar"])}/>
      <List className={classes.listacontenedor}>
        {props.hijos.map(hijo=>(
          <ListItem
            key={hijo.hijo}
            className={classes.listaitemj}
          >
            <ListItemText
              primary={hijo.expresion}
            />
            <ListItemSecondaryAction>
              <IconButton size="small" onClick={() => handleClickEliminarHijo(hijo)}>
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
          onChange={handleChangeBusquedaHijos}
        />
      </FormControl>
      <List className={classes.listacontenedor}>
        {props.expresiones.map(expresionp=>(
          <li 
            id={'hijo'+expresionp.t_id}
            key={expresionp.t_id} 
            className={"sideList"} 
            onClick={() => addEToList("hijo"+expresionp.t_id)}>
              {expresionp.t_id + " - " + expresionp.t_term_de + " // " + expresionp.t_term_es}
          </li>
        ))}
      </List>
      <Button
        variant="contained"
        className={classes.botonAgregar}
        onClick={add}
      >
        Agregar
      </Button>
    </div>
  )
}

export default withStyles(estiloModalJerarquiaHijos)(ModalJerarquiaHijos);
