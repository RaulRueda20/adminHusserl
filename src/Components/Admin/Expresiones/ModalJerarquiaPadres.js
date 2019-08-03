import React from 'react'
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from "@material-ui/core/Divider";
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withStyles } from '@material-ui/styles';
import Checkbox from '@material-ui/core/Checkbox';
import ClearIcon from '@material-ui/icons/Clear';

const estiloModalJerarquiaPadres={
  botonhijos:{
    left:"10px",
    size:"small"
  },
  listacontenedor:{
    MaxWidth:"100%"
  },
  listaitemj:{
    borderBottom:"dotted",
  },
  busquedaj:{
    width:"80%",
    left: "70px",
  },
  contenedorbusquedaj:{
    paddingTop:"10px"
  },
  botonAgregar:{
    width:"100%",
    left:"270px",
    top:"10px"
  },
  listaexpresiones:{
    maxHeight: "200px",
    overflow: "scroll"
  }
}

function ModalJerarquiaPadres(props){
  const {classes}=props;
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  function handleListItemClick(event, index) {
    setSelectedIndex(index);
  }

  console.log("expresiones",props.expresiones)

  return(
    <div>
      <Grid container>
        <Grid item xs={12}>
          <List className={classes.listacontenedor}>
            {props.padres.map(padre=>(
              <div>
                <ListItem
                  className={classes.listaitemj}
                  selected={selectedIndex === 1}
                  key={padre.id}
                >
                  {padre.expresion}
                </ListItem>
                <ListItemSecondaryAction>
                  <IconButton size="small">
                    <ClearIcon/>
                  </IconButton>
                </ListItemSecondaryAction>
              </div>
            ))}
          </List>
        </Grid>
      </Grid>
      <div>
        <Grid container>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <Typography variant="h3">
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
            <List className={classes.listaexpresiones}>
              {props.expresiones.map(expresionp=>(
                <li key={expresionp.id}>
                  {expresionp.id + " - " + expresionp.expresion_de + " // " + expresionp.expresion_es}
                </li>
              ))}
            </List>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={2}>
            <Button
              variant="contained"
              className={classes.botonAgregar}
            >
              Agregar
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default withStyles(estiloModalJerarquiaPadres)(ModalJerarquiaPadres);
