import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Home from './home/Home';
import Header from './header/Header';
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <Home/>
      </div>
    );
  }
}
export default connect(mapStateToProps)(App);
