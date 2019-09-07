import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from "@material-ui/core/Divider";
import Grid from '@material-ui/core/Grid';
import ClearIcon from '@material-ui/icons/Clear';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import List from '@material-ui/core/List';
import { withStyles } from '@material-ui/styles';
import {adminService} from '../../../js/webServices';
import Snackbar from '@material-ui/core/Snackbar';

const modalagregar={
  modalina:{
    width: "50%",
    left: "25vw",
    top: "20vh",
    position:"absolute",
    padding: "30px",
    overflowY: "auto"
  },
  subtitulos:{
    paddingTop:"10px"
  },
  contenedorbusqueda:{
    paddingTop:"10px"
  },
  busquedaap:{
    width:"80%",
    left:"60px"
  },
  botonClearAp:{
    left: "80px",
    bottom: "10px"
  },
  botoncerrar:{
    left: "490px"
  },
  botonguardar:{
    width: "50%",
    left: "50%"
  },
  listacontenedor:{
    height: "25vh",
    overflow: "scroll"
  },
  selectedPas:{
    borderBottom: "1px rgb(150,150,150) solid"
  },
  p100:{
    width: "100%"
  }
}

function ModalAgregarPasaje(props){
  const {classes}=props;
  const [pasajes, setPasajes] = React.useState([])
  const [nivel, setNivel] = React.useState('1')
  const [selectedPasajes, setSelectedPasajes] = React.useState(null);
  const [snack, setSnack] = React.useState({open : false, text : ""})

  React.useEffect(()=>{
    var service = "/referencias/lista"
    adminService(service, "GET", {}, (data) => {
      console.log("datos de la data",data)
      setPasajes(data.data.response)
    })
  }, [true])

  const addEToList = (pasaje) => {
    document.getElementsByClassName("selectedP").length > 0 ? document.getElementsByClassName("selectedP")[0].classList.remove("selectedP") : true
    document.getElementById(pasaje.ref_id).classList.add("selectedP")
    setSelectedPasajes(pasaje)
  }

  const handleChangeN = (event) => {
    setNivel(event.target.value)
  };

  const handleClickAddPasaje=()=>{
    // console.log(selectedPasajes)
    var params = {
      'termId' : props.expresion.id,
      'orden' : parseInt(nivel),
      'referencia' : selectedPasajes.ref_id
  }
  var service = "/referencias/agregarReferencia"
  adminService(service, "POST", JSON.stringify(params), (data) =>{
    console.log("datos",data)
    setSnack({open : true, text: "Pasaje agregado con éxito."})
    props.setReload(!props.reload)
  })
  }

  return(
    <Modal
      open={props.openAp}
      onClose={props.handleCloseAp}
    >
      
      <Paper className={classes.modalina}>
        <Snackbar
          anchorOrigin={{ vertical : "top", horizontal : "left" }}
          key={`top,left`}
          open={snack.open}
          onClose={() => setSnack({open: false, text: ""}) }
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{snack.text}</span>}
        />
        <Grid container>
          <Grid item xs={11}>
            <Typography variant="h3">
              Agregar Pasaje
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <IconButton
              aria-haspopup="true"
              onClick={props.handleCloseAp}
            >
              <ClearIcon fontSize="small"/>
            </IconButton>
          </Grid>
        </Grid>
        <Divider className="divisor"/>
        <Typography variant="h4">
          Seleccione el pasaje que desea asociar con la expresión seleccionada.
        </Typography><br/>
        <Grid container alignItems="flex-end">
          <Grid item xs={10}>
            <Typography variant="h4" className={classes.selectedPas}>
              {selectedPasajes === null ? "No ha seleccionado ningún pasaje." : 
              selectedPasajes.ref_id + " - " + selectedPasajes.ref_libro_de}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <InputLabel htmlFor="nivel">Nivel</InputLabel>
            <Select
              id="nivel"
              value={nivel}
              onChange={handleChangeN}
              className={classes.p100}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
            </Select>
          </Grid>
        </Grid><br/>
        <Typography variant="h3">
          Pasajes
        </Typography><br/>
        <InputLabel htmlFor="input-with-icon-adornment">Busqueda</InputLabel>
        <Input
          className={classes.p100}
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
        <List className={classes.listacontenedor}>
          {pasajes.map(pasaje=>(
            // <li key={expresionp.t_id} className="sideList" onClick={addEToList(expresionp.t_id)}>
            <li 
              id={pasaje.ref_id}
              key={pasaje.ref_id} 
              className={"sideList"} 
              onClick={() => addEToList(pasaje)}>
                {pasaje.ref_id + " - " + pasaje.ref_libro_de + " // " + pasaje.ref_libro_es}
            </li>
          ))}
        </List>
        <Divider className="divisor"/>
        <Button className={classes.botonguardar} variant="contained" size="small" onClick={handleClickAddPasaje}>
          Agregar
        </Button>
      </Paper>
    </Modal>
  )
}

export default withStyles(modalagregar)(ModalAgregarPasaje);
