import React from 'react'
import 'whatwg-fetch'

class ShortLinkForm extends React.Component {
  constructor() {
    super()
    this.state = {
      value: '',
      notification: '',
    }
  }

  handleChange(event) {
    this.setState({ value: event.target.value })
  }

  async handleSubmit(event) {
    event.preventDefault()
    const url = this.state.value
    if (!url || url.indexOf('http://nazr.in') > -1) {
      return
    }

    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json', // eslint-disable-line quote-props
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    }

    const response = await fetch('/api/short_links', options)
    const body = await response.json()
    if (body.error) {
      this.setState({ notification: body.error })
      return console.log(body.error)
    }
    this.setState({ value: body.shortURL })
  }

  render() {
    return (
      <div style={{ width: '100%' }}>
        <form className="short-link-form" onSubmit={this.handleSubmit.bind(this)}>
          <div className="short-link-form__input-container">
            <i className="material-icons">web</i>
            <input
              className="short-link-form__input"
              placeholder="URL"
              value={this.state.value}
              onChange={this.handleChange.bind(this)}
            />
          </div>
          <button type="submit" className="short-link-form__submit">
            <i className="material-icons">transform</i>
          </button>
        </form>
        <div>{this.state.notification}</div>
      </div>
    )
  }
}

export default ShortLinkForm
