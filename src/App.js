import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Context from './firebase/context'

//=================================COMPONENTS=================================//
import Header from './components/Header';
import Principal from './components/Principal';
import AlumnoForm from './components/AlumnoForm';

const App = () => {
  return (
    <Context>
      <BrowserRouter>
      <Header />
        <Switch>
          <Route exact path='/' component={Principal} />
          <Route exact path='/alumno-form' component={AlumnoForm} />
        </Switch>
      </BrowserRouter>
    </Context>
  );
}

export default App;