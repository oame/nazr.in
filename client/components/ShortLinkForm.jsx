import React, {PropTypes} from 'react'
import request from 'superagent'

export default class ShortLinkForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const url = this.state.value

    request
      .post('http://api.nazr.in/short_links')
      .send({url: url})
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          console.error(err)
          return
        }
        let shortenedURL = `http://nazr.in/${res.body.base62}`
        this.setState({value: shortenedURL})
      })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          ref="input"
          placeholder="Type your URL"
          value={this.state.value}
          onChange={this.handleChange} />
        <button>Shorten</button>
      </form>
    )
  }
}
