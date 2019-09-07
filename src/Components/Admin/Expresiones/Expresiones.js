import React from 'react';
import Grid from '@material-ui/core/Grid';
// import { withStyles } from '@material-ui/styles';

import {adminService} from '../../../js/webServices';

import ListaExpresiones from './ListaExpresiones';
import Busqueda from './Busqueda';
import NuevaExpresion from './NuevaExpresion';
import ListaLetras from './ListaLetras';

export default function Expresiones(props){
  const [expresiones, setExpresiones] = React.useState([]);
  const [letraMain, setLetraMain] = React.useState('A');
  const [idExpresion, setIdExpresion] = React.useState("");
  const [reload, setReload] = React.useState(true);

  React.useEffect(()=>{
    var service = "/expresiones/todas/" + letraMain
    adminService(service, "GET", {}, (data) => {
      console.log("lista de expresiones", data)
      console.log("expresiones", idExpresion)
      setExpresiones(data.data.response)
      if(idExpresion === '')
        setIdExpresion(data.data.response.length > 0 ? data.data.response[0].id : "")
    })
  }, [letraMain, reload])

  return(
    <div>
        <Grid container>
          <Grid item xs={12}>
            <ListaLetras letraMain={letraMain} setLetraMain={setLetraMain} valorB={valorB} setValorB={setValorB} 
            emptyB={emptyB} setEmptyB={setEmptyB} cambioLetra={cambioLetra} setCambioLetra={setCambioLetra}
          />
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={3} style={{borderRight:"1px rgb(240, 240, 240) solid"}}>
            <Busqueda expresiones={expresiones} setExpresiones={setExpresiones} valorB={valorB} setValorB={setValorB} 
            cambioLetra={cambioLetra}
            /><br/>
            <ListaExpresiones expresiones={expresiones} idExpresion={idExpresion} setIdExpresion={setIdExpresion}/>
          </Grid>
          <Grid item xs={9} align="center">
            <NuevaExpresion expresionSeleccionada={idExpresion} setExpresionSeleccionada={setIdExpresion} reload={reload} setReload={setReload}/>
          </Grid>
        </Grid>
    </div>
  )
}
