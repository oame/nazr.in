import test from 'ava'
import request from 'supertest'

import app from '../server'

test.cb('shorten url and get nazr.in address', t => {
	request(app)
		.post('/api/short_links')
		.send({url: 'http://oameya.com'})
		.set('Accept', 'application/json')
		.expect('Content-Type', 'application/json; charset=utf-8')
		.end((err, res) => {
			if (err) {
				throw err
			}
			console.log(res.body)
			t.true(res.body.shortURL.indexOf('http://nazr.in') > -1)
			t.end()
		})
})
