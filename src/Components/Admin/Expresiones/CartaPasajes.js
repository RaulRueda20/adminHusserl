import React from 'react'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';

import docs from "../../../Imagenes/docs.png";

const cartaPasajes={
  cartadepasajes:{
    maxWidth:"180px"
  },
  cardheader:{
    paddingLeft:"55px"
  },
  imagendocs:{
    width:"20px",
    height:"20px"
  },
  botonclear:{
    paddingRight:"30px"
  }
}

function CartaPasajes(props){
  const {classes}=props;

  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return(
    <Card className={classes.cartadepasajes}>
      <Grid container>
        <Grid item xs={9} className={classes.cardheader}>
          <CardHeader
            avatar={<img className={classes.imagendocs} src={docs}/>}
          />
        </Grid>
        <Grid item xs={3} className={classes.botonclear}>
          <IconButton
            aria-haspopup="true"
          >
            <ClearIcon fontSize="small" onClick={()=>handleClose()}/>
          </IconButton>
        </Grid>
      </Grid>
      <Grid container>
        <CardContent>
          <Grid item>
            <Typography>
              Pasajes
            </Typography>
          </Grid>
        </CardContent>
      </Grid>
    </Card>
  )
}

export default withStyles(cartaPasajes)(CartaPasajes);
