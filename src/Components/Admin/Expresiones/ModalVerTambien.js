import React from 'react';
// import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ClearIcon from '@material-ui/icons/Clear';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

import Share from '@material-ui/icons/Share';

const estiloModalJerarquia={
  modalinj:{
    width: "50%",
    maxHeight:"75vh",
    left: "25vw",
    top: "15vh",
    position:"absolute",
    padding: "30px 30px",
    overflowY: "auto"
  },
  botonClearj:{
    // bottom: "10px",
    // size:"small"
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
  },
  menuButtons: {
    margin: "10px 0px"
  },
  Buttons:{
    marginLeft : "10px"
  },
  botonhijos:{
    left:"10px",
    size:"small"
  },
  listacontenedor:{
    height: "25vh",
    overflow: "scroll"
  },
  listaitemj:{
    background: "rgb(230,230,230)",
    borderBottom:"rgb(150,150,150) dotted",
  },
  busquedaj:{
    width:"100%",
  },
  contenedorbusquedaj:{
    paddingTop:"10px"
  },
  botonAgregar:{
    width:"50%",
    left:"50%",
  }
}

function ModalJerarquia(props){
  const {classes}=props;
  const [open, setOpen] = React.useState(false);
  const [selectedExpresions, setSelectedExpresions] = React.useState([]);
  const [verTambien, setVerTambien] = React.useState([]);

  function handleOpenModal() {
    setOpen(true);
  };

  function handleCloseModal() {
    setOpen(false);
  };

  const addEToList = (id) => {
    var se = selectedExpresions
    if(se.indexOf(id) < 0) se.push(id)
    else se.splice(selectedExpresions.indexOf(id), 1)
    document.getElementById(id).classList.toggle("selected")
    setSelectedExpresions(se)
  }

  return(
    <div>
      <Tooltip title="Ver También">
        <IconButton onClick={() => handleOpenModal()}>
          <Share/>
        </IconButton>
      </Tooltip>
      <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={handleCloseModal}
      >
        <Paper className={classes.modalinj}>
          <Grid container alignItems="center">
            <Grid item xs={11}>
              <Typography variant="h3">
                Ver También
              </Typography>
            </Grid>
            <Grid item xs={1} align="center">
              <IconButton
                aria-haspopup="true"
                onClick={handleCloseModal}
                className={classes.botonClearj}
              >
                <ClearIcon fontSize="small"/>
              </IconButton>
            </Grid>
          </Grid>
          <div>
            <List className={classes.listacontenedor}>
              {verTambien.map(expresion=>(
                <ListItem
                  key={expresion.hijo}
                  className={classes.listaitemj}
                  // selected={selectedIndex === 1}
                >
                  <ListItemText
                    primary={expresion.expresion}
                    // secondary={secondary ? 'Secondary text' : null}
                  />
                  <ListItemSecondaryAction>
                    <IconButton size="small">
                      <ClearIcon/>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>

            <Typography variant="h3">
              Expresiones
            </Typography>
            <FormControl className={classes.busquedaj}>
              <Input
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
            <List className={classes.listacontenedor}>
              {props.expresiones.map(expresionp=>(
                // <li key={expresionp.t_id} className="sideList" onClick={addEToList(expresionp.t_id)}>
                <li 
                  id={expresionp.t_id}
                  key={expresionp.t_id} 
                  className={"sideList"} 
                  onClick={() => addEToList(expresionp.t_id)}>
                    {expresionp.t_id + " - " + expresionp.t_term_de + " // " + expresionp.t_term_es}
                </li>
              ))}
            </List>
            <Button
              variant="contained"
              className={classes.botonAgregar}
            >
              Agregar
            </Button>
          </div>
        </Paper>
      </Modal>
    </div>

  )
}

export default withStyles(estiloModalJerarquia)(ModalJerarquia);
