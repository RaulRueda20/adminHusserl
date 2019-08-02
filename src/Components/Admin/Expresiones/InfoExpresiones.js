import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
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

import editar from "../../../Imagenes/editar.png";
import eliminar from "../../../Imagenes/basura.png";

const infoExpresiones= {
  carta:{
    maxWidth: "1000px"
  },
  titulo:{
    paddingTop:"10px"
  },
  botonesaccion:{
    paddingLeft:"120px"
  },
  contenedordeinfo:{
    borderRight: "dotted"
  },
  subtitulo:{
    paddingTop:"20px"
  },
  informaciondeexpresion:{
    paddingTop:"10px",
    paddingRight:"35px",
    fontWeight: "900 !important",
  },
  informaciondetraduccion:{
    paddingTop:"20px",
    paddingRight:"35px",
    fontWeight: "900 !important"
  }
}

function InfoExpresiones(props){
  const {classes} = props;
  const [openAl, setOpenAl] = React.useState(false);
  const [openAp, setOpenAp] = React.useState(false);

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

  console.log("hijos mandados a info", props.hijos)
  
  return(
    <div>
      <Card className={classes.carta}>
        <div>
            <Grid container>
              <Grid item xs={4} className={classes.titulo}>
                <Typography gutterBottom variant="h3">
                  Expresión
                  </Typography>
              </Grid>
              <Grid item xs={2} className={classes.botonesaccion}>
                <ModalJerarquia/>
              </Grid>
              <Grid item xs={2} className={classes.botonesaccion}>
                <ModalVerTambien/>
              </Grid>
              <Grid item xs={2} className={classes.botonesaccion}>
                <IconButton size="small" >
                  <img src={editar}/>
                </IconButton>
              </Grid>
              <Grid item xs={2} className={classes.botonesaccion}>
                <IconButton size="small" onClick={()=>handleClickOpenAl()}>
                  <img src={eliminar}/>
                </IconButton>
                <Alertas openAl={openAl} handleCloseAl={handleCloseAl}/>
              </Grid>
            </Grid>
        </div>
        <Divider className="divisor"/>
        <div>
          <CardContent>
            <Grid container>
              <Grid item xs={6} className={classes.contenedordeinfo}>
                <Typography variant="h3" className={classes.subtitulos}>
                  Información
                </Typography>
                <Typography variant="h2" className={classes.informaciondeexpresion}>
                  {"Expresion: " + props.expresionSeleccionada.expresion_original}
                </Typography>
                <Typography variant="h2" className={classes.informaciondetraduccion}>
                  {"Traducción: " + props.expresionSeleccionada.expresion_traduccion}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h3" className={classes.subtitulos}>
                  Parentesco
                </Typography>
                <Typography variant="h2" className={classes.informaciondeexpresion}>
                  {"Padre(s): " + props.padres.expresion}
                </Typography>
                <Typography ariant="h2" className={classes.informaciondeexpresion}>
                  Hijo(s):
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </div>
        <Divider className="divisor"/>
        <div>
          <CardContent>
            <Grid container>
              <Grid item  xs={10}>
                <Typography variant="h3">
                  Pasajes
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <IconButton size="small" onClick={()=>handleClickOpenAp()}>
                  <AddIcon/>
                </IconButton>
                <ModalAgregarPasaje openAp={openAp} handleCloseAp={handleCloseAp}/>
              </Grid>
            </Grid>
          </CardContent>
        </div>
      </Card>
    </div>
  )
}

export default withStyles(infoExpresiones)(InfoExpresiones);
