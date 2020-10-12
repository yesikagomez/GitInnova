import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './App.css';
import Registro from './components/FormularioRegistro';

class App extends React.Component {
  render() {
    return(
      <Registro/>
    )
  }
}

export default App;