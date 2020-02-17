import React from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { withStyles } from '@material-ui/styles';

import Snackbars from './Snackbars';
import {adminService, loginService} from '../../js/webServices';
import * as localStore from '../../js/localStore';

const stylesFor = {
 TextField1:{
    justify: 'center',
    width:"100%",
   },
  TextField2:{
     justify: 'center',
     width:"100%",
   }
 }

var setStore = (user, pass) => {
    var newSession = {"user" : user, "password" : pass}
    newSession['ultimasVisitadas'] = []
    newSession["ultimaVisitada"] = "alfabeto"
    localStore.setObjects("sesion", newSession)
    // linkTo("main.html")
}

function LoginForm(props){
  const {classes}=props;
  const [correo, setCorreo]=React.useState("");
  const [password, setPassword]=React.useState("");
  const [snackbar, setSnackbar]=React.useState({open:false, variant:"", message:""});
  const [loading, setLoading]=React.useState(false);

  function onFormSubmit(event){
    event.preventDefault();
    if(correo=="" || password == ""){
      setSnackbar({open:true,variant:"error",message:"Correo o password incorrecto"})
    }else{
      setLoading(true);
      var params = ({"email" : correo, "user_password" : password})
      var service = "/login/admin?userId=" + correo + "&password=" + password
      loginService(service, "GET", params, (data) => {
        console.log(data)
        setLoading(false)
        if(data.data.error == null){
          console.log("Passed")
          localStorage.removeItem("admin_sesion")
          localStore.setObjects("admin_sesion", data.response)
          document.getElementById("toMain").click()
        }
      })
    } 
  }

  const handleClose=(event,reason)=>{
    setSnackbar({open:false,variant:snackbar.variant,message:""})
  }

  return (
    <form onSubmit={onFormSubmit} className="formLogin">
      <br/><br/>
      <Typography variant="h3" align="center" gutterBottom >
        Inicio
      </Typography>
      <Grid className="gridsF" container direction="column" alignItems="center" spacing={2}>
        <Grid item xs={12} sm={8} lg={7} className="grids">
          <TextField
            label="Correo"
            // variant="outlined"
            id="custom-css-outlined-input"
            margin="normal"
            value={correo}
            onChange={e => setCorreo(e.target.value)}
            className={classes.TextField1}
          />
        </Grid>
        <Grid item xs={12} sm={8} lg={7} className="grids">
          <TextField
            label="Contraseña"
            // variant="outlined"
            id="custom-css-outlined-input"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={classes.TextField2}
            type = "password"
          />
        </Grid>
        <Grid item xs={12} sm={8} lg={7} className="gridsBoton">
          <Grid container justify="flex-end" className="grids">
            <Grid item>
              <Button
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
      <Snackbars snackbar={snackbar} handleClose={handleClose} lang={props.lang}/>
      <LinearProgress className={classNames([{"hidden" : !loading}, "loadingBar"])}/>
      <Link id="toMain" to="/main"/>
    </form>
  )
};

export default withStyles(stylesFor)(LoginForm);
