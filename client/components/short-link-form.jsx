// @flow

import React from 'react'
import 'whatwg-fetch'

export default class ShortLinkForm extends React.Component {
  state: {
    value: string
  }

  constructor(...args: any) {
    super(...args)
    this.state = {
      value: '',
      notification: ''
    }
  }

  handleChange(event: any) {
    this.setState({ value: event.target.value })
  }

  handleSubmit(event: any) {
    event.preventDefault()
    const url: string = this.state.value
    if (!url || url.indexOf('http://nazr.in') > -1) {
      return
    }

    const options: Object = {
      method: 'POST',
      headers: {
        Accept: 'application/json', // eslint-disable-line quote-props
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url })
    }

    fetch('/api/short_links', options)
      .then(response => response.json())
      .then(body => {
        if (body.error) {
          this.setState({ notification: body.error })
          return console.log(body.error)
        }
        this.setState({ value: body.shortURL })
      })
  }

  render() {
    return (
      <div style={{ width: '100%' }}>
        <form
          className="short-link-form"
          onSubmit={this.handleSubmit.bind(this)}
        >
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
