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
    if (!url || url.indexOf('http://nazr.in') > -1) {
      return
    }

    request
      .post('http://api.nazr.in/short_links')
      // .post('/api/short_links')
      .send({url: url})
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          console.error(res.body, res.error)
          return
        }
        console.log(res.body)
        let shortenedURL = `http://nazr.in/${res.body.base62}`
        this.setState({value: shortenedURL})
      })
  }

  render() {
    return (
      <form className="short-link-form" onSubmit={this.handleSubmit}>
        <div className="short-link-form__input-container">
          <i className="material-icons">web</i>
          <input
            className="short-link-form__input"
            placeholder="http://www16.big.or.jp/~zun/"
            value={this.state.value}
            onChange={this.handleChange} />
        </div>
        <button
          type="submit"
          className="short-link-form__submit">
            <i className="material-icons">transform</i>
        </button>
      </form>
    )
  }
}
