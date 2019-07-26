import React, {useState} from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from "@material-ui/core/Divider";
import { withStyles } from '@material-ui/styles';

import eliminar from "../../../Imagenes/basura.png";

const infopasajes={
  cartainfodepasajes:{
    maxWidth:"100%"
  },
  textfieldlista:{
    width: "70%",
    paddingLeft: "150px"
  },
  botoneliminarpasaje:{
    paddingTop:"10px"
  },
  botonespañol:{
    left:"5px"
  },
  contenedorselectpasaje:{
    paddingTop:"10px",
    paddingLeft:"280px"
  },
  textopasaje:{
    bottom:"6px",
    paddingLeft:"3px",
  },
  contenedoreditorpasaje:{
    paddingLeft:"230px"
  }
}

  const Claves = [{value:'CM', label:'CM'}, {value:'PW', label:'PW'}, {value:'I1', label:'I1'},
                  {value:'I2', label:'I2'}, {value:'IP', label:'IP'}, {value:'PV', label:'PV'}]

 function InfoPasajes(props){
   const {classes}=props;
   const [clave, setClave] = React.useState('1')

   const handleChangeC = (event) => {
     setClave(event.target.value)
   };

   return(
     <Card className={classes.cartainfodepasajes}>
       <Grid container>
         <Grid item xs={10}>
          <form>
            <TextField
              id="standard-name"
              margin="normal"
              value={"pasaje"}
              className={classes.textfieldlista}
            />
          </form>
         </Grid>
         <Grid item className={classes.botoneliminarpasaje}>
           <IconButton size="small">
             <img src={eliminar}/>
           </IconButton>
         </Grid>
       </Grid>
       <Grid container>
          <Grid item xs={12}>
            <Button
              variant="contained"
              size="small"
            >
              Aleman
            </Button>
            <Button
              variant="contained"
              size="small"
              className={classes.botonespañol}
            >
              Español
            </Button>
          </Grid>
       </Grid>
       <Divider/>
       <Grid container>
          <Grid item xs={4} className={classes.contenedorselectpasaje}>
            <FormControl>
              <Select
                value={clave}
                onChange={handleChangeC}
              >
                <MenuItem value={1}>CM</MenuItem>
                <MenuItem value={2}>I1</MenuItem>
                <MenuItem value={3}>I2</MenuItem>
                <MenuItem value={4}>PV</MenuItem>
                <MenuItem value={5}>IP</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <FormControl>
              <TextField
                id="standard-name"
                margin="normal"
                value={"CM"}
                className={classes.textopasaje}
              />
            </FormControl>
          </Grid>
       </Grid>
       <Grid container>
        <Grid item className={classes.contenedoreditorpasaje}>
          <CKEditor
               editor={ ClassicEditor }
               data=""
               onInit={ editor => {
                   // You can store the "editor" and use when it is needed.
                   console.log( 'Editor is ready to use!', editor );
               } }
               onChange={ ( event, editor ) => {
                   const data = editor.getData();
                   console.log( { event, editor, data } );
               } }
               onBlur={ editor => {
                   console.log( 'Blur.', editor );
               } }
               onFocus={ editor => {
                   console.log( 'Focus.', editor );
               } }
           />
          </Grid>
        </Grid>
      <Divider className="divisor"/>
      <Grid container justify="flex-end">
        <Grid item>
          <Button
            variant="contained"
            size="small"
          >
              Guardar
          </Button>
        </Grid>
      </Grid>
     </Card>
   )
 }

export default withStyles(infopasajes)(InfoPasajes);
