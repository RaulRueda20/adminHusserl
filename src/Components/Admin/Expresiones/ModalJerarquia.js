import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from "@material-ui/core/Divider";
import Grid from '@material-ui/core/Grid';
import ClearIcon from '@material-ui/icons/Clear';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/styles';
import Checkbox from '@material-ui/core/Checkbox';

import eliminar from "../../../Imagenes/basura.png";

const estiloModalJerarquia={
  modalinj:{
    width: "50%",
    left: "25vw",
    top: "20vh",
    position:"absolute",
    padding: "15px 10px",
    overflowY: "auto"
  },
  botonClearj:{
    bottom: "10px",
    size:"small"
  },
  botonhijos:{
    left:"10px",
    size:"small"
  },
  listaitemj:{
    borderBottom:"dotted"
  },
  busquedaj:{
    width:"90%",
    left: "30px",
  },
  contenedorbusquedaj:{
    paddingTop:"10px"
  },
  botonAgregar:{
    width:"45%",
    left:"170px"
  }
}

function ModalJerarquia(props){
  const {classes}=props;
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  function handleListItemClick(event, index) {
    setSelectedIndex(index);
  }

  return(
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={props.openMj}
      handleOpen={props.handleCloseModalJ}
    >
      <Paper className={classes.modalinj}>
        <Grid container>
          <Grid item xs={11}>
            <Typography variant="h2">
              Parentesco
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <IconButton
              aria-haspopup="true"
              onClick={props.handleCloseModalJ}
              className={classes.botonClearj}
            >
              <ClearIcon fontSize="small"/>
            </IconButton>
          </Grid>
        </Grid>
        <Divider className="divisor"/>
        <Grid container>
          <Grid item xs={3}>
            <Button
              variant="contained"
              size="small"
            >
              Padres
            </Button>
            <Button
              variant="contained"
              className={classes.botonhijos}
              size="small"
            >
              Hijos
            </Button>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <List>
              <ListItem
                className={classes.listaitemj}
                selected={selectedIndex === 1}
              >
                padre
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
            <Typography variant="h2">
              Expresión
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.contenedorbusquedaj}>
            <FormControl className={classes.busquedaj}>
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
                <ListItemText primary={"expresiones hijas"}/>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              className={classes.botonAgregar}
            >
              Agregar
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  )
}

export default withStyles(estiloModalJerarquia)(ModalJerarquia);
