import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from "@material-ui/core/Divider";
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';

const manual={
  botonespañolm:{
    left:"2px"
  },
  botoninglesm:{
    left:"3px"
  },
  botonfrancesm:{
    left:"4px"
  },
  botoncatalanm:{
    left:"5px"
  },
  manualin:{
    paddingLeft:"670px"
  },
  contenedoreditormanual:{
    paddingLeft:"450px",
    paddingTop:"30px"
  },
  contenedorbontonguardarm:{
    paddingLeft:"350px"
  },
  botonguardarm:{
    width:"70%"
  }
}

function Manual(props){
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
              className={classes.botonespañolm}
            >
              Español
            </Button>
            <Button
              variant="contained"
              size="small"
              className={classes.botoninglesm}
            >
              Inglés
            </Button>
            <Button
              variant="contained"
              size="small"
              className={classes.botonfrancesm}
            >
              Francés
            </Button>
            <Button
              variant="contained"
              size="small"
              className={classes.botoncatalanm}
            >
              Catalán
            </Button>
          </Grid>
        </Grid>
      </div>
      <Divider/>
      <div className={classes.manualin}>
        <Grid container>
          <Grid item xs="12">
            <Typography variant="h3">
              Manual
            </Typography>
          </Grid>
        </Grid>
      </div>
      <Divider className="divisor"/>
      <div>
        <Grid container className={classes.contenedoreditormanual}>
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
      <div className={classes.contenedorbontonguardarm}>
        <Button
          variant="contained"
          className={classes.botonguardarm}
        >
          Guardar
        </Button>
      </div>
    </div>
  )
}
 export default withStyles(manual)(Manual);
