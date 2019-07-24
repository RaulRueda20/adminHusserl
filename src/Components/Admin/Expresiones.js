import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';

import {webService} from '../../js/webServices';

import ListaExpresiones from './ListaExpresiones';
import Busqueda from './Busqueda';
import NuevaExpresion from './NuevaExpresion';
import ListaLetras from './ListaLetras';


 export default function Expresiones(props){
  const [expresiones, setExpresiones] = React.useState([])

  React.useEffect(()=>{
    var service = "/expresiones/al/A"
    webService(service, "GET", {}, (data) => {
      console.log(data)
      setExpresiones(data.data.response)
    })
  }, [])

  console.log(expresiones)
  return(
    <div>
      <div>
        <Grid container>
          <Grid item xs={3}>
            <Busqueda/>
            <ListaExpresiones/>
          </Grid>
          <Grid item xs={9} align="center">
            <br/>
            <NuevaExpresion/>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}
