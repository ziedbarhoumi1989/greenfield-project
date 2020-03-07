import React, { Component } from "react";
import Axios from "axios";
import { Redirect } from "react-router-dom";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      userId: "",
      username: "",
      redirect: false,
      comments: []
    };
  }
  /**
   *
   * @param {*} e
   * @returns {} UPDATES THE COMMENT STATE WITH AWHAT IS WRITTEN IN THE TEXTBOX
   */
  changeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  /**
   *
   * @param {*} e
   * @returns {} takes the user id from the local storage
   * checks if the textbox is empty
   * sends an axios request to the server with the comments
   */
  submitComment(e) {
    e.preventDefault();
    let User = {};
    if (localStorage && localStorage.getItem("user")) {
      User = JSON.parse(localStorage.getItem("user"));
      this.setState({
        userId: User._id,
        username: User.username
      });
    }
    if (this.state.comment !== "") {
      var obj = {
        userId: User._id,
        username: User.username,
        comment: this.state.comment
      };
      Axios.post(`/api/comment/${this.props.comments._id}`, obj).then(data => {
        if (data.data === "Comment Was Sent") {
          alert("Comment Was Sent");
        }
      });
    } else {
      alert("PLEASE FILL THE TEXT BOX");
    }
  }

  render() {
    const { comment } = this.state;

    return (
      <div>
        <div className="container">
          <h3>Comments ({this.props.comments.comments.length})</h3>
        </div>
        {this.props.comments.comments.length > 0 ? (
          this.props.comments.comments.map((comment, idx) => {
            return (
              <div key={idx} className="container">
                <hr />
                <h5>@{comment.username}</h5>
                <p>{comment.comment}</p>
              </div>
            );
          })
        ) : (
          <p>NO COMMENTS TO SHOW</p>
        )}
        <br />
        <hr />
        <form>
          <div className="container">
            <label htmlFor="comment">Comment:</label>
          </div>
          <textarea
            className="form-control"
            name="comment"
            value={comment}
            onChange={this.changeHandler.bind(this)}
            id="comment"
            cols="30"
            rows="10"
          />
          <button
            className="btn btn-lg btn-primary btn-block text-uppercase"
            type="submit"
            onClick={this.submitComment.bind(this)}
          >
            Add Comment
          </button>
        </form>
      </div>
    );
  }
}

export default Comments;
