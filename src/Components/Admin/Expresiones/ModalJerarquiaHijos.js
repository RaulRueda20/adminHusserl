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
import ClearIcon from '@material-ui/icons/Clear';
import Snackbar from '@material-ui/core/Snackbar';

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
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [selectedExpresions, setSelectedExpresions] = React.useState([]);
  const [snack, setSnack] = React.useState({open : false, text : ""})

  function handleListItemClick(event, index) {
    setSelectedIndex(index);
  }

  const checkExistence = () => {
    if(selectedExpresions.length == 0){
      setSnack({open : true, text: "No ha seleccionado ninguna expresión."})
      return true
    }
    for(var i in selectedExpresions){
      for(var j in props.hijos){
        if(selectedExpresions[i] == props.hijos[j].hijo){
          setSnack({open : true, text: "La expresión '" + props.hijos[j].hijo + " - " + props.hijos[j].expresion + "' ya forma parte de la jerarquía."})
          return true
        }
      }
    }
    console.log("ok")
    return false
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
        {props.hijos.map(hijo=>(
          <ListItem
            key={hijo.hijo}
            className={classes.listaitemj}
            // selected={selectedIndex === 1}
          >
            <ListItemText
              primary={hijo.expresion}
              // secondary={secondary ? 'Secondary text' : null}
            />
            <ListItemSecondaryAction>
              <IconButton size="small">
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
          // <li key={expresionp.t_id} className="sideList" onClick={addEToList(expresionp.t_id)}>
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

export default withStyles(estiloModalJerarquiaHijos)(ModalJerarquiaHijos);
