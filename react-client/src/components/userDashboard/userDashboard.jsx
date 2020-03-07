import React, { Component } from "react";
import Search from "./search.jsx";
import EventsList from "./eventsList.jsx";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";

class UserDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventsArr: [],
      redirectToAttendedEvents: false,
      userId: ""
    };
  }
  //  UPDATING THE STATE OF THE ARRAY CALLED FROM THE SEARCH FUNCTION TO UPDATE THE VIEW
  updateState(data) {
    if (data) {
      this.setState({
        eventsArr: data
      });
    }
  }
  //  THIS FUNCTION IS USED TO TOGGLE THE REDIRECTION TO THE ATTENDED EVENTS
  toggleStates(e) {
    e.preventDefault();
    this.setState({
      redirectToAttendedEvents: true
    });
  }
  //  WHEN THE PAGE IS LOADED WE MAKE A REQUEST TO PULL THE WHOLE  DATA BASE AND THEN ON SUCCESS WE CALL THE FECH FUNCTION
  /**
   * @params {} takes nothing
   * @returns {} all the events that are avaliable in the database and update the state with the events
   * arrays that are back from the database
   */
  componentDidMount() {
    let User = {};
    if (localStorage && localStorage.getItem("user")) {
      User = JSON.parse(localStorage.getItem("user"));
      this.setState({
        userId: User._id
      });
    }
    console.log(User._id);
    axios.get("/api/events").then(res => {
      var events = res.data;
      axios.post(`/api/profile/${User._id}`).then(data => {
        var joint = data.data;
        for (let i = 0; i < joint.length; i++) {
          for (let j = 0; j < events.length; j++) {
            if (joint[i] === events[j]._id) {
              console.log(joint, events);
              events.splice(j, 1);
            }
          }
        }

        this.updateState(events);
      });
    });
  }

  //  IN THE RENDER FUNCTION WECHECK IF THE BUTTON IS CLICKED OR NOT SO WE CAN REDIRECT
  //  AND SEND THE DATA TO THE SEARCH
  //  IN THE EVENT LIST WE SEND THE FILTTERED DATA TO THE EVENTLIST COMPONENT TO VIEW IT
  render() {
    return (
      <div>
        {/* {console.log(this.state.userId)} */}
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/userdashboard">
            Home
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/attendedevents"
                  // onClick={this.toggleStates.bind(this)}
                >
                  Attended Events
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Logout
                </Link>
              </li>
            </ul>
            <Search events1={this.updateState.bind(this)} />
          </div>
        </nav>
        <EventsList events={this.state.eventsArr} />
      </div>
    );
  }
}

export default UserDashboard;
