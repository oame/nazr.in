import test from 'ava'
import mongoose from 'mongoose'
import Base62 from 'base62'

const testURL = 'http://oameya.com'
const databaseURL = 'mongodb://localhost/nazrin_test'
mongoose.connect(databaseURL)

const urlService = require('../lib/url-service')

test.serial('shorten url and retrieve its decoded value', async t => {
  const generatedURL = await urlService.shortenURL(testURL)
  t.is(generatedURL.url, testURL)
  t.is(generatedURL.base62, Base62.encode(generatedURL.numerical_id))

  const receivedURL = await urlService.getURL(generatedURL.base62)
  t.is(receivedURL.url, testURL)
  t.is(receivedURL.numerical_id, generatedURL.numerical_id)
})

test.serial('incremental id', async t => {
  const firstURL = await urlService.shortenURL(testURL)
  const firstID = parseInt(firstURL.numerical_id, 10)

  const secondURL = await urlService.shortenURL(testURL)
  const secondID = parseInt(secondURL.numerical_id, 10)

  t.is(firstID + 1, secondID)
})
