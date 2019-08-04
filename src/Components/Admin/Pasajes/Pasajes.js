import React from 'react';
import Grid from '@material-ui/core/Grid';

import {adminService} from '../../../js/webServices';

import Busqueda from '../Expresiones/Busqueda';
import ListaClaves from './ListaClaves';
import NuevoPasaje from './NuevoPasaje';

function Pasajes(props){
  const {classes}=props;
  const [pasajes, setPasajes] = React.useState([])
  const [pasajeSeleccionado, setPasajeSeleccionado] = React.useState("")

  React.useEffect(()=>{
    var service = "/referencias/lista"
    adminService(service, "GET", {}, (data) => {
      setPasajes(data.data.response)
      setPasajeSeleccionado(data.data.response[0].ref_id)
    })
  }, [true])

  return (
    <div>
      <Grid container>
        <Grid item xs={3} style={{borderRight : "1px rgb(230, 230, 230) solid"}}>
          <Busqueda/>
          <ListaClaves pasajes={pasajes} pasajeId={pasajeSeleccionado} setPasajeId={setPasajeSeleccionado}/>
        </Grid>
        <Grid item xs={9}>
          <NuevoPasaje setPasajeSeleccionado={setPasajeSeleccionado} pasajeSeleccionado={pasajeSeleccionado}/>
        </Grid>
      </Grid>
    </div>
  )
}

export default Pasajes;
