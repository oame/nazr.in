const {Router} = require('express')
const Base62 = require('base62')
const validUrl = require('valid-url')

const ShortLink = require('../models/short-link')

const APIRouter = new Router()

// Create new shortened link and return it
APIRouter.route('/short_links')
	.post((req, res) => {
		ShortLink.nextCount((err, nextCount) => {
			const url = req.body.url
			if (!validUrl.isUri(url)) {
				res.status(500)
				res.render('error', {
					message: 'Invalid URL provided',
					error: err
				})
				return
			}

			const shortLink = new ShortLink()
			shortLink.url = url
			shortLink.base62 = Base62.encode(nextCount)

			shortLink.save(err => {
				if (err) {
					res.status(500)
					res.render('error', {
						message: 'Cannot create the link',
						error: err
					})
					return
				}

				res.json(shortLink)
			})
		})
	})

// Get one of links
APIRouter.route('/short_links/:base62')
	.get((req, res) => {
		ShortLink.findOne({base62: req.params.base62}, (err, shortLink) => {
			if (err) {
				res.status(500)
				res.render('error', {
					message: 'Cannot retrieve links',
					error: err
				})
				return
			}
			res.json(shortLink)
		})
	})

module.exports = APIRouter
