import React, {useState} from 'react';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from "@material-ui/core/Divider";
import Grid from '@material-ui/core/Grid';
import ClearIcon from '@material-ui/icons/Clear';
import { withStyles } from '@material-ui/styles';

import FormularioExpresiones from './FormularioExpresiones';
import FormularioTraduccion from './FormularioTraduccion';

const estiloModalExpresiones = theme => ({
  modalin:{
    width: "60%",
    left: "20vw",
    top: "20vh",
    position:"absolute",
    padding: "15px 10px",
    maxHeight: "450px",
    overflowY: "auto"
  },
  contenedorSubtitulos:{
    padding: "15px 15px"
  },
  botonClear:{
    left: "210px",
    bottom: "20px"
  }
})

function ModalAdmin(props){
  const { classes } = props;
  const [indiceLang, setIndicelang] = React.useState("al");


  const handleAl = () => {
    setIndicelang("al");
  };

  const handleEs = () => {
    setIndicelang("es");
  };

  return(
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={props.open}
        handleOpen={props.handleOpen}
      >
      <Paper className={classes.modalin}>
        <Grid container className={classes.contenedorSubtitulos}>
          <Grid item xs={8}>
            <Typography variant ="h4">
              Nueva Expresión
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <IconButton
              aria-haspopup="true"
              onClick={props.handleClose}
              className={classes.botonClear}
            >
              <ClearIcon fontSize="small"/>
            </IconButton>
          </Grid>
        </Grid>
        <Divider className="divisor"/>
        {indiceLang == "al" ? <FormularioExpresiones indiceLang={indiceLang} handleEs={handleEs}/> :  <FormularioTraduccion indiceLang={indiceLang} handleAl={handleAl}/>}
      </Paper>
      </Modal>
    </div>
  )
}

export default withStyles(estiloModalExpresiones)(ModalAdmin);
