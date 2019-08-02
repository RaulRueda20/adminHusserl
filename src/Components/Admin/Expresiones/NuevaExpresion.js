import React, {useState} from 'react';
import { withStyles } from '@material-ui/styles';

import Grid from '@material-ui/core/Grid';
import ModalAdmin from './ModalAdmin';
import InfoExpresiones from './InfoExpresiones';
import CartaPasajes from './CartaPasajes';

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

function NuevaExpresion(props){
  const { classes } = props;
  const [expresion, setExpresion] = React.useState({
    clave: "",
    epretty: "",
    expresion_original: "",
    expresion_traduccion: "",
    id: null,
    orden: null,
    ref_original: "",
    ref_traduccion: "",
    refid: "",
    tpretty: ""})
  const [hijos, setHijos] = React.useState([]);
  const [padres, setPadres] = React.useState([]);
  const [pasajes, setPasajes] = React.useState([]);
  
  React.useEffect(()=>{
    var service = "/referencias/obtieneReferenciasByTerm/" + props.expresionSeleccionada
    adminService(service, "GET", {}, (expresionEncontrada) => {
      setExpresion(expresionEncontrada.data.response[0])
      adminService(("/expresiones/al/abuelosList/" + props.expresionSeleccionada),"GET", {}, (data) => setPadres(data.data.response))
      adminService(("/expresiones/al/hijosList/" + props.expresionSeleccionada), "GET", {}, (data) => setHijos(data.data.response))
      adminService("/referencias/obtieneReferencias/" + props.expresionSeleccionada, "GET", {}, (data) => {
        console.log("pasajes", data.data.response)
        setPasajes(data.data.response)
      })
      // setExpresiones(data.data.response)
      // setIdExpresion(data.data.response[0].id)
    })
  }, [props.expresionSeleccionada])

  return (
    <div>
      <div>
        <ModalAdmin/>
      </div>
      <div className={classes.contenedorPaper}>
        <InfoExpresiones expresionSeleccionada={expresion} padres={padres} hijos={hijos}/>
      </div>
      <Grid container className={classes.contenedorPasajes} spacing={1}>
        {
          pasajes.map(pasaje => 
            <Grid key={pasaje.refid} item xs={6} sm={4} md={3} lg={2}>
              <CartaPasajes pasaje={pasaje}/>
            </Grid>
          )
        }
      </Grid>
    </div>
  )

}

export default withStyles(stylebonton)(NuevaExpresion);
