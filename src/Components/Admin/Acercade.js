import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from "@material-ui/core/Divider";
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';

import {adminService} from '../../js/webServices';

const acercade={
  botonespañol:{
    left:"2px"
  },
  botoningles:{
    left:"3px"
  },
  botonfrances:{
    left:"4px"
  },
  botoncatalan:{
    left:"5px"
  },
  acerdaDe:{
    paddingLeft:"670px"
  },
  contenedoreditoracercade:{
    paddingLeft:"450px",
    paddingTop:"30px"
  },
  contenedorbontonguardar:{
    paddingLeft:"350px"
  },
  botonguardar:{
    width:"70%"
  },
  editor:{
    minHeight:"350px"
  }
}

function Acercade(props){
  const {classes}=props;
  const [contenidoGuia, setContenidoGuia]=React.useState("")
  const [contenidoEditorGuia, setContenidoEditorGuia]=React.useState("")
  const [tituloGuia, setTituloGuia]=React.useState("Acerca de")

  React.useEffect(()=>{
    var service = "/acerca_de/get"
    adminService(service, "GET", {}, (data) =>{
      console.log("data",data)
      setContenidoGuia(data.data.response[0])
      setContenidoEditorGuia(data.data.response[0].contenido)
    })
  }, [])

  const handleClickEsp=()=>{
    setContenidoEditorGuia(contenidoGuia.contenido);
    setTituloGuia("Guía");
  }

  const handleClickAl=()=>{
    setContenidoEditorGuia(contenidoGuia.contenido_de);
    setTituloGuia("Über das");
  }

  const handleClickIn=()=>{
    setContenidoEditorGuia(contenidoGuia.contenido_en);
    setTituloGuia("About");
  }

  const handleClickFr=()=>{
    setContenidoEditorGuia(contenidoGuia.contenido_fr);
    setTituloGuia("A propos");
  }

  const handleClickCa=()=>{
    setContenidoEditorGuia(contenidoGuia.contenido_ca);
    setTituloGuia("A propos");
  }

  console.log("Guia", contenidoEditorGuia)

  return(
    <div>
      <div>
        <Grid container>
          <Grid item xs={12}>
            <Button
              variant="contained"
              size="small"
              onClick={handleClickAl}
            >
              Aleman
            </Button>
            <Button
              variant="contained"
              size="small"
              className={classes.botonespañol}
              onClick={handleClickEsp}
            >
              Español
            </Button>
            <Button
              variant="contained"
              size="small"
              className={classes.botoningles}
              onClick={handleClickIn}
            >
              Inglés
            </Button>
            <Button
              variant="contained"
              size="small"
              className={classes.botonfrances}
              onClick={handleClickFr}
            >
              Francés
            </Button>
            <Button
              variant="contained"
              size="small"
              className={classes.botoncatalan}
              onClick={handleClickFr}
            >
              Catalán
            </Button>
          </Grid>
        </Grid>
      </div>
      <Divider/>
      <div className={classes.acerdaDe}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h3">
              {tituloGuia}
            </Typography>
          </Grid>
        </Grid>
      </div>
      <Divider className="divisor"/>
      <div>
        <div className={classes.editor}>
          <CKEditor
               editor={ ClassicEditor }
               data={contenidoEditorGuia}
           />
        </div>
      </div>
      <Divider className="divisor"/>
      <div className={classes.contenedorbontonguardar}>
        <Button
          variant="contained"
          className={classes.botonguardar}
        >
          Guardar
        </Button>
      </div>
    </div>
  )
}
 export default withStyles(acercade)(Acercade);
