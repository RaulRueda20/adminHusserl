import React from 'react'
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from "@material-ui/core/Divider";
import Grid from '@material-ui/core/Grid';
import ClearIcon from '@material-ui/icons/Clear';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/styles';

import Share from '@material-ui/icons/Share';

const mvt={
  modalinvt:{
    width: "60%",
    left: "20vw",
    top: "20vh",
    position:"absolute",
    padding: "15px 10px",
    maxHeight: "450px",
    overflowY: "auto"
  },
  botonClearvt:{
    bottom: "10px",
    size:"small"
  },
  busquedavt:{
    width:"90%",
    left: "30px",
  },
  contenedorbusquedavt:{
    paddingTop:"10px"
  },
  botonAgregarvt:{
    width:"45%",
    left:"170px"
  }
}

function ModalVerTambien(props){
  const {classes}=props;
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [open, setOpen] = React.useState(false);

  function handleListItemClick(event, index) {
    setSelectedIndex(index);
  }

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return(
    <div>
      <Tooltip title="Ver también">
        <IconButton onClick={()=>handleClickOpen()}>
          <Share/>
        </IconButton>
      </Tooltip>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <Paper className={classes.modalinvt}>
          <Grid container>
            <Grid item xs={11}>
              <Typography variant="h3">
                Expresiones relacionadas
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <IconButton
                aria-haspopup="true"
                onClick={handleClose}
                className={classes.botonClearvt}
              >
                <ClearIcon fontSize="small"/>
              </IconButton>
            </Grid>
          </Grid>
          <Divider className="divisor"/>
          <Grid container>
            <Grid item xs={12}>
              <List>
                <ListItem
                  selected={selectedIndex === 1}
                >
                  Expresión
                </ListItem>
                <ListItemSecondaryAction>
                  <IconButton size="small">
                    <ClearIcon/>
                  </IconButton>
                </ListItemSecondaryAction>
              </List>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h3">
                Ver También
              </Typography>
            </Grid>
            <Grid item xs={12} className={classes.contenedorbusquedavt}>
              <FormControl className={classes.busquedavt}>
                <InputLabel htmlFor="input-with-icon-adornment">Busqueda</InputLabel>
                <Input
                  id="input-with-icon-adornment"
                  startAdornment={
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                    />
                  </ListItemIcon>
                  <ListItemText primary={"expresiones relacionadas"}/>
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                className={classes.botonAgregarvt}
              >
                Agregar
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    </div>
  )
}

export default withStyles(mvt)(ModalVerTambien);
