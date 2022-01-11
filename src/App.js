import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Switch, Route  } from 'react-router';
import Wallet from './pages/Wallet';
import Login from './pages/Login';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login }/>
          <Route path="/carteira" component={ Wallet }/>
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
