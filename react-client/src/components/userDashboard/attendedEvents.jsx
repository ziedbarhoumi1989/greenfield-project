import React, { Component } from "react";
import $ from "jquery";
import EventsList from "./eventsList.jsx";
import Search from "./search.jsx";
import { Redirect } from "react-router-dom";
import axios from "axios";
import ReactPlayer from "react-player";
import NavBar from "./navBar.jsx";
import Ratings from "./rating.jsx";
import Comments from "./comments.jsx";

class AttendedEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      attendedArr: [],
      redirectToUserDashboard: false,
      eventId: ""
    };
  }

  changeHandler(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  toggleStates(e) {
    e.preventDefault();
    this.setState({
      attendedEvents: false,
      dashboard: true
    });
  }

  componentDidMount() {
    let User = {};
    if (localStorage && localStorage.getItem("user")) {
      User = JSON.parse(localStorage.getItem("user"));
      this.setState({
        userId: User._id
      });
    }
    axios.post(`/api/profile/${User._id}`).then(res => {
      const data = res.data;
      axios.get(`/api/events`).then(res => {
        const events = res.data;
        var array = [];
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < events.length; j++) {
            if (data[i] === events[j]._id) {
              array.push(events[j]);
            }
          }
        }
        console.log(array);
        this.setState({ attendedArr: array });
      });
    });
  }

  toggleStates(e) {
    e.preventDefault();
    this.setState({
      redirectToUserDashboard: true
    });
  }

  clickHandler() {
    let User = {};
    if (localStorage && localStorage.getItem("user")) {
      User = JSON.parse(localStorage.getItem("user"));
      this.setState({
        userId: User._id
      });
    }

    axios.post(`/api/profile/${User._id}`).then(res => {
      const data1 = res.data;
      console.log(data1);
      for (var i = 0; i < data1.length; i++) {
        if (data1[i] !== this.state.eventId) {
          data1.splice(i, 1);
        }
      }
      var obj = {};
      if (data1.length === 0) {
        obj.attendedEvents = [];
      } else {
        obj.attendedEvents = data1;
      }
      console.log(obj);
      $.ajax({
        url: `/api/user/${User._id}`,
        type: "post",
        data: obj,
        success: data => console.log(data),
        error: err => console.log("hieee")
      });
    });
  }

  render() {
    const container = {
      margin: "50px auto 0",
      width: "700px",
      boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
      backgroundColor: "white"
    };

    const ps = {
      padding: "2px 16px"
    };

    if (this.state.redirectToUserDashboard) {
      this.setState({
        redirectToUserDashboard: false
      });
      return (
        <Redirect
          to={{
            pathname: "/UserDashboard"
          }}
        />
      );
    }

    return (
      <div>
        <NavBar />
        <div>
          {this.state.attendedArr.map((attended, index) => {
            return (
              <div
                key={index}
                style={container}
                value={attended.id}
                name="eventId"
                onClick={this.changeHandler.bind(this)}
              >
                <img src={attended.imgUrl[0]} style={{ width: "100%" }} />
                <center>
                  <h1>{attended.eventName}</h1>
                  <h4>Date: {attended.date}</h4>
                </center>
                <p style={ps}>Category:{attended.category}</p>
                <ReactPlayer url={attended.videos[0]} />
                <br />
                <p style={ps}>Description: {attended.description}</p>
                <Ratings eventId={attended._id} />
                <Comments comments={attended} />
                <center>
                  <button
                    type="button"
                    className="btn btn-danger"
                    style={{ margin: "25px" }}
                    onClick={this.clickHandler.bind(this)}
                    name="eventId"
                    value={attended.id}
                  >
                    Cancel
                  </button>
                </center>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default AttendedEvents;
