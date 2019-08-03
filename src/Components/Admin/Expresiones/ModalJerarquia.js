import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from "@material-ui/core/Divider";
import Grid from '@material-ui/core/Grid';
import ClearIcon from '@material-ui/icons/Clear';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/styles';
import Checkbox from '@material-ui/core/Checkbox';

import ModalJerarquiaPadres from './ModalJerarquiaPadres';
import ModalJerarquiaHijos from './ModalJerarquiaHijos';

import Jerarquia from '@material-ui/icons/DeviceHub';
// import jerarquia from "../../../Imagenes/diagrama.png";

import eliminar from "../../../Imagenes/basura.png";

const estiloModalJerarquia={
  modalinj:{
    width: "50%",
    maxHeight:"500px",
    left: "25vw",
    top: "10vh",
    position:"absolute",
    padding: "15px 10px",
    overflowY: "auto"
  },
  botonClearj:{
    bottom: "10px",
    size:"small"
  },
  botonhijos:{
    left:"10px",
    size:"small"
  },
  listaitemj:{
    borderBottom:"dotted"
  },
  busquedaj:{
    width:"90%",
    left: "30px",
  },
  contenedorbusquedaj:{
    paddingTop:"10px"
  },
  botonAgregar:{
    width:"45%",
    left:"170px"
  }
}

function ModalJerarquia(props){
  const {classes}=props;
  const [open, setOpen] = React.useState(false);
  const [vistaModal, setVistaModal] = React.useState("padres");

  function handleOpenModal() {
    setOpen(true);
  };

  function handleCloseModal() {
    setOpen(false);
  };

  const handleVistasPadres=()=>{
    setVistaModal("padres");
  }

  const handleVistasHijos=()=>{
    setVistaModal("hijos");
  }

  return(
    <div>
      <IconButton onClick={() => handleOpenModal()}>
        <Jerarquia/>
      </IconButton>
      <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={handleCloseModal}
      >
        <Paper className={classes.modalinj}>
          <Grid container>
            <Grid item xs={11}>
              <Typography variant="h3">
                Parentesco
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <IconButton
                aria-haspopup="true"
                onClick={handleCloseModal}
                className={classes.botonClearj}
              >
                <ClearIcon fontSize="small"/>
              </IconButton>
            </Grid>
          </Grid>
          <Divider className="divisor"/>
          <Grid container>
            <Grid item xs={3}>
              <Button
                variant="contained"
                size="small"
                onClick={handleVistasPadres}
              >
                Padres
              </Button>
              <Button
                variant="contained"
                className={classes.botonhijos}
                size="small"
                onClick={handleVistasHijos}
              >
                Hijos
              </Button>
            </Grid>
          </Grid>
          <div>
            {vistaModal == "padres" ? <ModalJerarquiaPadres padres={props.padres} expresiones={props.expresiones}/> : <ModalJerarquiaHijos hijos={props.hijos} expresiones={props.expresiones}/>}
          </div>
        </Paper>
      </Modal>
    </div>

  )
}

export default withStyles(estiloModalJerarquia)(ModalJerarquia);
