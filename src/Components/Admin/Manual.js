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

const manual={
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

function Manual(props){
  const {classes}=props;
  const [contenidoManual, setContenidoManual]=React.useState("")
  const [contenidoEditor, setContenidoEditor]=React.useState("")
  const [idiomaActual, setIdiomaActual] = React.useState('D')
  const [tituloManual, setTituloManual]=React.useState("Führer")
  const [loading, setLoading] = React.useState(false)
  const [snack, setSnack] = React.useState({open : false, text : ""})
  const [reload, setReload] = React.useState(true)

  React.useEffect(()=>{
    setLoading(true)
    var service = "/manual/get"
    adminService(service, "GET", {}, (data) =>{
      setContenidoManual(data.data.response[0])
      switch(tituloManual){
        case "Führer":
          setContenidoEditor(data.data.response[0].contenido_de)
          break
        case "Guía":
          setContenidoEditor(data.data.response[0].contenido)
          break
        case "Guide":
          setContenidoEditor(data.data.response[0].contenido_en)
          break
        case "Guid":
          setContenidoEditor(data.data.response[0].contenido_fr)
          break
        case "Guia":
          setContenidoEditor(data.data.response[0].contenido_ca)
          break
      }
      setLoading(false)
    })
  }, [reload])

  const saveContent=()=>{
    setLoading(true)
    var service = "/manual/update" + idiomaActual
    adminService(service, "POST", JSON.stringify({"content" : contenidoEditor}), (data) => {
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
    setLoading(true)
    setContenidoEditor(contenidoManual.contenido);
    setTituloManual("Guía");
    setIdiomaActual('')
    setLoading(false)
  }

  const handleClickAl=()=>{
    setLoading(true)
    setContenidoEditor(contenidoManual.contenido_de);
    setTituloManual("Führer");
    setIdiomaActual('D')
    setLoading(false)
  }

  const handleClickIn=()=>{
    setLoading(true)
    setContenidoEditor(contenidoManual.contenido_en);
    setTituloManual("Guide");
    setIdiomaActual('E')
    setLoading(false)
  }

  const handleClickFr=()=>{
    setLoading(true)
    setContenidoEditor(contenidoManual.contenido_fr);
    setTituloManual("Guid");
    setIdiomaActual('F')
    setLoading(false)
  }

  const handleClickCa=()=>{
    setLoading(true)
    setContenidoEditor(contenidoManual.contenido_ca);
    setTituloManual("Guia");
    setIdiomaActual('C')
    setLoading(false)
  }

  return(
    <div>
      <div>
        <Snackbar
          anchorOrigin={{ vertical : "top", horizontal : "left" }}
          key={`top,left`}
          open={snack.open}
          onClose={() => setSnack({open : false, text : ""})}
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
              className={classNames({"selectedButton" : tituloManual == 'Führer'})}
            >
              Aleman
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={handleClickEsp}
              className={classNames({"selectedButton" : tituloManual == 'Guía'})}
            >
              Español
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={handleClickIn}
              className={classNames({"selectedButton" : tituloManual == 'Guide'})}
            >
              Inglés
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={handleClickFr}
              className={classNames({"selectedButton" : tituloManual == 'Guid'})}
            >
              Francés
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={handleClickCa}
              className={classNames({"selectedButton" : tituloManual == 'Guia'})}
            >
              Catalán
            </Button>
          </Grid>
        </Grid>
      </div>
      <Divider/>
      <div className={classes.acerdaDe}>
        <Typography variant="h3">
          {tituloManual}
        </Typography>
      </div>
      <Divider className="divisor"/>
      <div>
        <div className={classes.editor} id="manual">
          <CKEditor
               editor={ ClassicEditor }
               data={contenidoEditor}
               onChange={ ( event, editor ) => {
                setContenidoEditor(editor.getData())
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
 export default withStyles(manual)(Manual);
