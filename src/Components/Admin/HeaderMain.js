import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import MenuHeader from './MenuHeader';

class HeaderMain extends React.Component{

  render(){
    return(
      <Grid container direction="row" justify="center" className="grids">
        <AppBar position="static" color="primary">
          <Toolbar variant="dense">
            <Grid item xs={1}>
              <MenuHeader match={this.props.match}/>
            </Grid>
            <Grid item xs={10} align="center">
              <Typography variant="h3" component="h5">
                PORTAL ADMINISTRATIVO
              </Typography>
            </Grid>
          </Toolbar>
        </AppBar>
      </Grid>
    )
  }
}


export default HeaderMain;
