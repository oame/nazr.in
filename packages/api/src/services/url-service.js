import { encode as base64Encode } from 'base62'
import { isURL } from 'validator'

import ShortLink from '../models/short-link'

export async function shortenURL(url) {
  if (!isURL(url)) {
    throw new Error('Invalid URL provided')
  }

  if (url.indexOf('//nazr.in') > -1) {
    throw new Error('URLs contain nazr.in can not to be shortened')
  }

  const shortLink = new ShortLink()
  await shortLink.save()
  shortLink.url = url
  shortLink.base62 = base64Encode(shortLink.numerical_id)
  await shortLink.save()
  return shortLink
}

export async function getURL(id) {
  const shortLink = await ShortLink.findOne({ base62: id })
  if (shortLink === null) {
    throw new Error('Requested link is missing')
  }
  return {
    numerical_id: shortLink.numerical_id, // eslint-disable-line camelcase
    base62: shortLink.base62,
    url: shortLink.url,
  }
}
