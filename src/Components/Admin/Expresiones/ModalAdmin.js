import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ClearIcon from '@material-ui/icons/Clear';
import Tooltip from '@material-ui/core/Tooltip';
import Add from '@material-ui/icons/AddCircle';
import { withStyles } from '@material-ui/styles';

import es from "../../../Imagenes/spain.png";
import al from "../../../Imagenes/germany.png";

import FormularioExpresiones from './FormularioExpresiones';

const estiloModalExpresiones = theme => ({
  Boton1:{
    width:"80%"
  },
  modalin:{
    width: "60%",
    left: "20vw",
    top: "20vh",
    position:"absolute",
    padding: "30px",
    maxHeight: "450px",
    overflowY: "auto"
  },
  contenedorSubtitulos:{
    width:"100%",
    padding: "15px 15px"
  },
  botonClear:{
    left: "210px",
    bottom: "20px"
  },
  botonAgregar:{
    width:"50%",
    left:"50%",
  }
})

function ModalAdmin(props){
  const { classes } = props;
  const [indiceLang, setIndicelang] = React.useState("al");
  const [open, setOpen] = React.useState(false);

  const [expresionLetraIndice, setExpresionLetraIndice] = React.useState('A')
  const [expresion, setExpresion] = React.useState('')
  const [expresionContenido, setExpresionContenido] = React.useState('')

  const [traduccionLetraIndice, setTraduccionLetraIndice] = React.useState('A')
  const [traduccion, setTraduccion] = React.useState('')
  const [traduccionContenido, setTraduccionContenido] = React.useState('')

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAl = () => {
    setIndicelang("al");
  };

  const handleEs = () => {
    setIndicelang("es");
  };

  return(
    <div>
      <Tooltip title="Agregar expresión">
        <IconButton onClick={()=>handleOpen()}>
          <Add/>
        </IconButton>
      </Tooltip>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <Paper className={classes.modalin}>
          <Grid container className={classes.contenedorSubtitulos}>
            <Grid item xs={8}>
              <Typography variant="h3">
                Nueva Expresión
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <IconButton
                onClick={handleClose}
                className={classes.botonClear}
              >
                <ClearIcon fontSize="small"/>
              </IconButton>
            </Grid>
          </Grid>
          {indiceLang == "al" ? 
            <FormularioExpresiones 
              expresion={expresion} setExpresion={setExpresion}
              letra={expresionLetraIndice} setLetra={setExpresionLetraIndice} 
              contenido={expresionContenido} setContenido={setExpresionContenido}
              indiceLang={indiceLang} handleLang={handleEs} flag={es}
              label="Expresión"/> : 
            <FormularioExpresiones 
              expresion={traduccion} setExpresion={setTraduccion}
              letra={traduccionLetraIndice} setLetra={setTraduccionLetraIndice} 
              contenido={traduccionContenido} setContenido={setTraduccionContenido}
              indiceLang={indiceLang} handleLang={handleAl} flag={al}
              label="Traducción"/>}
          <Button
            variant="contained"
            className={classes.botonAgregar}
          >
            Agregar
          </Button>
        </Paper>
      </Modal>
    </div>
  )
}

export default withStyles(estiloModalExpresiones)(ModalAdmin);
