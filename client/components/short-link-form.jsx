import React from 'react';
import 'whatwg-fetch';

export default class ShortLinkForm extends React.Component {
	constructor(...args) {
		super(...args);
		this.state = {
			value: ''
		};
	}

	handleChange = event => {
		this.setState({value: event.target.value});
	}

	handleSubmit = event => {
		event.preventDefault();
		const url = this.state.value;
		if (!url || url.indexOf('http://nazr.in') > -1) {
			return;
		}

		const options = {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({url})
		};

		fetch('/api/short_links', options)
			.then(response => response.json())
			.then(body => {
				if (body.error) {
					return console.log(body.error);
				}
				this.setState({value: body.shortURL});
			});
	}

	render() {
		return (
			<form className="short-link-form" onSubmit={this.handleSubmit}>
				<div className="short-link-form__input-container">
					<i className="material-icons">web</i>
					<input
						className="short-link-form__input"
						placeholder="http://"
						value={this.state.value}
						onChange={this.handleChange}
						/>
				</div>
				<button
					type="submit"
					className="short-link-form__submit"
					>
					<i className="material-icons">transform</i>
				</button>
			</form>
		);
	}
}
