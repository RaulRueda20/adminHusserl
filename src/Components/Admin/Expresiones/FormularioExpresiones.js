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

import es from "../../../Imagenes/spain.png";
import al from "../../../Imagenes/germany.png";
import expresiones from "../../../css/expresiones.css";


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
    paddingLeft:"140px",
    bottom:"10px"
  },
  ventanaOpciones:{
    maxHeight:"20px",
    overflowY:"auto"
  },
  editor:{
    paddingLeft:"150px",
    height:"180px"
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
  }
})

const letras = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

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
                      },
                    }}
                  >
                  {letras.map(opcion =>(
                    <option button key={opcion} value={opcion}>
                      {opcion}
                    </option>
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
