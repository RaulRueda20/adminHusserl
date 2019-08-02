import React from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';

import {webService, adminService} from '../../../js/webServices';

import ListaExpresiones from './ListaExpresiones';
import Busqueda from './Busqueda';
import NuevaExpresion from './NuevaExpresion';
import ListaLetras from './ListaLetras';

export default function Expresiones(props){
  const [expresiones, setExpresiones] = React.useState([]);
  const [letraMain, setLetraMain] = React.useState('A');
  const [idExpresion, setIdExpresion] = React.useState([1]);
  // const [expresionSeleccionada, setExpresionSeleccionada] = React.useState([]);

  // React.useEffect(
  //   ()=>{
  //   (letraMain =>{
  //     service = `/expresiones/al/A`
  //     webService(service, "GET", {}, (data) => {
  //       expresiones(data.data.response)
  //       })
  //      }
  //     )
  // },[letraMain])

  React.useEffect(()=>{
    var service = "/expresiones/todas/" + letraMain
    webService(service, "GET", {}, (data) => {
      setExpresiones(data.data.response)
      setIdExpresion(data.data.response[0].id)
    })
  }, [letraMain])

  return(
    <div>
        <Grid container>
          <Grid item xs={12}>
            <ListaLetras letraMain={letraMain} setLetraMain={setLetraMain}/>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={3} style={{borderRight:"1px rgb(240, 240, 240) solid"}}>
            <Busqueda/><br/>
            <ListaExpresiones expresiones={expresiones} idExpresion={idExpresion} setIdExpresion={setIdExpresion}/>
          </Grid>
          <Grid item xs={9} align="center">
            <br/>
            <NuevaExpresion expresionSeleccionada={idExpresion}/>
          </Grid>
        </Grid>
    </div>
  )
}
