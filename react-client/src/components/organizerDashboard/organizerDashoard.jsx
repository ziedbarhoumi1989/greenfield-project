import React, { Component } from "react";
import $ from "jquery";
import EventsList from "../userDashboard/eventsList.jsx";
import axios from "axios";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

// import axios from 'axios'

class OrganizerDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { ownevents: [], userId: "" };
  }

  //  WHEN THE PAGE IS LOADED WE MAKE A REQUEST TO PULL THE WHOLE  DATA BASE AND THEN ON SUCCESS WE CALL THE FECH FUNCTION
  componentDidMount() {
    let User = {};
    if (localStorage && localStorage.getItem("user")) {
      User = JSON.parse(localStorage.getItem("user"));
      this.setState({
        userId: User._id
      });
      //   return (
      //     <Redirect
      //       to={{
      //         pathname: "/createevent"
      //       }}
      //     />
      //   );
    }
    console.log(User._id);
    axios.post(`/api/eventscreated/${User._id}`).then(res => {
      console.log(res.data);
      this.setState({
        ownevents: res.data
      });
    });
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <Link className="navbar-brand" to="/organizerdashboard">
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
                  to="/createevent"
                  // onClick={this.toggleStates.bind(this)}
                >
                  create a new event
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
          </div>
        </nav>
        <EventsList events={this.state.ownevents} />
      </div>
    );
  }
}

export default OrganizerDashboard;
