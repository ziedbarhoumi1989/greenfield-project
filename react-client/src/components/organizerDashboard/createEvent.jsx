import React, { Component } from "react";
import $ from "jquery";
import { Redirect } from "react-router-dom";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import axios from 'axios'

class createEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: "",
      description: "",
      date: "",
      category: "",
      cost: "",
      imgUrl: "",
      videos: "",
      organizerId: "",
      redirect: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleClick(e) {
    this.refs.fileUploader.click();
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  componentDidMount() {
    let User = {};
    if (localStorage && localStorage.getItem("user")) {
      User = JSON.parse(localStorage.getItem("user"));
      this.setState({
        organizerId: User._id
      });
    }
  }
  /**
   *
   * @param {*} event
   * @returns {} it submits the created event info to the database where it will be saved
   */
  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    $.ajax({
      type: "POST",
      url: "/api/createevnt",
      dataType: "text",
      data: this.state,
      contentType: "application/x-www-form-urlencoded",
      success: data => {
        this.setState({ redirect: true });
      },
      error: err => {
        console.log(err);
      }
    });
  }

  render() {
    if (this.state.redirect) {
      this.setState({
        redirect: false
      });
      return (
        <Redirect
          to={{
            pathname: "/organizerdashboard"
          }}
        />
      );
    }
    return (
      <div>
        <div className="container">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <fieldset>
              <legend>Create a new Event</legend>

              <div className="form-group">
                <label htmlFor="Name">Event Name: </label>
                <input
                  type="text"
                  name="eventName"
                  value={this.state.eventName}
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="Enter te event name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">
                  Event Location and description:{" "}
                </label>
                <input
                  type="text"
                  placeholder="description"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleChange}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="dateOfBirth">Date</label>
                <input
                  type="date"
                  name="date"
                  value={this.state.date}
                  onChange={this.handleChange}
                  className="form-control"
                  placeholder="Enter  Date"
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  placeholder="Category"
                  name="category"
                  value={this.state.category}
                  onChange={this.handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="cost">cost</label>
                <input
                  type="text"
                  placeholder="cost"
                  name="cost"
                  value={this.state.cost}
                  onChange={this.handleChange}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label htmlFor="urlPic">Add an image url</label>
                <input
                  name="imgUrl"
                  type="text"
                  value={this.state.imgUrl}
                  onChange={this.handleChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label htmlFor="urlPic">Add a videos url</label>
                <input
                  name="videos"
                  value={this.state.videos}
                  onChange={this.handleChange}
                  type="text"
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

export default createEvent;
