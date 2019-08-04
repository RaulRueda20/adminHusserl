import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from "@material-ui/core/Divider";
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';

import {adminService} from '../../js/webServices';

const manual={
  botonespañolm:{
    left:"2px"
  },
  botoninglesm:{
    left:"3px"
  },
  botonfrancesm:{
    left:"4px"
  },
  botoncatalanm:{
    left:"5px"
  },
  manualin:{
    paddingLeft:"670px"
  },
  contenedorbontonguardarm:{
    paddingLeft:"350px"
  },
  botonguardarm:{
    width:"70%"
  },
  editor:{
    minHeight:"350px"
  }
}

function Manual(props){
  const {classes}=props;
  const [contenidoManual, setContenidoManual]=React.useState("")
  const [contenidoEditor, setContenidoEditor]=React.useState("")
  const [tituloManual, setTituloManual]=React.useState("Guía")

  React.useEffect(()=>{
    var service = "/manual/get"
    adminService(service, "GET", {}, (data) =>{
      console.log("data",data)
      setContenidoManual(data.data.response[0])
      setContenidoEditor(data.data.response[0].contenido)
    })
  }, [])

  const handleClickEsp=()=>{
    setContenidoEditor(contenidoManual.contenido);
    setTituloManual("Guía");
  }

  const handleClickAl=()=>{
    setContenidoEditor(contenidoManual.contenido_de);
    setTituloManual("Führer");
  }

  const handleClickIn=()=>{
    setContenidoEditor(contenidoManual.contenido_en);
    setTituloManual("Guide");
  }

  const handleClickFr=()=>{
    setContenidoEditor(contenidoManual.contenido_fr);
    setTituloManual("Guide");
  }

  const handleClickCa=()=>{
    setContenidoEditor(contenidoManual.contenido_ca);
    setTituloManual("Guide");
  }

  console.log("lo que mando al editor",contenidoEditor)

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
              className={classes.botonespañolm}
              onClick={handleClickEsp}
            >
              Español
            </Button>
            <Button
              variant="contained"
              size="small"
              className={classes.botoninglesm}
              onClick={handleClickIn}
            >
              Inglés
            </Button>
            <Button
              variant="contained"
              size="small"
              className={classes.botonfrancesm}
              onClick={handleClickFr}
            >
              Francés
            </Button>
            <Button
              variant="contained"
              size="small"
              className={classes.botoncatalanm}
              onClick={handleClickCa}
            >
              Catalán
            </Button>
          </Grid>
        </Grid>
      </div>
      <Divider/>
      <div className={classes.manualin}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h3">
              {tituloManual}
            </Typography>
          </Grid>
        </Grid>
      </div>
      <Divider className="divisor"/>
      <div>
        <div className={classes.editor}>
          <CKEditor
               editor={ ClassicEditor }
               data={contenidoEditor}
               onChange={ ( event, editor ) => {
                 console.log(editor.getData())
                 setContenidoEditor(editor.getData())
               } }
           />
         </div>
      </div>
      <Divider className="divisor"/>
      <div className={classes.contenedorbontonguardarm}>
        <Button
          variant="contained"
          className={classes.botonguardarm}
        >
          Guardar
        </Button>
      </div>
    </div>
  )
}
 export default withStyles(manual)(Manual);
