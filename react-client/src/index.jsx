import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Create_account from './components/new-account.jsx';
import Create_user from './components/signup-user.jsx';
import Create_organizer from './components/signup-organizer.jsx';
import Login from './components/login.jsx';
import UserDashboard from './components/userDashboard/userDashboard.jsx';
import AttendedEvents from './components/userDashboard/attendedEvents.jsx';
import UserProfile from './components/userDashboard/userProfile.jsx';
import EditUserProfile from './components/userDashboard/editUserProfile.jsx';
import organizerDashoard from './components/organizerDashboard/organizerDashoard.jsx';
import Createevent from './components/organizerDashboard/createEvent.jsx';
import MoreInfo from './components/userDashboard/moreInfo.jsx';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		return (
			<div>
				<Router>
					<Switch>
						<Route path="/newaccount" component={Create_account} />
						<Route path="/signupuser" component={Create_user} />
						<Route path="/signuporganizer" component={Create_organizer} />
						<Route path="/login" component={Login} />
						<Route path="/userdashboard" component={UserDashboard} />
						<Route path="/attendedEvents" component={AttendedEvents} />
						<Route path="/profile" component={UserProfile} />
						<Route path="/editUserProfile" component={EditUserProfile} />
						<Route path="/createevent" component={Createevent} />
						<Route path="/organizerdashboard" component={organizerDashoard} />
					</Switch>
				</Router>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
