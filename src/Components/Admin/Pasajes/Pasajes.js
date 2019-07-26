import React from 'react';
import Grid from '@material-ui/core/Grid';

import Busqueda from '../Expresiones/Busqueda';
import ListaClaves from './ListaClaves';
import NuevoPasaje from './NuevoPasaje';

function Pasajes(props){
  const {classes}=props;
  return(
    <div>
      <div>
        <Grid container>
          <Grid item xs={3}>
            <Busqueda/>
            <ListaClaves/>
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
