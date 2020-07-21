import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import './App.css';
import Signup from './components/Signup';

function App() {
  return (
    <Router>
      <Route exact path='/login' component={Login} />
      <Route exact path='/signup' component={Signup} />
    </Router>
  );
}

export default App;
