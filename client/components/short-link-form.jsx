import React from 'react';
import request from 'superagent';

export default class ShortLinkForm extends React.Component {
	constructor(props) {
		super(props);
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

		const endpoint = '/api/short_links';

		request
			.post(endpoint)
			.send({url})
			.set('Accept', 'application/json')
			.end((err, res) => {
				if (err) {
					console.error(res.body, res.error);
					return;
				}
				this.setState({value: res.body.shortURL});
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
