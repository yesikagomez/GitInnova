import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './App.css';
import InformacionCandidato from './components/InformacionCandidato';

class App extends React.Component {
  render() {
    return(
      <InformacionCandidato/>
    )
  }
}

export default App;