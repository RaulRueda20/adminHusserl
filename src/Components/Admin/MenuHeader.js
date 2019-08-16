import React from 'react';
import {Link} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';

import Book from '@material-ui/icons/Book';
import Description from '@material-ui/icons/Description';
import Help from '@material-ui/icons/Help';
import Info from '@material-ui/icons/Info';
import Exit from '@material-ui/icons/ExitToApp';
import People from '@material-ui/icons/People';

class MenuHeader extends React.Component{
  state = { anchorEl : null  }

  setMenu = (event) => {
    this.setState({anchorEl: event.currentTarget})
  }

  closeMenu = () =>{
    this.setState({anchorEl:null})
  }

  exitMain = () =>{
    localStorage.removeItem("sesion")
    document.getElementById("toLogin").click()
  }

  render(){
    const {anchorEl} = this.state
    const {match} = this.props
    return(
      <div>
        <IconButton
          aria-haspopup="true"
          aria-owns={anchorEl ? 'menuheader': undefined}
          onClick={this.setMenu}
        >
          <MenuIcon fontSize="large"/>
        </IconButton>
        <Menu
          id="menuheader"
          anchorEl={anchorEl}
          keepMounted
          onClose={this.closeMenu}
          open={Boolean(anchorEl)}
        >
          <Link to={`${match.url}/alfabeto`}>
            <MenuItem onClick={this.closeMenu}>
              <ListItemIcon>
                <Book />
              </ListItemIcon>
              <ListItemText primary="Expresiones" />
            </MenuItem>
          </Link>
          <Link to={`${match.url}/pasajes`}>
            <MenuItem onClick={this.closeMenu}>
              <ListItemIcon>
                <Description />
              </ListItemIcon>
              <ListItemText primary="Pasajes" />
            </MenuItem>
          </Link>
          <Link to={`${match.url}/acercade`}>
            <MenuItem onClick={this.closeMenu}>
              <ListItemIcon>
                <Info />
              </ListItemIcon>
              <ListItemText primary="Acerca de" />
            </MenuItem>
          </Link>
          <Link to={`${match.url}/manual`}>
            <MenuItem onClick={this.closeMenu}>
              <ListItemIcon>
                <Help />
              </ListItemIcon>
              <ListItemText primary="Manual" />
            </MenuItem>
          </Link>
          <Link to={`${match.url}/usuarios`}>
            <MenuItem onClick={this.closeMenu}>
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText primary="Usuarios" />
            </MenuItem>
          </Link>
          <MenuItem onClick={this.exitMain}>
            <ListItemIcon>
              <Exit />
            </ListItemIcon>
            <ListItemText primary="Salir" />
          </MenuItem>
        </Menu>
        <Link id="toLogin" to={'/'} />
      </div>
    )
  }
}

export default (MenuHeader);
