import React from 'react'
import fetch from 'isomorphic-unfetch'

export default class ShortLinkForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      value: '',
      notification: '',
      isFetching: false,
    }
  }

  handleChange(event) {
    const { value } = event.target
    this.setState({ value })
  }

  async handleSubmit(event) {
    event.preventDefault()

    this.setState({ isFetching: true })

    const url = this.state.value
    if (!url || url.indexOf('//nazr.in') > -1) {
      return
    }

    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    }
    const response = await fetch('/api/short_links', options)
    const body = await response.json()

    this.setState({ isFetching: false })

    if (body.error) {
      this.setState({ notification: body.error })
      console.log(body.error)
      return
    }

    this.setState({ value: body.shortURL })
  }

  render() {
    return (
      <div style={{ width: '100%' }}>
        <form
          className="short-link-form"
          onSubmit={this.handleSubmit.bind(this)}>
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
