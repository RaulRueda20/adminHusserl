import React from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/styles';

import Alerts from '../Alerts';
import {adminService} from '../../js/webServices';
import * as localStore from '../../js/localStore';

const stylesFor = {
 TextField1:{
    justify: 'center',
    width:"100%",
   },
  TextField2:{
     justify: 'center',
     width:"100%",
  },
  gridsF : {
    margin: "7.5vh 2.5vw"
  }
 }

var setStore = (user, pass) => {
    var newSession = {"user" : user, "password" : pass}
    newSession['ultimasVisitadas'] = []
    newSession["ultimaVisitada"] = "alfabeto"
    localStore.setObjects("sesion", newSession)
    document.getElementById("toMain").click()
    // linkTo("main.html")
}

class LoginForm extends React.Component {

  state={  correo:'', password:'', alert : false, mensajeAlert : "", tituloAlert: "", loading : false}

   onFormSubmit = (event) => {
    event.preventDefault();
    this.setState({loading : true})
    var as = {"email" : this.state.correo, "user_password" : this.state.password}
    localStore.setObjects("admin_sesion", as)
    var service = "/login/admin?userId=" + this.state.correo + "&password=" + this.state.password
    adminService(service, "GET", {}, (data) => {
      console.log(data)
      this.setState({loading : false})
      if(data.data.error == null){
        // console.log("Passed")
        localStorage.removeItem("admin_sesion")
        // console.log(data.data)
        setStore(data.data.response.email, data.data.response.user_password)
        // localStore.setObjects("admin_sesion", data.response)
      }else{
        this.setState({mensajeAlert : data.data.error, alert : true, tituloAlert:"Usuario o Contreña Incorrectos"})
        localStorage.removeItem("admin_sesion")
      }
    })
  }


  handleAlertClose = () => {
    this.setState({alert:false})
  }


  render(){
    const{ correo, password } = this.state
    const { classes } = this.props;

    return (
      <form className={classes.gridsF} onSubmit={this.onFormSubmit}>
        <br/><br/>
        <Typography variant="h4" align="center" gutterBottom >
          Inicio
        </Typography><br/><br/>
        <Grid className="gridsF" container direction="column" alignItems="center" spacing={2}>
          <Grid item xs={12} sm={8} md={6} lg={5} className="grids">
            <TextField
              label="Usuario"
              // variant="outlined"
              id="custom-css-outlined-input"
              margin="normal"
              value={this.state.correo}
              onChange={e => this.setState({correo: e.target.value})}
              className={classes.TextField1}
            />
          </Grid>
          <Grid item xs={12} sm={8} md={6} lg={5} className="grids">
            <TextField
              label="Contraseña"
              // variant="outlined"
              id="custom-css-outlined-input"
              value={this.state.password}
              onChange={e => this.setState({password: e.target.value})}
              className={classes.TextField2}
              type = "password"
            />
          </Grid>
          <Grid item xs={12} sm={8} md={6} lg={5} className="grids">
            <Grid container justify="flex-end" className="grids">
              <Grid item>
                <Button
                  onClick={this.onSubmitRegistre}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                Ingresar
                </Button>
              </Grid>
            </Grid>
          </Grid>

        </Grid>
        <Alerts mensaje={this.state.mensajeAlert} open={this.state.alert} handleClose={this.handleAlertClose} titulo={this.state.tituloAlert}/>
        <LinearProgress className={classNames([{"hidden" : !this.state.loading}, "loadingBar"])}/>
        <Link id="toMain" to="/main"/>
      </form>
    )
  }
};

export default withStyles(stylesFor)(LoginForm);
