import React from 'react';
import {Switch, Redirect, Link, Route} from 'react-router-dom';

import HeaderMain from './HeaderMain';
import ListaLetras from './ListaLetras';
import Pasajes from './Pasajes';
import Acercade from './Acercade';
import Manual from './Manual';


export default function Subvistas({match}){
  console.log(match)
  return(
    <div>
      <HeaderMain match={match}/>
      <Switch>
        <Route path={`${match.url}/alfabeto`} component={ListaLetras}/>
        <Route path={`${match.url}/pasajes`} component={Pasajes}/>
        <Route path={`${match.url}/acercade`} component={Acercade}/>
        <Route path={`${match.url}/manual`} component={Manual}/>
        <Route path={`${match.url}/`}>
          <Redirect to={`${match.url}/alfabeto`} component={ListaLetras}/>
        </Route>
        <Link id="toLogin" to="/"/>
      </Switch>
    </div>
  )
}
