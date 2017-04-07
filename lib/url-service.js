// @flow

const Base62 = require('base62')
const validator = require('validator')

const ShortLink = require('../models/short-link')

function shortenURL (url: string): Promise<Object> {
  return new Promise((resolve, reject) => {
    if (!validator.isURL(url)) {
      return reject(new Error('Invalid URL provided'))
    }

    if (url.indexOf('http://nazr.in') > -1) {
      return reject(new Error('URLs contain nazr.in can not to be shortened'))
    }

    const shortLink = new ShortLink()

    shortLink.save()
      .then(shortLink => {
        shortLink.url = url
        shortLink.base62 = Base62.encode(shortLink.numerical_id)
        return shortLink.save()
      })
      .then(shortLink => {
        return resolve(shortLink)
      })
  })
}

function getURL (id: string): Promise<Object> {
  return new Promise((resolve, reject) => {
    ShortLink.findOne({base62: id})
      .then(shortLink => {
        if (shortLink === null) {
          return reject(new Error('Requested link is missing'))
        }
        resolve({
          numerical_id: shortLink.numerical_id, // eslint-disable-line camelcase
          base62: shortLink.base62,
          url: shortLink.url
        })
      })
  })
}

module.exports = {
  shortenURL,
  getURL
}
