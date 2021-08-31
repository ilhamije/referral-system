import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import Register from './Register';
import Login from './Login';
import useToken from './useToken';

function App() {

  const { token, setToken } = useToken();

  if (token) {
    return <Dashboard token={token} />
  }

  return (
    <div className="wrapper">
      <h1>Referral</h1>
      <Router>
        <Switch>
          <Route exact path="/">
            <Login setToken={setToken} />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/register">
            <Register setToken={setToken} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;