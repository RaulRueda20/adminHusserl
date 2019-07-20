import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/styles';

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

const letras = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

function ListaLetras (props){
  const { classes }= props;
  return(
    <div className={classes.contenedorLista}>
      <List className={classes.lista}>
        <Grid container
          direction="row"
          justify="center"
          alignItems="center"
        >
          {letras.map(letra =>(
            <Grid item>
              <ListItem button className={classes.itemlista}>
                {letra}
              </ListItem>
            </Grid>
          ))}
        </Grid>
      </List>
    </div>
  )
}

export default withStyles(styleList)(ListaLetras);
