import test from 'ava'
import mongoose from 'mongoose'
import Base62 from 'base62'

import urlService from '../lib/url-service'

const testURL = 'https://oameya.com'
const databaseURL = 'mongodb://localhost/nazrin_test'

mongoose.connect(databaseURL)

test.serial('shorten url and retrieve its decoded value', async t => {
  const res = await urlService.shortenURL(testURL)
  t.is(res.url, testURL)
  t.is(res.base62, Base62.encode(res.numerical_id))

  const receivedURL = await urlService.getURL(res.base62)
  t.is(receivedURL.url, testURL)
  t.is(receivedURL.numerical_id, res.numerical_id)
})

test.serial('incremental id', async t => {
  const firstURL = await urlService.shortenURL(testURL)
  const firstID = parseInt(firstURL.numerical_id, 10)

  const secondURL = await urlService.shortenURL(testURL)
  const secondID = parseInt(secondURL.numerical_id, 10)

  t.is(firstID + 1, secondID)
})
