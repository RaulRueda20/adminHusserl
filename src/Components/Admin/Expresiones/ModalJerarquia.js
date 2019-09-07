import React from 'react';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ClearIcon from '@material-ui/icons/Clear';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/styles';

import ModalJerarquiaPadres from './ModalJerarquiaPadres';
import ModalJerarquiaHijos from './ModalJerarquiaHijos';

import Jerarquia from '@material-ui/icons/DeviceHub';

const estiloModalJerarquia={
  modalinj:{
    width: "50%",
    maxHeight:"75vh",
    left: "25vw",
    top: "12.5vh",
    position:"absolute",
    padding: "30px 30px",
    overflowY: "auto"
  },
  botonClearj:{
    // bottom: "10px",
    // size:"small"
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
  },
  menuButtons: {
    margin: "10px 0px"
  },
  Buttons:{
    marginLeft : "10px"
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
      <Tooltip title="Jerarquia de la expresión">
        <IconButton onClick={() => handleOpenModal()}>
          <Jerarquia/>
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
                Parentesco
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
          </Grid>
          <div className={classes.menuButtons}>
            <Button
              size="small"
              onClick={handleVistasPadres}
              className={classNames({"selectedButton" : vistaModal == 'padres'}, classes.Buttons)}
            >
              Padres
            </Button>
            <Button
              className={classNames({"selectedButton" : vistaModal != 'padres'}, classes.Buttons)}
              size="small"
              onClick={handleVistasHijos}
            >
              Hijos
            </Button>
          </div>
          {vistaModal == "padres" ? <ModalJerarquiaPadres padres={props.padres} expresiones={props.expresiones} expresionSeleccionada={props.expresionSeleccionada} reload={props.reload} setReload={props.setReload}/> : <ModalJerarquiaHijos expresionSeleccionada={props.expresionSeleccionada} hijos={props.hijos} expresiones={props.expresiones} reload={props.reload} setReload={props.setReload}/>}
        </Paper>
      </Modal>
    </div>

  )
}

export default withStyles(estiloModalJerarquia)(ModalJerarquia);
