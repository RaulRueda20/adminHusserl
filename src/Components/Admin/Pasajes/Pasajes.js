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
      console.log("Buscando la data",data)
      setPasajes(data.data.response)
      setPasajeSeleccionado(data.data.response[0].ref_id)
    })
  }, [true])

  return (
    <div>
      <div>
        <Grid container>
          <Grid item xs={3}>
            <Busqueda/>
            <ListaClaves pasajes={pasajes} pasajeId={pasajeSeleccionado} setPasajeId={setPasajeSeleccionado}/>
          </Grid>
          <Grid item xs={9}>
            <NuevoPasaje/>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default Pasajes;
