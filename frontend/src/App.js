import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Dashboard from './Dashboard';
import Register from './Register';
import Login from './Login';
import Newuniqlink from './Newuniqlink';

import useToken from './useToken';
import Contributor from './Contributor';

function App() {

  const { token, setToken } = useToken();

  if (token) {
    return <Dashboard />
  }

  return (
    <div className="wrapper">
      <Router>
        <Switch>
          <Route exact path="/">
            <Login setToken={setToken} />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/newuniqlink">
            <Newuniqlink setToken={setToken} />
          </Route>
          <Route path="/code/:uniqid">
            <Contributor />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;