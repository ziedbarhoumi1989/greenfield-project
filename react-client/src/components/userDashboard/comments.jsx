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

  changeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  updateState() {
    this.setState({
      redirect: !this.state.redirect
    });
  }

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
      // console.log(obj, this.props.comments);
      Axios.post(`/api/comment/${this.props.comments._id}`, obj).then(data => {
        if (data.data === "Comment Was Sent") {
          //   console.log(data.data);
          //   this.setState({
          //     redirect: true
          //   });
          alert("Comment Was Sent");
          this.componentDidMount();
        }
      });
    } else {
      alert("PLEASE FILL THE TEXT BOX");
    }
  }
  componentDidMount() {
    Axios.get(`/api/comment/${this.props.comments._id}`).then(response => {
      console.log(response);
      console.log(response.data[0].comments);
      this.setState({ comments: response.data[0].comments });
    });
  }
  render() {
    const { comment } = this.state;

    // if (this.state.redirect) {
    //   this.setState({
    //     redirect: true
    //   });
    //   return (
    //     <Redirect
    //       to={{
    //         pathname: "/profile"
    //       }}
    //     />
    //   );
    // }
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
