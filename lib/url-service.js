const Base62 = require('base62')
const validUrl = require('valid-url')

const ShortLink = require('../models/short-link')

function shortenURL(url) {
	return new Promise((resolve, reject) => {
		if (!validUrl.isUri(url)) {
			return reject({
				message: 'Invalid URL provided'
			})
		}

		const shortLink = new ShortLink()
		shortLink.save()
			.then(shortLink => {
				shortLink.url = url
				shortLink.base62 = Base62.encode(shortLink.id)
				return shortLink.save()
			})
			.then(shortLink => {
				return resolve(shortLink)
			})
			.catch(err => {
				return reject({
					message: 'Cannot create a link',
					error: err
				})
			})
	})
}

function getURL(id) {
	return new Promise((resolve, reject) => {
		ShortLink.findOne({base62: id})
			.then(shortLink => {
				resolve(shortLink)
			})
			.catch(err => {
				reject({
					message: 'Cannot retrieve links',
					error: err
				})
			})
	})
}

module.exports = {
	shortenURL,
	getURL
}