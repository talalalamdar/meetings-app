import React, { Component } from 'react';
import './App.css';
import AddingForm from "./components/AddingForm"
import ComingMeetings from "./components/ComingMeetings"
import FeaturesComponent from "./components/FeaturesComponent.js"
import { getSortedMeetings } from "./util"

class App extends Component {
  state = {
    meetings: [],
  }

  async componentDidMount() {
    let meetingsList = await getSortedMeetings().then(data => meetingsList = data) // get the meetings sorted by date
    this.setState({
      meetings: meetingsList
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title"><span className="glyphicon glyphicon-th-list"></span> Meetings app</h1>
        </header>
        <AddingForm />
        <ComingMeetings meetings={this.state.meetings} />
        <FeaturesComponent meetings={this.state.meetings}/>
      </div>
    );
  }
}

export default App;
