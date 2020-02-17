import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/styles';

const infopasajes={
  cartainfodepasajes:{
    maxWidth:"100%",
  },
  textCont : {
    padding: "0px 20px"
  },
  headerContainer : {
    padding: "20px 0px"
  },
  textfieldlista:{
    width: "100%",
    // padding: "0px 30px"
    // paddingLeft: "150px"
  },
  botoneliminarpasaje:{
    paddingTop:"10px"
  },
  botonEs:{
    left:"5px"
  },
  contenedorselectpasaje:{
    width: "100%"
  },
  textopasaje:{
    bottom:"6px",
    paddingLeft:"3px",
  },
  contenedoreditorpasaje:{
    width: "100%",
    padding: "25px"
  },
  headerPasajes:{
    marginTop: "25px",
    padding: "0px 25px"
  }
}

function InfoPasajes(props){
  const {classes}=props;

  const handleChangeC = (event) => {
    props.setClave(event.target.value)
  };

  return(
    <div className={classes.cartainfodepasajes}>
        <Grid container alignItems="center" className={classes.headerPasajes}>
            <Grid item xs={2}>
                <Select
                    value={props.clave}
                    onChange={handleChangeC}
                    className={classes.contenedorselectpasaje}
                >
                    <MenuItem value="CM">CM</MenuItem>
                    <MenuItem value="I1">I1</MenuItem>
                    <MenuItem value="I2">I2</MenuItem>
                    <MenuItem value="PV">PV</MenuItem>
                    <MenuItem value="IP">IP</MenuItem>
                </Select>
            </Grid>
            <Grid item xs={10}>
                <TextField
                id="standard-name"
                value={props.pasajeName}
                onChange={event => props.setPasajeName(event.target.value)}
                className={classes.contenedorselectpasaje}
                />
            </Grid>
        </Grid>
        <Grid container>
            <Grid item className={classes.contenedoreditorpasaje} id={"pasaje" + props.pasajeName}>
                <CKEditor
                    editor={ ClassicEditor }
                    data={props.pasaje}
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        props.setPasaje(data)
                    } }
                />
            </Grid>
        </Grid>  
    </div>
  )
}

export default withStyles(infopasajes)(InfoPasajes);
