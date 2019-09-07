import React from 'react';
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
import Snackbar from '@material-ui/core/Snackbar';
import ClearIcon from '@material-ui/icons/Clear';
import LinearProgress from '@material-ui/core/LinearProgress';
import {adminService} from '../../../js/webServices';

const addHijos = (expresionId,index,lista, last) => {
  var service = "/expresiones/agregarPadre/" + expresionId
  adminService(service, "POST", JSON.stringify({"padre" : lista[index].split("e")[1]}), (datax) => {
    if(index + 1 < lista.length){
      return addHijos(expresionId, index+1, lista, last)
    }else{
      return last()
    }
  })
}

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
  const [selectedExpresions, setSelectedExpresions] = React.useState([]);
  const [snack, setSnack] = React.useState({open : false, text : ""})
  const [loading, setLoading] = React.useState(false)

  function handleClose() {
    setSnack({open: false, text: ""});
  }

  const checkExistence = () => {
    if(selectedExpresions.length == 0){
      setSnack({open : true, text: "No ha seleccionado ninguna expresión."})
      return true
    }
    for(var i in selectedExpresions){
      for(var j in props.padres){
        if(selectedExpresions[i].split("e")[1] == props.padres[j].padre){
          setSnack({open : true, text: "La expresión '" + props.padres[j].padre + " - " + props.padres[j].expresion + "' ya forma parte de la jerarquía."})
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
        setSnack({open : true, text: "Se ha(n) agregado el/los padre(s) con éxito."})
        props.setReload(!props.reload)
      })
    }
  }

  const addEToList = (id) => {
    var se = selectedExpresions
    if(se.indexOf(id) < 0) se.push(id)
    else se.splice(selectedExpresions.indexOf(id), 1)
    document.getElementById(id).classList.toggle("selected")
    setSelectedExpresions(se)
  }

  const handleClickEliminarPadre=(hijo)=>{
    setLoading(true)
    var service = "/expresiones/eliminarRelacion/" + props.expresionSeleccionada.id + "/" + hijo.padre
    adminService(service, "DELETE", {}, (datax) => {
      setLoading(false)
      setSnack({open : true, text: "Se ha eliminado el padre de la expresión"})
      props.setReload(!props.reload)
    })
  }

  var expresionesPadres= props.expresiones

  const handleChangeBusquedaPadres = (event) => {
    var expresionPadresBuscada=event.target.value
    expresionesPadres.map(expresionp=>{
      var expresionPadresNombre=expresionp.t_id + expresionp.t_term_de + expresionp.t_term_es
      var expresionPadresEncontrada= expresionPadresNombre.indexOf(expresionPadresBuscada)
      document.getElementById("padre"+expresionp.t_id).classList.remove("hiddenE")
      if (expresionPadresEncontrada == -1){
        document.getElementById("padre"+expresionp.t_id).className += " hiddenE";
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
        {props.padres.map(padre=>(
          <ListItem
            key={padre.padre}
            className={classes.listaitemj}
          >
            <ListItemText
              primary={padre.expresion}
            />
            <ListItemSecondaryAction>
              <IconButton size="small" onClick={() => handleClickEliminarPadre(padre)}>
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
          onChange={handleChangeBusquedaPadres}
        />
      </FormControl>
      <List className={classes.listacontenedor}>
        {props.expresiones.map(expresionp=>(
          <li 
          id={"padre"+expresionp.t_id}
          key={expresionp.t_id} 
          className={"sideList"} 
          onClick={() => addEToList("padre"+expresionp.t_id)}>
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

export default withStyles(estiloModalJerarquiaPadres)(ModalJerarquiaPadres);
