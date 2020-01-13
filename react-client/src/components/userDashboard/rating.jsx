import React, { Component } from "react";
import BeautyStars from "beauty-stars";
import $ from "jquery";

class Ratings extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 0, rating: null };
  }
  updateState() {
    setTimeout(() => {
      this.ratingSubmit();
    }, 1000);
  }

  componentDidMount() {
    $.ajax({
      url: `/api/rate/${this.props.eventId}`,
      type: "GET",
      success: data => {
        var result = 0;
        for (var i = 0; i < data[0].rating.length; i++) {
          result += parseInt(data[0].rating[i]);
          if (i === data[0].rating.length - 1) {
            result = result / data[0].rating.length;
          }
        }
        result = String(result).substring(0, 4);
        this.setState({ rating: result });
      },
      error: err => {
        throw err;
      }
    });
  }

  ratingSubmit() {
    console.log(this.state.value);
    var obj = { rating: this.state.value };
    $.ajax({
      url: `/api/rate/${this.props.eventId}`,
      type: "POST",
      data: obj,
      success: data => {
        // this.setState({ rating: data.results });
        // console.log(data);
        this.componentDidMount();
      },
      error: err => {
        throw err;
      }
    });
  }

  render() {
    return (
      <div>
        <div className="container">
          <label>Rate this event</label>
          <BeautyStars
            value={this.state.value}
            onChange={value => {
              this.setState({ value: value });
              this.updateState();
            }}
            rate={this.ratingSubmit.bind(this)}
          />{" "}
          <p>{this.state.rating}/5</p>
        </div>
      </div>
    );
  }
}

export default Ratings;
