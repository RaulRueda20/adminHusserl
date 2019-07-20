import React from 'react';

import LoginForm from './LoginForm';
import Header from './Header';
import Footer from './Footer';

class Login extends React.Component{

  render(){
    const {classes} = this.props
    return(
      <div>
        <br/>
        <Header/>
        <LoginForm/>
        <br/>
        <Footer/>
      </div>
    )
  }
}

export default (Login);
