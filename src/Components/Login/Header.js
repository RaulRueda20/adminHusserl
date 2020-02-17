import React from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Divider from "@material-ui/core/Divider"

const stylesHed = {
  subtitulo1:{
    marginTop: "10px",
  },
  Header:{
    marginTop:"30px"
  }
}

class Header extends React.Component{

  render(){
    const { classes } = this.props;
    return(
      <div>
        <Grid className="gridsLogin" container justify="center">
          <Grid item xs={12} className={classes.Header} align="center">
            <Typography variant="h1" align="center">
              Diccionario Husserl
            </Typography>
          </Grid>
          <Grid item xs={12}>
          <Typography className={classes.subtitulo1} variant="h3" align="center">
            Portal Administrativo
            </Typography>
          </Grid>
        </Grid>
        <br/>
        <Divider className="divisor"/>
      </div>
    )
  }
}

export default withStyles(stylesHed)(Header);
