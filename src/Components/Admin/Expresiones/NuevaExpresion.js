import React from 'react';
import { withStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import InfoExpresiones from './InfoExpresiones';
import CartaPasajes from './CartaPasajes';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import ModalAgregarPasaje from './ModalAgregarPasaje';
import Tooltip from '@material-ui/core/Tooltip';
import Alertas from './Alertas';
import Snackbar from '@material-ui/core/Snackbar';
import {adminService} from '../../../js/webServices';

const stylebonton = {
  contenedorPaper:{
    width:"100%"
  },
  contenedorPasajes:{
    width:"100%",
    maxHeight: "30vh",
    overflow: "scroll"
    // paddingTop: "10px",
    // paddingRight: "807px"
  }
}

const emptyObj = {
  clave: "",
  epretty: "",
  expresion_original: "",
  expresion_traduccion: "",
  id: null,
  orden: null,
  ref_original: "",
  ref_traduccion: "",
  refid: "",
  tpretty: ""}

function NuevaExpresion(props){
  const { classes } = props;
  const [expresion, setExpresion] = React.useState(emptyObj)
  const [pasajes, setPasajes] = React.useState([]);
  const [openAp, setOpenAp] = React.useState(false);
  const [openAl, setOpenAl] = React.useState(false);
  const [snack, setSnack] = React.useState({open : false, text : ""})
  const [pasajeToDelete, setPasajeToDelete] = React.useState("")
  const [reload, setReload] = React.useState(true);
  const [reloadExpresion, setReloadExpresion] = React.useState(true);

  React.useEffect(()=>{
    console.log("Nueva Expresion", props.expresionSeleccionada)
    if(props.expresionSeleccionada != ""){
      var service = "/referencias/obtieneReferenciasByTerm/" + props.expresionSeleccionada
      adminService(service, "GET", {}, (expresionEncontrada) => {
        // console.log(props.expresion)
        console.log(expresionEncontrada)
        // console.log(expresionEncontrada.data.response[0])
        if(expresionEncontrada.data.response.length > 0){
          setExpresion(expresionEncontrada.data.response[0])
          setPasajes(expresionEncontrada.data.response)
        }else{
          adminService("/expresiones/byId/" + props.expresionSeleccionada, "GET", {}, (expresionS) => {
            console.log(expresionS.data.response[0])
            setExpresion(expresionS.data.response[0])
          })
          setPasajes([])
        }
        // adminService("/referencias/obtieneReferencias/" + props.expresionSeleccionada, "GET", {}, (data) => {
        //   console.log("pasajes", data.data.response)
        //   setPasajes(data.data.response)
        // })
      })
    }else{
      setExpresion(emptyObj)
      setPasajes([emptyObj])
    }

  }, [props.expresionSeleccionada, props.reload, reloadExpresion])

  function handleClickOpenAp() {
    setOpenAp(true);
  }

  function handleCloseAp() {
    setOpenAp(false);
  }

  function handleClickOpenAl() {
    setOpenAl(true);
  }

  function handleCloseAl() {
    setOpenAl(false);
  }

  function deletePasaje(refid){
    console.log("ok", refid)
    var service2 = "/referencias/quitarPasaje/" + refid + "/" + expresion.id
    adminService(service2, "DELETE", {}, (data) => {
      console.log(data)
      setSnack({open : true, text: "Pasaje desasociado con éxito."})
      setOpenAl(false);
      setReloadExpresion(!reloadExpresion)
    })
  }

  return (
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
      <div className={classes.contenedorPaper}>
        <InfoExpresiones expresionSeleccionada={expresion} expresionId={props.expresionSeleccionada} setExpresionId={props.setExpresionSeleccionada} 
          reload={props.reload} setReload={props.setReload} reloadExpresion={reloadExpresion} setReloadExpresion={setReloadExpresion}/>
      </div>
      <Grid container>
        <Grid item  xs={10}>
          <Typography variant="h3">
            Pasajes
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Tooltip title="Agregar Pasaje">
            <IconButton onClick={()=>handleClickOpenAp()}>
              <AddIcon/>
            </IconButton>
          </Tooltip>
          <ModalAgregarPasaje expresion={expresion} openAp={openAp} handleCloseAp={handleCloseAp} 
            reload={reloadExpresion} setReload={setReloadExpresion}/>
        </Grid>
      </Grid>
      <Grid container className={classes.contenedorPasajes} spacing={1}>
        {
          pasajes.map(pasaje =>
            <Grid key={pasaje.refid} item xs={6} sm={4} md={3} lg={2}>
              <CartaPasajes setPasajeToDelete={setPasajeToDelete} 
                pasaje={pasaje} deletePasaje={handleClickOpenAl} 
                openAlert={handleClickOpenAl} reload={reloadExpresion} setReload={setReloadExpresion}/>
            </Grid>
          )
        }
      </Grid>
      <Alertas text="¿Desea deshacer la relación del pasaje con la expresión?" openAl={openAl} handleCloseAl={handleCloseAl} accept={() => deletePasaje(pasajeToDelete)}/>
    </div>
  )

}

export default withStyles(stylebonton)(NuevaExpresion);
