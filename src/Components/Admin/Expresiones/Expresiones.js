import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';

import {webService} from '../../../js/webServices';

import ListaExpresiones from './ListaExpresiones';
import Busqueda from './Busqueda';
import NuevaExpresion from './NuevaExpresion';
import ListaLetras from './ListaLetras';

 export default function Expresiones(props){
  const [expresiones, setExpresiones] = React.useState([])
  const [letraMain, setLetraMain] = React.useState('')

  React.useEffect(
    ()=>{
    (letraMain =>{
      service = `/expresiones/al/${letraMain}`
      webService(service, "GET", {}, (data) => {
        setExpresiones(data.data.response)
        })
       }
      )
  },[letraMain])

  return(
    <div>
      <div>
        <Grid container>
          <Grid item xs={12}>
            <ListaLetras letraMain={letraMain} setLetraMain={setLetraMain}/>
          </Grid>
        </Grid>
      </div>
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
