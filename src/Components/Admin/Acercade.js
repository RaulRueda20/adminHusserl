import React from 'react';
import classNames from 'classnames';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from "@material-ui/core/Divider";
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';

import {adminService} from '../../js/webServices';

import '../../css/manual.css';

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
    textAlign: "center"
  },
  contenedoreditoracercade:{
    paddingLeft:"450px",
    paddingTop:"30px"
  },
  contenedorbontonguardar:{
    paddingLeft:"50%"
  },
  botonguardar:{
    width:"calc(100% - 25px)"
  },
  editor:{
    padding: "0px 25px"
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
    setTituloGuia("Acerca de");
  }

  return(
    <div>
      <div>
        <Grid container>
          <Grid item xs={12}>
            <Button
              variant="contained"
              size="small"
              onClick={handleClickAl}
              className={classNames({"selectedButton" : tituloGuia == 'Über das'})}
            >
              Aleman
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={handleClickEsp}
              className={classNames({"selectedButton" : tituloGuia == 'Guía'})}
            >
              Español
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={handleClickIn}
              className={classNames({"selectedButton" : tituloGuia == 'About'})}
            >
              Inglés
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={handleClickFr}
              className={classNames({"selectedButton" : tituloGuia == 'A propos'})}
            >
              Francés
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={handleClickCa}
              className={classNames({"selectedButton" : tituloGuia == 'Acerca de'})}
            >
              Catalán
            </Button>
          </Grid>
        </Grid>
      </div>
      <Divider/>
      <div className={classes.acerdaDe}>
        <Typography variant="h3">
          {tituloGuia}
        </Typography>
      </div>
      <Divider className="divisor"/>
      <div>
        <div className={classes.editor} id="manual">
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
