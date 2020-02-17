import React from 'react';
import classNames from 'classnames';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from "@material-ui/core/Divider";
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import {adminService} from '../../js/webServices';
import Snackbar from '@material-ui/core/Snackbar';
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
  const [idiomaActual, setIdiomaActual] = React.useState('D')
  const [tituloGuia, setTituloGuia]=React.useState("Über das")
  const [loading, setLoading] = React.useState(false)
  const [snack, setSnack] = React.useState({open : false, text : ""})
  const [reload, setReload] = React.useState(true)

  React.useEffect(()=>{
    setLoading(true)
    var service = "/acerca_de/get"
    adminService(service, "GET", {}, (data) =>{
      setContenidoGuia(data.data.response[0])
      switch(tituloGuia){
        case "Über das":
          setContenidoEditorGuia(data.data.response[0].contenido_de)
          break
        case "Acerca de":
          setContenidoEditorGuia(data.data.response[0].contenido)
          break
        case "About":
          setContenidoEditorGuia(data.data.response[0].contenido_en)
          break
        case "A propos":
          setContenidoEditorGuia(data.data.response[0].contenido_fr)
          break
        case "Acerca":
          setContenidoEditorGuia(data.data.response[0].contenido_ca)
          break
      }
      setLoading(false)
    })
  }, [reload])

  const saveContent=()=>{
    setLoading(true)
    var service = "/acerca_de/update" + idiomaActual
    adminService(service, "POST", JSON.stringify({"content" : contenidoEditorGuia}), (data) => {
        setSnack({open : true, text: "El texto se ha guardado con éxito."})
        setLoading(false)
        setReload(!reload)
    })
    // var service = "/acerca_de/get"
    // adminService(service, "GET", {}, (data) =>{
    //   setContenidoGuia(data.data.response[0])
    //   setContenidoEditorGuia(data.data.response[0].contenido)
    // })
  }

  const handleClickEsp=()=>{
    setContenidoEditorGuia(contenidoGuia.contenido);
    setTituloGuia("Acerca de");
    setIdiomaActual('')
  }

  const handleClickAl=()=>{
    setContenidoEditorGuia(contenidoGuia.contenido_de);
    setTituloGuia("Über das");
    setIdiomaActual('D')
  }

  const handleClickIn=()=>{
    setContenidoEditorGuia(contenidoGuia.contenido_en);
    setTituloGuia("About");
    setIdiomaActual('E')
  }

  const handleClickFr=()=>{
    setContenidoEditorGuia(contenidoGuia.contenido_fr);
    setTituloGuia("A propos");
    setIdiomaActual('F')
  }

  const handleClickCa=()=>{
    setContenidoEditorGuia(contenidoGuia.contenido_ca);
    setTituloGuia("Acerca");
    setIdiomaActual('C')
  }

  return(
    <div>
      <div>
        <Snackbar
          anchorOrigin={{ vertical : "top", horizontal : "left" }}
          key={`top,left`}
          open={snack.open}
          onClose={() => setSnack({"content" : contenidoEditorGuia})}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{snack.text}</span>}
        />
        <LinearProgress className={classNames([{"hidden" : !loading}, "loadingBar"])}/>
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
              className={classNames({"selectedButton" : tituloGuia == 'Acerca de'})}
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
              className={classNames({"selectedButton" : tituloGuia == 'Acerca'})}
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
               onChange={ ( event, editor ) => {
                 setContenidoEditorGuia(editor.getData())
               } }
           />
        </div>
      </div>
      <Divider className="divisor"/>
      <div className={classes.contenedorbontonguardar}>
        <Button
          variant="contained"
          onClick={saveContent}
          className={classes.botonguardar}
        >
          Guardar
        </Button>
      </div>
    </div>
  )
}
 export default withStyles(acercade)(Acercade);
