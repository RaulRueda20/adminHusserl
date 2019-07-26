import React, {useState} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';

import Expresiones from './Expresiones'

const styleList = {
  lista:{
     width:"100% !important",
     maxWidth: 1160,
     maxHeight: "32px"
  },
  contenedorLista:{
    backgroundColor: "#5dab70",
    overflow: "auto",
    height: "100%"
  }
}

const letras = [{value:'A', label:'A'},{value:'B', label:'B'},{value:'C', label:'C'},{value:'D', label:'D'},
                {value:'E', label:'E'},{value:'F', label:'F'},{value:'G', label:'G'},{value:'H', label:'H'},
                {value:'I', label:'I'},{value:'J', label:'J'},{value:'K', label:'K'},{value:'L', label:'L'},
                {value:'M', label:'M'},{value:'N', label:'N'},{value:'O', label:'O'},{value:'P', label:'P'},
                {value:'Q', label:'Q'},{value:'R', label:'R'},{value:'S', label:'S'},{value:'T', label:'T'},
                {value:'U', label:'U'},{value:'V', label:'V'},{value:'W', label:'W'},{value:'X', label:'X'},
                {value:'Y', label:'Y'},{value:'Z', label:'Z'}]

function ListaLetras (props){
  const { classes }= props;

  const handleChangeLetraMain = (event) => {
    props.setLetraMain(event.target.value)
  };

  console.log(props.letraMain)

  return(
    <div>
      <div className={classes.contenedorLista}>
        <List className={classes.lista}>
          <Grid container
            direction="row"
            justify="center"
            alignItems="center"
          >
            {letras.map(letra =>(
              <Grid item key={letra.label}>
                <ListItem button onClick={handleChangeLetraMain}>
                  {letra.value}
                </ListItem>
              </Grid>
            ))}
          </Grid>
        </List>
      </div>
    </div>
  )
}

export default withStyles(styleList)(ListaLetras);
