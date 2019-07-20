import React from 'react';
import Grid from '@material-ui/core/Grid';

import ListaExpresiones from './listaExpresiones';
import Busqueda from './Busqueda';
import NuevaExpresion from './NuevaExpresion';
import ListaLetras from './ListaLetras';



export default function Expresiones(){
  return(
    <Grid container>
      <Grid item xs={12} align="center">
        <ListaLetras />
      </Grid>
      <Grid item xs={3}>
        <Busqueda/>
        <ListaExpresiones/>
      </Grid>
      <Grid item xs={9} align="center">
        <br/>
        <NuevaExpresion/>
      </Grid>
    </Grid>
  )
}
