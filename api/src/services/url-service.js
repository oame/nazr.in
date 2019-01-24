import { encode as base64Encode } from 'base62'
import { isURL } from 'validator'

import ShortLink, { findOne } from '../models/short-link'

export function shortenURL(url) {
  return new Promise((resolve, reject) => {
    if (!isURL(url)) {
      return reject(new Error('Invalid URL provided'))
    }

    if (url.indexOf('//nazr.in') > -1) {
      return reject(new Error('URLs contain nazr.in can not to be shortened'))
    }

    const shortLink = new ShortLink()

    shortLink
      .save()
      .then(shortLink => {
        shortLink.url = url
        shortLink.base62 = base64Encode(shortLink.numerical_id)
        return shortLink.save()
      })
      .then(shortLink => {
        return resolve(shortLink)
      })
  })
}

export function getURL(id) {
  return new Promise((resolve, reject) => {
    findOne({ base62: id }).then(shortLink => {
      if (shortLink === null) {
        return reject(new Error('Requested link is missing'))
      }
      resolve({
        numerical_id: shortLink.numerical_id, // eslint-disable-line camelcase
        base62: shortLink.base62,
        url: shortLink.url,
      })
    })
  })
}
