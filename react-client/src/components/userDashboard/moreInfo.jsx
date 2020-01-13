import React, { Component } from "react";
import Attend from "./attend.jsx";
import EventsList from "./eventsList.jsx";
import $ from "jquery";
import ReactPlayer from "react-player";
import Comments from "./comments.jsx";
import Ratings from "./rating.jsx";

class MoreInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      event1: [],
      moreInfo: true,
      attendMoney: false,
      userId: "",
      comment: "",
      username: "",
      redirect: false,
      eventId: ""
    };
  }

  changeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  attendToggler(e) {
    // Send request to the backend with the id of the event and user id
    let User = {};
    if (localStorage && localStorage.getItem("user")) {
      User = JSON.parse(localStorage.getItem("user"));
      this.setState({
        userId: User._id,
        username: User.username
      });
    }

    var obj = {};
    obj.userId = User._id;
    obj.eventId = this.props.eventDescription[this.props.index]._id;
    $.ajax({
      url: "/api/profiles",
      type: "POST",
      data: obj,
      success: data => {
        console.log(data);
        if (data === "Joined") {
          this.setState({
            attend: false,
            home: true
          });
        }
      },
      error: err => {
        throw err;
      }
    });

    this.updateState();
  }

  updateState(e) {
    // e.preventDefault();
    this.setState({
      moreInfo: false,
      home: true
    });
  }

  attendTogglerMoney(e) {
    e.preventDefault();
    this.setState({
      moreInfo: false,
      attendMoney: true
    });
  }

  render() {
    const container = {
      margin: "50px auto 0",
      width: "700px",
      boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
      backgroundColor: "white"
    };

    const cardMedia = {
      borderRadius: "2px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, .12)",
      height: "125px",
      marginBottom: "25px",
      transition: "all 300ms ease-out",
      width: "100%"
    };

    const ps = {
      padding: "2px 16px"
    };

    if (this.state.redirect) {
      this.setState({
        redirect: false
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
        {this.state.moreInfo ? (
          <div
            style={container}
            value={this.props.eventDescription[this.props.index]._id}
            name="eventId"
            onClick={this.changeHandler.bind(this)}
          >
            <img
              src={this.props.eventDescription[this.props.index].imgUrl[0]}
              style={{ width: "100%" }}
            />
            <br />
            <div className="container">
              <h3>
                Name: {this.props.eventDescription[this.props.index].eventName}
              </h3>
              <br />
              <h6>
                Date: {this.props.eventDescription[this.props.index].date}
              </h6>
              <center>
                <ReactPlayer
                  url={this.props.eventDescription[this.props.index].videos[0]}
                />
              </center>
              <br />
              <div>
                <label>Category:</label>
                <p>{this.props.eventDescription[this.props.index].category}</p>
              </div>
              <p>
                Description:{" "}
                {this.props.eventDescription[this.props.index].description}
              </p>
            </div>
            <Ratings
              eventId={this.props.eventDescription[this.props.index]._id}
            />
            <Comments
              comments={this.props.eventDescription[this.props.index]}
            />
            <center>
              <div className="btn-group btn-group-justified">
                <button
                  type="submit"
                  onClick={this.updateState.bind(this)}
                  className="btn btn-default"
                  style={{ margin: "25px" }}
                >
                  back
                </button>
              </div>
              {this.props.eventDescription[this.props.index].cost === "FREE" ? (
                <div className="btn-group btn-group-justified">
                  <button
                    type="submit"
                    className="btn btn-default"
                    style={{ margin: "25px" }}
                    onClick={this.attendToggler.bind(this)}
                  >
                    FREE
                  </button>
                </div>
              ) : (
                <div className="btn-group btn-group-justified">
                  <button
                    type="submit"
                    className="btn btn-default"
                    style={{ margin: "25px" }}
                    onClick={this.attendTogglerMoney.bind(this)}
                  >
                    Attend
                  </button>
                </div>
              )}
            </center>
          </div>
        ) : this.state.attendMoney ? (
          <Attend
            eventId={this.props.eventDescription[this.props.index]._id}
            events={this.props.eventDescription}
          />
        ) : (
          <EventsList events={this.props.eventDescription} />
        )}
      </div>
    );
  }
}

export default MoreInfo;
