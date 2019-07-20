import React, {useState} from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Divider from "@material-ui/core/Divider";
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import EditIcon from '@material-ui/icons/Edit';
import ClearIcon from '@material-ui/icons/Clear';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { withStyles } from '@material-ui/styles';

import es from "../../Imagenes/spain.png";
import al from "../../Imagenes/germany.png";

const formularioExpresiones = theme => ({
  subtituloIzquierdo:{
    paddingLeft:"80px"
  },
  subtituloDerecho:{
    paddingLeft:"270px"
  },
  TextFielIzquierdo:{
    paddingLeft:"40px",
    top: "10px"
  },
  TextFielDerecho:{
    paddingLeft:"130px"
  },
  ventanaOpciones:{
    maxHeight:"20px",
    overflowY:"auto"
  },
  editor:{
    paddingLeft:"150px"
  },
  imagenesBandera:{
    width: "32px !important",
    height: "32px !important",
    left: "200px",
    top: "5px"
  },
  banderas:{
    width: "34px !important",
    borderRadius: "50%",
    height: "34px !important"
  },
  menu:{
    top:"35px"
  }
})

const listaletras = [{value:'A', label:'A'},{value:'B', label:'B'},{value:'C', label:'C'},{value:'D', label:'D'},
                {value:'E', label:'E'},{value:'F', label:'F'},{value:'G', label:'G'},{value:'H', label:'H'},
                {value:'I', label:'I'},{value:'J', label:'J'},{value:'K', label:'K'},{value:'L', label:'L'},
                {value:'M', label:'M'},{value:'N', label:'N'},{value:'O', label:'O'},{value:'P', label:'P'},
                {value:'Q', label:'Q'},{value:'R', label:'R'},{value:'S', label:'S'},{value:'T', label:'T'},
                {value:'U', label:'U'},{value:'V', label:'V'},{value:'W', label:'W'},{value:'X', label:'X'},
                {value:'Y', label:'Y'},{value:'Z', label:'Z'}]

function FormularioExpresiones(props){
  const {classes} = props;
  const [letraIndice, setLetraIndice] = React.useState('A')

  const handleChange = (event) => {
    setLetraIndice(event.target.value)
  };

  console.log(letraIndice)
  return(
    <div>
      <div>
        <Grid container>
          <Grid item xs={4}>
            <Typography variant="h4" className={classes.subtituloIzquierdo}>
              Expresión
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h4" className={classes.subtituloDerecho}>
              Indice
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Fab className={classes.imagenesBandera} onClick={props.handleEs}>
              <img className={classes.banderas} src={es}/>
            </Fab>
          </Grid>
        </Grid>
        <div>
          <Grid container >
            <Grid item xs={6}>
              <FormControl >
                <TextField
                  id="input-with-icon-textfield"
                  className={classes.TextFielIzquierdo}
                  InputProps={{
                     startAdornment: <InputAdornment position="start"><EditIcon/></InputAdornment>,
                   }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl>
                <TextField
                    id="input-with-icon-textfield"
                    select
                    margin="normal"
                    value={letraIndice}
                    onChange={handleChange}
                    className={classes.TextFielDerecho}
                    SelectProps={{
                      native: true,
                      MenuProps: {
                        className: classes.menu,
                      },
                    }}
                  >
                  {listaletras.map(opcion =>(
                    <List>
                      <ListItem button key={opcion.letraIndice} value={opcion.letraIndice}>
                        {opcion.label}
                      </ListItem>
                    </List>
                  ))}
                </TextField>
              </FormControl>
            </Grid>
          </Grid>
          <Divider className="divisor"/>
          <Grid container>
            <Grid item className={classes.editor}>
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
        </div>
      </div>
    </div>
  )
}

export default withStyles(formularioExpresiones)(FormularioExpresiones);
