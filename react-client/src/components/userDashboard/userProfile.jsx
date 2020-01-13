import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import NavBar from './navBar.jsx';

class UserProfile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userId: '',
			profile: [],
			redirect: false
		};
	}

	componentDidMount() {
		let User = {};
		if (localStorage && localStorage.getItem('user')) {
			User = JSON.parse(localStorage.getItem('user'));
			this.setState({
				userId: User._id
			});
		}

		axios.post(`/api/users/${User._id}`).then((res) => {
			const profile = res.data;
			this.setState({ profile: profile });
		});
	}
	changeRedirection() {
		this.setState({ redirect: !this.state.redirect });
	}

	render() {
		// D  E   S   I   G   N   E //
		const card = {
			boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
			maxWidth: '600px',
			margin: 'auto',
			textAlign: 'center',
			backgroundColor: 'white'
		};

		const title = {
			color: 'grey',
			fontSize: '18px'
		};

		const button = {
			border: 'none',
			outline: '0',
			display: 'inline-block',
			padding: '8px',
			color: 'white',
			backgroundColor: '#000',
			textAlign: 'center',
			cursor: 'pointer',
			width: '100%',
			fontSize: '18px'
		};

		const a = {
			textDecoration: 'none',
			fontSize: '22px',
			color: 'black'
		};

		//  F   I   N   I   S   H   E   D//
		if (this.state.redirect) {
			this.changeRedirection();
			return (
				<Redirect
					to={{
						pathname: '/editUserProfile',
						state: { userId: this.state.userId }
					}}
				/>
			);
		}
		return (
			<div>
				{!this.state.redirect ? (
					<div style={card}>
						<img src={this.state.profile.imgUrl} style={{ width: '100%' }} />
						<h1>{this.state.profile.fullname}</h1>

						<p>Birth Date: {this.state.profile.birthDate}</p>
						<p>About: {this.state.profile.about}</p>
						<p>Phone Number: {this.state.profile.phoneNumber}</p>
						<p>
							<button style={button} onClick={this.changeRedirection.bind(this)}>
								Edit
							</button>
						</p>
					</div>
				) : null}
			</div>
		);
	}
}

export default UserProfile;
