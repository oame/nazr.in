// import url from 'url'
import test from 'ava'
import {Mongoose} from 'mongoose'
import autoIncrement from 'mongoose-auto-increment'
import mockgoose from 'mockgoose'

const testURL = 'http://oameya.com'
const mongoose = new Mongoose()

test.cb.before(t => {
	mockgoose(mongoose).then(() => {
		const connection = mongoose.connect('mongodb://localhost/nazrin', err => {
			console.log(err)
		})
		console.log('connected')
		autoIncrement.initialize(connection)
		t.context.urlService = require('../lib/url-service')

		t.end()
	})
})

test.serial('shorten url', t => {
	t.context.urlService.shortenURL(testURL)
		.then(shortLink => {
			t.context.shortLink = shortLink
			t.deepEqual(shortLink, {shortURL: testURL})
		})
})

// test.serial('retrieve decoded url', t => {
// 	console.log(t.context)
// 	const id = url.parse(t.context.shortLink).path
// 	console.log(id)
// 	urlService.getURL(id)
// 		.then(shortLink => {
// 			t.deepEqual(shortLink, {shortURL: testURL})
// 		})
// })
