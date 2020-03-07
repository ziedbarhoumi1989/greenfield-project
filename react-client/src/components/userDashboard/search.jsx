import React, { Component } from "react";
import $ from "jquery";
// import ".././design.css";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: "",
      category: "",
      filttredEvents: [],
      msg: ""
    };
  }

  // Handle's the change of state in the input and the options boxes
  searchIpuntChangeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  // Submits a ajax request to the server and fetches the data brings back the matched data
  submitSearchHandler(e) {
    e.preventDefault();
    var searchComp = {};
    searchComp.eventName = this.state.eventName;
    if (this.state.category !== "") {
      searchComp.category = this.state.category;
    }
    // Sends request to the server with the parameters from the search
    $.ajax({
      url: "/api/events",
      type: "POST",
      data: searchComp,
      success: data => {
        if (data === "No Events with that name") {
          this.setState({
            msg: data
          });
        } else {
          // if it found data it should bring it back and update the state
          this.setState({
            filttredEvents: data
          });
          this.props.events1(this.state.filttredEvents);
        }
      },
      error: err => console.log("Error in get request search", err)
    });
  }

  render() {
    return (
      <div>
        <form
          className="form-inline my-2 my-lg-0"
          onSubmit={this.submitSearchHandler.bind(this)}
        >
          <input
            className="form-control mr-sm-2"
            type="text"
            placeholder="Search"
            name="eventName"
            id="eventName"
            onChange={this.searchIpuntChangeHandler.bind(this)}
            value={this.state.eventName}
          />
          <button className="btn btn-secondary my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
