import React, { Component } from "react";
import moreInfo from "./moreInfo.jsx";
import MoreInfo from "./moreInfo.jsx";
import { Redirect } from "react-router-dom";

class EventsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventList: true,
      moreInfo: false,
      index: null,
      msg: ""
    };
  }
  //  THIS FUNCTION IS USED TO UPDATE THE STATES AND GET THE INDEX OF THE CLICKED DIV TO SEND TO THE MORE INF TAB

  changeHandler(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  //

  //  THIS FUNCTION IS USED TO TOGGLE THE VIEW BETWEEN THE EVENTS LIST AND THE MORE INFO TAB

  toggleComponents(e) {
    e.preventDefault();
    this.setState({
      eventList: false,
      moreInfo: true
    });
  }

  render() {
    //##########  S T Y L E S ##########\\
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
      width: "100%",
      fontSize: "300%"
    };

    const ps = {
      padding: "2px 16px"
    };
    //##########  S T Y L E S ##########\\
    /**
     * CHECKS THE EVENT LIST TO CHECK WHICH COMPONENT TO RENDER
     * THEN CHECKS THE LENGTH OF THE ARRAY OF EVENTS
     * MAPS THROUGH THEM AND SHOWS THEM
     */
    return (
      <div>
        {this.state.eventList ? (
          this.props.events.length !== 0 ? (
            this.props.events.map((event, idx) => {
              return (
                <div
                  key={idx}
                  value={idx}
                  name="idx"
                  style={container}
                  onClick={this.changeHandler.bind(this)}
                >
                  <img src={event.imgUrl[0]} style={{ width: "100%" }} />
                  <div className="container">
                    <h1>{event.eventName}</h1>
                    <h3 style={ps}>Date: {event.date}</h3>
                    <p style={ps}>Category: {event.category}</p>
                    <center>
                      <button
                        type="submit"
                        name="index"
                        value={idx}
                        onClick={this.toggleComponents.bind(this)}
                        className="btn btn-primary"
                        style={{ margin: "25px" }}
                      >
                        More Info
                      </button>
                    </center>
                  </div>
                </div>
              );
            })
          ) : (
            <center>
              {" "}
              <p>NO EVENTS TO SHOW FOR NOW </p>
            </center>
          )
        ) : (
          <MoreInfo
            index={this.state.index}
            eventDescription={this.props.events}
          />
        )}
      </div>
    );
  }
}
export default EventsList;
