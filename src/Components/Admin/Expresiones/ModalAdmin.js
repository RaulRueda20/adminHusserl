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
import SwipeableViews from 'react-swipeable-views';
import Snackbar from '@material-ui/core/Snackbar';
import {adminService} from '../../../js/webServices';

import es from "../../../Imagenes/spain.png";
import al from "../../../Imagenes/germany.png";

import FormularioExpresiones from './FormularioExpresiones';

const estiloModalExpresiones = theme => ({
  Boton1:{
    width:"80%"
  },
  modalin:{
    top: "25vh",
    left: "calc(20vw - 30px)",
    width: "60vw",
    padding: "20px 30px",
    position: "absolute",
    height: "50vh"
  },
  contenedorSubtitulos:{
    width:"100%",
    padding: "15px 15px"
  },
  botonClear:{
    // left: "210px",
    // bottom: "20px"
  },
  botonAgregar:{
    width:"50%",
    left:"50%",
  }
})

const emptyObjectExp={
  indice_es:"",
  indice_de:"",
  pretty_es:"",
  pretty_de:"",
  expresion:"",
  traduccion:""
}

function ModalAdmin(props){
  const { classes } = props;
  const [indiceLang, setIndicelang] = React.useState("al");
  const [open, setOpen] = React.useState(false);
  const [vista, setVista] = React.useState(0)
  const [expresionLetraIndice, setExpresionLetraIndice] = React.useState('A')
  const [expresion, setExpresion] = React.useState('')
  const [expresionContenido, setExpresionContenido] = React.useState('')

  const [traduccionLetraIndice, setTraduccionLetraIndice] = React.useState('A')
  const [traduccion, setTraduccion] = React.useState('')
  const [traduccionContenido, setTraduccionContenido] = React.useState('')
  const [snack, setSnack] = React.useState({open : false, text : ""})

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAl = () => {
    setVista(0);
  };

  const handleEs = () => {
    setVista(1);
  };

  const handleClickNueva=()=>{
    var params={
        'indice_es' : traduccionLetraIndice,
        'indice_de' : expresionLetraIndice,
        'pretty_es' : traduccionContenido,
        'pretty_de' : expresionContenido,
        'expresion' : expresion,
        'traduccion' : traduccion
    }
    var service = "/expresiones/nuevaExpresion/"
    adminService(service, "POST", JSON.stringify(params), (data) =>{
        setSnack({open : true, text: "Expresión creada con éxito."})
        setOpen(false)
        props.setReload(!props.reload)
        // console.log("datos",data)
    })
}

  return(
    <div>
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
          <Grid container className={classes.contenedorSubtitulos} alignItems="center">
            <Grid item xs={11}>
              <Typography variant="h3">
                Nueva Expresión
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <IconButton
                onClick={handleClose}
                className={classes.botonClear}
              >
                <ClearIcon fontSize="small"/>
              </IconButton>
            </Grid>
          </Grid>
          <SwipeableViews axis={ vista == 0 ? 'x-reverse' : 'x'}
            index={vista}
            onChangeIndex={setVista}>
            <FormularioExpresiones 
              expresion={expresion} setExpresion={setExpresion}
              letra={expresionLetraIndice} setLetra={setExpresionLetraIndice} 
              contenido={expresionContenido} setContenido={setExpresionContenido}
              indiceLang={indiceLang} handleLang={handleEs} flag={es}
              label="Expresión"/>
            <FormularioExpresiones 
              expresion={traduccion} setExpresion={setTraduccion}
              letra={traduccionLetraIndice} setLetra={setTraduccionLetraIndice} 
              contenido={traduccionContenido} setContenido={setTraduccionContenido}
              indiceLang={indiceLang} handleLang={handleAl} flag={al}
              label="Traducción"/>
          </SwipeableViews>
          <Button
            variant="contained"
            className={classes.botonAgregar}
            onClick={handleClickNueva}
          >
            Agregar
          </Button>
        </Paper>
      </Modal>
    </div>
  )
}

export default withStyles(estiloModalExpresiones)(ModalAdmin);
