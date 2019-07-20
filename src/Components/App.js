import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';

import Login from './Login/Login';
import Subvistas from './Admin/Subvistas';

class App extends React.Component{
  render(){
    return (
      <div>
        <HashRouter>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/main" component={Subvistas} />
          </Switch>
        </HashRouter>
      </div>
    )
  }
}

export default App;
