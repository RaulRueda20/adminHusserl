import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from "@material-ui/core/Divider";
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';

const acercade={
  botonespañol:{
    left:"2px"
  },
  botoningles:{
    left:"3px"
  },
  botonfrances:{
    left:"4px"
  },
  botoncatalan:{
    left:"5px"
  },
  acerdaDe:{
    paddingLeft:"670px"
  },
  contenedoreditoracercade:{
    paddingLeft:"450px",
    paddingTop:"30px"
  },
  contenedorbontonguardar:{
    paddingLeft:"350px"
  },
  botonguardar:{
    width:"70%"
  }
}

function Acercade(props){
  const {classes}=props;

  return(
    <div>
      <div>
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
            <Button
              variant="contained"
              size="small"
              className={classes.botoningles}
            >
              Inglés
            </Button>
            <Button
              variant="contained"
              size="small"
              className={classes.botonfrances}
            >
              Francés
            </Button>
            <Button
              variant="contained"
              size="small"
              className={classes.botoncatalan}
            >
              Catalán
            </Button>
          </Grid>
        </Grid>
      </div>
      <Divider/>
      <div className={classes.acerdaDe}>
        <Grid container>
          <Grid item xs="12">
            <Typography variant="h3">
              Acerca de
            </Typography>
          </Grid>
        </Grid>
      </div>
      <Divider className="divisor"/>
      <div>
        <Grid container className={classes.contenedoreditoracercade}>
          <Grid item>
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
      <Divider className="divisor"/>
      <div className={classes.contenedorbontonguardar}>
        <Button
          variant="contained"
          className={classes.botonguardar}
        >
          Guardar
        </Button>
      </div>
    </div>
  )
}
 export default withStyles(acercade)(Acercade);
