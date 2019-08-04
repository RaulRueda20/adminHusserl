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

  React.useEffect(()=>{
    if(props.expresionSeleccionada != ""){
      var service = "/referencias/obtieneReferenciasByTerm/" + props.expresionSeleccionada
      adminService(service, "GET", {}, (expresionEncontrada) => {
        // console.log(expresionEncontrada)
        // console.log(expresionEncontrada.data.response[0])
        if(expresionEncontrada.data.response.length > 0){
          setExpresion(expresionEncontrada.data.response[0])
          setPasajes(expresionEncontrada.data.response)
        }else{
          setExpresion(emptyObj)
          setPasajes([emptyObj])
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

  }, [props.expresionSeleccionada])

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

  function deletePasaje(){
    console.log("ok")
    setOpenAl(false);
  }

  return (
    <div>
      <div className={classes.contenedorPaper}>
        <InfoExpresiones expresionSeleccionada={expresion} expresionId={props.expresionSeleccionada}/>
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
          <ModalAgregarPasaje openAp={openAp} handleCloseAp={handleCloseAp}/>
        </Grid>
      </Grid>
      <Grid container className={classes.contenedorPasajes} spacing={1}>
        {
          pasajes.map(pasaje =>
            <Grid key={pasaje.refid} item xs={6} sm={4} md={3} lg={2}>
              <CartaPasajes pasaje={pasaje} deletePasaje={handleClickOpenAl}/>
            </Grid>
          )
        }
      </Grid>
      <Alertas text="¿Desea deshacer la relación del pasaje con la expresión?" openAl={openAl} handleCloseAl={handleCloseAl} accept={deletePasaje}/>
    </div>
  )

}

export default withStyles(stylebonton)(NuevaExpresion);
