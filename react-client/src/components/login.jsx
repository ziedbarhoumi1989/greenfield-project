import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			email: '',
			password: '',
			type: 'user',
			authentified: false,
			usertype: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleChange(e) {
		this.setState({ [e.target.name]: e.target.value });
	}
	handleSubmit(event) {
		event.preventDefault();
		$.ajax({
			type: 'POST',
			url: '/api/login',
			dataType: 'text',
			data: this.state,
			contentType: 'application/x-www-form-urlencoded',
			success: (data) => {
				console.log(typeof data);
				this.setState({
					authentified: true,
					usertype: JSON.parse(data).type
				});
				localStorage.setItem('user', data);
			},
			error: (err) => {
				if (err) {
					console.log(err);
				}
			}
		});
	}
	render() {
		if (this.state.authentified && this.state.usertype === 'user') {
			return (
				<Redirect
					to={{
						pathname: '/userdashboard'
					}}
				/>
			);
		} else if (this.state.authentified && this.state.usertype === 'organizer') {
			return (
				<Redirect
					to={{
						pathname: '/organizerdashboard'
					}}
				/>
			);
		}
		const { username, email, password } = this.state;
		return (
			<div className="container">
				<div className="row">
					<div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
						<div className="card card-signin my-5">
							<div className="card-body">
								<h5 className="card-title text-center">Sign In</h5>
								<form className="form-signin" onSubmit={this.handleSubmit}>
									<div className="form-label-group">
										<input
											type="text"
											id="inputEmail"
											name="username"
											value={username}
											onChange={this.handleChange}
											className="form-control"
											placeholder="Username"
											required
											autoFocus
										/>
										<label htmlFor="inputEmail">Username</label>
									</div>

									<div className="form-label-group">
										<input
											type="email"
											id="inputEmail"
											name="email"
											value={email}
											onChange={this.handleChange}
											className="form-control"
											placeholder="Email address"
											required
											autoFocus
										/>
										<label htmlFor="inputEmail">Email address</label>
									</div>

									<div className="form-label-group">
										<input
											type="password"
											id="inputPassword"
											className="form-control"
											placeholder="Password"
											name="password"
											value={password}
											onChange={this.handleChange}
											required
										/>
										<label htmlFor="inputPassword">Password</label>
									</div>

									<div className="custom-control custom-checkbox mb-3">
										<input type="checkbox" className="custom-control-input" id="customCheck1" />
										<label className="custom-control-label" htmlFor="customCheck1">
											Remember password
										</label>
									</div>
									<button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">
										Sign in
									</button>
									<hr className="my-4" />
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;
