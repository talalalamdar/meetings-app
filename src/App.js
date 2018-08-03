import React, { Component } from 'react';
import './App.css';
import AddingForm from "./components/AddingForm"
import ComingMeetings from "./components/ComingMeetings"
import FeaturesComponent from "./components/FeaturesComponent.js"

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title"><span className="glyphicon glyphicon-th-list"></span> Meetings app</h1>
        </header>
        <AddingForm />
        <ComingMeetings />
        <FeaturesComponent />
      </div>
    );
  }
}

export default App;
