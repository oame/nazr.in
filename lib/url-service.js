const Base62 = require('base62')
const validUrl = require('valid-url')

const ShortLink = require('../models/short-link')

function shortenURL(url) {
	return new Promise((resolve, reject) => {
		if (!validUrl.isUri(url)) {
			return reject({
				message: 'Invalid URL provided',
				error: err
			})
		}

		const shortLink = new ShortLink()
		shortLink.save(err => {
			if (err) {
				return reject({
					message: 'Cannot initialize a link',
					error: err
				})
			}
			shortLink.url = url
			shortLink.base62 = Base62.encode(shortLink.id)
			shortLink.save(err => {
				if (err) {
					return reject({
						message: 'Cannot create the link',
						error: err
					})
				}
				resolve(shortLink)
			})
		})
	})
}

function getURL(id) {
	return new Promise((resolve, reject) => {
		ShortLink.findOne({base62: id}, (err, shortLink) => {
			if (err) {
				return reject({
					message: 'Cannot retrieve links',
					error: err
				})
			}
			resolve(shortLink)
		})
	})
}

module.exports = {
	shortenURL,
	getURL
}
