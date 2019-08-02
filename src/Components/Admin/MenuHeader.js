import React from 'react';
import {Link} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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
    console.log(match)
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
          <Link to={`${match.url}/alfabeto`}><MenuItem onClick={this.closeMenu}>Expresiones</MenuItem></Link>
          <Link to={`${match.url}/pasajes`}><MenuItem onClick={this.closeMenu}>Pasajes</MenuItem></Link>
          <Link to={`${match.url}/acercade`}><MenuItem onClick={this.closeMenu}>Acerca de</MenuItem></Link>
          <Link to={`${match.url}/manual`}> <MenuItem onClick={this.closeMenu}>Manual</MenuItem></Link>
        </Menu>
      </div>
    )
  }
}

export default (MenuHeader);
