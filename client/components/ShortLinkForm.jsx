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

    if (!url) {
      return
    }

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
      <form className="short-link-form" onSubmit={this.handleSubmit}>
        <input
          className="short-link-form__input"
          placeholder="URLをここへ"
          value={this.state.value}
          onChange={this.handleChange} />
        <button
          type="submit"
          className="short-link-form__submit">短くする</button>
      </form>
    )
  }
}
