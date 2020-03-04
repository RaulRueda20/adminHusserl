import React from 'react'
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
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
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import {adminService} from '../../../js/webServices';
import Share from '@material-ui/icons/Share';

import '../../../css/expresiones.css';

const addVT = (expresionId,index,lista, last) => {
  var service = "/vertambien/" + expresionId + "/" + lista[index].split("t")[1]
  adminService(service, "POST", {}, (datax) => {
    if(index + 1 < lista.length){
      return addVT(expresionId, index+1, lista, last)
    }else{
      return last()
    }
  })
}

const estiloModalJerarquiaHijos={
  modalinj:{
    width: "50%",
    maxHeight:"75vh",
    left: "25vw",
    top: "12.5vh",
    position:"absolute",
    padding: "30px 30px",
    overflowY: "auto"
  },
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

function ModalVerTambien(props){
  const {classes}=props;
  const [listaVerTambien, setListaVerTambien] = React.useState([])
  const [selectedExpresions, setSelectedExpresions] = React.useState([]);
  const [snack, setSnack] = React.useState({open : false, text : ""})
  const [loading, setLoading] = React.useState(false) 
  const [reload, setReload] = React.useState(true)
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if(props.expresion.id != null){
      var service = "/vertambien/" + props.expresion.id
      adminService(service, "GET", {}, response => {
        console.log(response)
        // setListaVerTambien(response.data.response)
      })
    }
    
  }, [props.expresion.id, reload])

  function handleOpenModal() {
    setOpen(true);
  };

  function handleCloseModal() {
    setOpen(false);
  };

  const checkExistence = () => {
    console.log(selectedExpresions)
    if(selectedExpresions.length == 0){
      setSnack({open : true, text: "No ha seleccionado ninguna expresión."})
      return true
    }
    for(var i in selectedExpresions){
      for(var j in listaVerTambien){
        if(selectedExpresions[i].split("t")[1] == listaVerTambien[j].id){
          setSnack({open : true, text: "La expresión '" + listaVerTambien[j].id + " - " + listaVerTambien[j].expresion + "' ya está vinculada."})
          return true
        }
      }
    }
    return false
  }

  const add = () => {
    if(!checkExistence()){
      setLoading(true)
      addVT(props.expresion.id, 0, selectedExpresions, () => {
        setLoading(false)
        setSnack({open : true, text: "Se ha(n) vinculado el/los expresión(es) con éxito."})
        setReload(!reload)
      })
    }
  }

  function handleClose() {
    setSnack({open: false, text: ""});
  }

  const addEToList = (id) => {
    console.log(id)
    var se = selectedExpresions
    if(se.indexOf(id) < 0) se.push(id)
    else se.splice(selectedExpresions.indexOf(id), 1)
    document.getElementById(id).classList.toggle("selected")
    setSelectedExpresions(se)
  }

  const handleClickEliminarVT=(expresion)=>{
    var service = "/vertambien/" + props.expresion.id + "/" + expresion.id
    adminService(service, "DELETE", {}, (datax) => {
      setSnack({open : true, text: "Se ha eliminado el vínculo con la expresión."})
      setReload(!reload)
    })
  }

  const handleChangeBusquedaVerTambien = (event) => {
    var expresionVertBuscada=event.target.value
    expresiones.map(expresionp=>{
      var expresionVertNombre=expresionp.t_id + expresionp.t_term_de + expresionp.t_term_es
      var expresionVertEncontrada= expresionVertNombre.indexOf(expresionVertBuscada)
      // console.log("expresion buscada",expresionVertBuscada)
      document.getElementById("vertam"+expresionp.t_id).classList.remove("hiddenE")
      if (expresionVertEncontrada == -1){
        document.getElementById("vertam"+expresionp.t_id).className += " hiddenE";
      }
    })
  }

  return(
    <div>
      <Tooltip title="Ver También">
        <IconButton onClick={() => handleOpenModal()}>
          <Share/>
        </IconButton>
      </Tooltip>
      <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={handleCloseModal}
      >
        <Paper className={classes.modalinj}>
          <Grid container alignItems="center">
            <Grid item xs={11}>
              <Typography variant="h3">
                Ver También
              </Typography>
            </Grid>
            <Grid item xs={1} align="center">
              <IconButton
                aria-haspopup="true"
                onClick={handleCloseModal}
                className={classes.botonClearj}
              >
                <ClearIcon fontSize="small"/>
              </IconButton>
            </Grid>
          </Grid><br/>
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
          {/* <List className={classes.listacontenedor}>
            {listaVerTambien.map(expresion=>{
              console.log(listaVerTambien)
              return (
                <ListItem
                  key={expresion.id}
                  className={classes.listaitemj}
                >
                  <ListItemText
                    primary={expresion.expresion + " // " + expresion.traduccion}
                  />
                  <ListItemSecondaryAction>
                    <IconButton size="small" onClick={() => handleClickEliminarVT(expresion)}>
                      <ClearIcon fontSize="small"/>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>)
            })}
          </List> */}
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
              onChange={handleChangeBusquedaVerTambien}
            />
          </FormControl>
          <List className={classes.listacontenedor}>
            {props.expresiones.map(expresionp=>(
              <li 
                id={'vt'+expresionp.t_id}
                key={expresionp.t_id} 
                className={"sideList"} 
                onClick={() => addEToList("vt"+expresionp.t_id)}>
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
        </Paper>
      </Modal>
    </div>
  )
}

export default withStyles(estiloModalJerarquiaHijos)(ModalVerTambien);
