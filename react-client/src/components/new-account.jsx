import React from "react";
import $ from "jquery";
import Create_user from "./signup-user.jsx";
import Create_organizer from "./signup-organizer.jsx";
import { Link } from "react-router-dom";

class Create_account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {/* <Link to='/signupuser'>> */}
        {/* <h1>new user account</h1> */}
        {/* </Link> */}
        {/* <Link to='/signuporganizer'> */}
        {/* <h1>new organizer account</h1> */}
        {/* </Link> */}
        <center>
          <h1 className="display-4">WELCOME!</h1>
        </center>
        <div className="container">
          <div className="row">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
              <div className="card card-signin my-5">
                <div className="card-body">
                  <Link to="/signupuser">
                    <button
                      className="btn btn-lg btn-primary btn-block text-uppercase"
                      type="submit"
                    >
                      New User Account
                    </button>
                  </Link>
                  <br />
                  <Link to="/signuporganizer">
                    <button
                      className="btn btn-lg btn-primary btn-block text-uppercase"
                      type="submit"
                    >
                      New Organizer Account
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Create_account;
