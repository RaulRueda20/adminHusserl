import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from "@material-ui/core/Divider";
import Grid from '@material-ui/core/Grid';
import ClearIcon from '@material-ui/icons/Clear';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/styles';

const modalagregar={
  modalina:{
    width: "50%",
    left: "25vw",
    top: "20vh",
    position:"absolute",
    padding: "15px 10px",
    overflowY: "auto"
  },
  subtitulos:{
    paddingTop:"10px"
  },
  contenedorbusqueda:{
    paddingTop:"10px"
  },
  busquedaap:{
    width:"80%",
    left:"60px"
  },
  botonClearAp:{
    left: "80px",
    bottom: "10px"
  },
  botoncerrar:{
    left: "490px"
  },
  botonguardar:{
    left: "520px"
  }
}

const niveles = [{value:'1', label:'1'}, {value:'2', label:'2'}]

function ModalAgregarPasaje(props){
  const {classes}=props;
  const [ nivel, setNivel] = React.useState('1')

  const handleChangeN = (event) => {
    setNivel(event.target.value)
  };

  return(
    <Modal
      open={props.openAp}
      handleOpen={props.handleCloseAp}
    >
      <Paper className={classes.modalina}>
        <Grid container>
          <Grid item xs={10}>
            <Typography variant="h3">
              Agregar Pasaje
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              aria-haspopup="true"
              onClick={props.handleCloseAp}
              className={classes.botonClearAp}
            >
              <ClearIcon fontSize="small"/>
            </IconButton>
          </Grid>
        </Grid>
        <Divider className="divisor"/>
        <Grid container>
          <Grid item xs={12} className={classes.subtitulos} >
            <Typography variant="h2">
              Escriba el pasaje que desea asociar con la expresión seleccionada.
            </Typography>
          </Grid>
          <Grid item xs={12} className={classes.subtitulos}>
            <Typography variant="h2">
              Referencias
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={10} className={classes.contenedorbusqueda}>
            <FormControl className={classes.busquedaap}>
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
          <Grid item xs={2}>
            <FormControl>
              <Typography>
                Nivel
              </Typography>
              <Select
                value={nivel}
                onChange={handleChangeN}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
              </Select>
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
        </Grid>
        <Divider className="divisor"/>
          <Button className={classes.botoncerrar} variant="contained" size="small" onClick={props.handleCloseAp}>
            Cerrar
          </Button>
          <Button className={classes.botonguardar} variant="contained" size="small">
            Guardar
          </Button>
      </Paper>
    </Modal>
  )
}

export default withStyles(modalagregar)(ModalAgregarPasaje);
