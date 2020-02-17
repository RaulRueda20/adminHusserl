import React from 'react';
import {Switch, Redirect, Link, Route} from 'react-router-dom';

import HeaderMain from './HeaderMain';
import Expresiones from './Expresiones/Expresiones';
import Pasajes from './Pasajes/Pasajes';
import Acercade from './Acercade';
import Manual from './Manual';
import Usuarios from './Usuarios';

export default function Subvistas({match}){
  return(
    <div>
      <HeaderMain match={match}/>
      <Switch>
        <Route path={`${match.url}/alfabeto`} component={Expresiones}/>
        <Route path={`${match.url}/pasajes`} component={Pasajes}/>
        <Route path={`${match.url}/acercade`} component={Acercade}/>
        <Route path={`${match.url}/manual`} component={Manual}/>
        <Route path={`${match.url}/usuarios`} component={Usuarios}/>
        <Route path={`${match.url}/`}>
          <Redirect to={`${match.url}/alfabeto`} component={Expresiones}/>
        </Route>
        <Link id="toLogin" to="/"/>
      </Switch>
    </div>
  )
}
