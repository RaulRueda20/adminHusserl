import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Divider from "@material-ui/core/Divider";
import { withStyles } from '@material-ui/styles';

import ModalJerarquia from './ModalJerarquia';
import Alertas from './Alertas';
import ModalAgregarPasaje from './ModalAgregarPasaje';
import ModalVerTambien from './ModalVerTambien';

import {adminService} from '../../../js/webServices';

// import editar from "../../../Imagenes/editar.png";
import Create from "@material-ui/icons/Create";
import Delete from "@material-ui/icons/Delete";

const infoExpresiones= {
  titulo:{
    paddingTop:"10px"
  },
  botonesaccion:{
    // paddingLeft:"120px"
  },
  contenedordeinfo:{
    borderRight: "lightgrey 1px dashed"
  },
  subtitulo:{
    paddingTop:"20px"
  },
  infoPanel:{
    padding: "25px 0px"
  },
  w100: {
    width : "100% !important"
  },
  scrolledHeight: {
    maxHeight: "100px",
    overflow: "scroll"
  }
  // informaciondeexpresion:{
  //   paddingTop:"10px",
  //   paddingRight:"35px",
  //   fontWeight: "900 !important",
  // },
  // informaciondetraduccion:{
  //   paddingTop:"20px",
  //   paddingRight:"35px",
  //   fontWeight: "900 !important"
  // }
}

function InfoExpresiones(props){
  const {classes} = props;
  const [openAl, setOpenAl] = React.useState(false);
  const [openAp, setOpenAp] = React.useState(false);
  const [hijos, setHijos] = React.useState([]);
  const [padres, setPadres] = React.useState([]);

  React.useEffect(()=>{
    adminService(("/expresiones/al/abuelosList/" + props.expresionId),"GET", {}, (data) => setPadres(data.data.response))
    adminService(("/expresiones/al/hijosList/" + props.expresionId), "GET", {}, (data) => setHijos(data.data.response))
  }, [props.expresionId])

  function handleClickOpenAl() {
    setOpenAl(true);
  }

  function handleCloseAl() {
    setOpenAl(false);
  }

  function handleClickOpenAp() {
    setOpenAp(true);
  }

  function handleCloseAp() {
    setOpenAp(false);
  }

  const paintJerarquia = (lista) => {
    var lastString = ""
    for(var i in lista){
      if(i == lista.length-1)
        lastString += lista[i].expresion + "."
      else lastString += lista[i].expresion + ", "
    }
    return lastString
  }

  return(
    <div>
      <Grid container className={classes.titulo}>
        <Grid item xs={8} className={classes.titulo}>
          <Typography gutterBottom variant="h3">
            {props.expresionSeleccionada.expresion_original + " // " + props.expresionSeleccionada.expresion_traduccion}
          </Typography>
        </Grid>
        <Grid item xs={1} className={classes.botonesaccion}>
          <ModalJerarquia/>
        </Grid>
        <Grid item xs={1} className={classes.botonesaccion}>
          <IconButton>
            <Create/>
          </IconButton>
        </Grid>
        <Grid item xs={1} className={classes.botonesaccion}>
          <ModalVerTambien/>
        </Grid>
        <Grid item xs={1} className={classes.botonesaccion}>
          <IconButton onClick={()=>handleClickOpenAl()}>
            <Delete/>
          </IconButton>
          <Alertas openAl={openAl} handleCloseAl={handleCloseAl}/>
        </Grid>
      </Grid>
      <Divider className="divisor"/>
      <Grid container className={classes.infoPanel}>
        <Grid item xs={6} className={classes.contenedordeinfo}>
          <Typography variant="h3" className={classes.subtitulos}>
            Información
          </Typography><br/><br/>
          <Grid container spacing={2} className={classes.w100}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h4" className={classes.informaciondeexpresion}>
                <b>Expresión: </b>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h4" className={classes.informaciondeexpresion}>
                {props.expresionSeleccionada.expresion_original}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="h4" className={classes.informaciondeexpresion}>
                <b>Traducción: </b>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h4" className={classes.informaciondeexpresion}>
                {props.expresionSeleccionada.expresion_traduccion}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="h3" className={classes.subtitulos}>
            Parentesco
          </Typography><br/><br/>
          <Grid container spacing={2} className={classes.w100}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h4" className={classes.informaciondeexpresion}>
                <b>Padre(s): </b>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.scrolledHeight}>
              <Typography variant="h4" className={classes.informaciondeexpresion}>
                {padres.length > 0 ? paintJerarquia(padres) : null}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="h4" className={classes.informaciondeexpresion}>
                <b>Hijo(s): </b>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.scrolledHeight}>
              <Typography variant="h4" className={classes.informaciondeexpresion}>
                {hijos.length > 0 ? paintJerarquia(hijos) : null}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider className="divisor"/>
      <Grid container>
        <Grid item  xs={10}>
          <Typography variant="h3">
            Pasajes
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <IconButton onClick={()=>handleClickOpenAp()}>
            <AddIcon/>
          </IconButton>
          <ModalAgregarPasaje openAp={openAp} handleCloseAp={handleCloseAp}/>
        </Grid>
      </Grid>
    </div>
  )
}

export default withStyles(infoExpresiones)(InfoExpresiones);
