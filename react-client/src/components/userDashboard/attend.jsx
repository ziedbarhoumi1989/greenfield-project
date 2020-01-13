import React, { Component } from 'react';
import EventsList from '../userDashboard/eventsList.jsx';
import $ from 'jquery';
// import '../designe.css'

class Attend extends Component {
	constructor(props) {
		super(props);
		this.state = {
			attend: true,
			home: false,
			userId: ''
		};
	}

	handleChange(e) {
		e.preventDefault();
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleClick(e) {
		e.preventDefault();
		this.setState({
			attend: false,
			home: true
		});
	}

	handleClick() {
		let User = {};
		if (localStorage && localStorage.getItem('user')) {
			User = JSON.parse(localStorage.getItem('user'));
			this.setState({
				userId: User._id
			});
		}

		var obj = {};
		obj.userId = User._id;
		obj.eventId = this.props.eventId;
		console.log(obj);
		$.ajax({
			url: '/api/profiles',
			type: 'POST',
			data: obj,
			success: (data) => {
				if (data === 'Joined') {
					this.setState({
						attend: false,
						home: true
					});
				}
			},
			error: (err) => {
				throw err;
			}
		});
	}

	render() {
		const attendForm = {
			font: '95% Arial Helvetica sans-serif',
			maxWidth: ' 400px',
			margin: '10px auto',
			padding: '16px',
			background: '#F7F7F7'
		};
		const title = {
			background: '#43D1AF',
			padding: '20px 0',
			fontSize: '140%',
			fontWeight: '300',
			textAlign: 'center',
			color: '#fff',
			margin: '-16px -16px 16px -16px'
		};
		const inputBox1 = {
			outline: 'none',
			width: '100%',
			background: '#fff',
			marginBottom: '4%',
			border: '1px solid #ccc',
			padding: '3%',
			color: '#555',
			font: '95% Arial, Helvetica, sans-serif'
		};

		const submit1 = {
			boxSizing: 'border-box',
			width: '100%',
			padding: '3%',
			background: '#43D1AF',
			borderBottom: '2px solid #30C29E',
			borderTopStyle: 'none',
			borderRightStyle: 'none',
			borderLeftStyle: 'none',
			color: '#fff'
		};

		return (
			<div>
				{console.log(this.props.eventId)}
				{this.state.attend ? (
					<div style={attendForm}>
						<h1 style={title}>USER INFO</h1>
						<div>
							<label htmlFor="expiry_date">Expiry date: </label>
							<br />
							<br />
							<input
								type="date"
								name="Expiry_date"
								id="Expiry_date"
								style={inputBox1}
								onChange={this.handleChange.bind(this)}
								placeholder="Enter Credit Card Expiry Date"
								required
							/>
							<hr />
						</div>
						<div>
							<label htmlFor="CVV">CVV: </label>
							<br />
							<br />
							<input
								type="number"
								name="CVV"
								id="CVV"
								style={inputBox1}
								onChange={this.handleChange.bind(this)}
								placeholder="Enter CVV"
								required
							/>
							<hr />
						</div>
						<div>
							<label htmlFor="Billing">Billing address: </label>
							<br />
							<br />
							<input
								type="text"
								name="Billing_address"
								id="Billing_address"
								style={inputBox1}
								onChange={this.handleChange.bind(this)}
								placeholder="Enter Billing Address"
								required
							/>
							<hr />
						</div>
						<div>
							<br />
							<br />
							<button type="submit" style={submit1} onClick={this.handleClick.bind(this)}>
								Submit
							</button>
							<button type="submit" style={submit1} onClick={this.handleClick.bind(this)}>
								Cancel
							</button>
							<hr />
						</div>
					</div>
				) : (
					<EventsList events={this.props.events} />
				)}
			</div>
		);
	}
}

export default Attend;
