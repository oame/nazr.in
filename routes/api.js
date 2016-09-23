const {Router} = require('express')
const {shortenURL, getURL} = require('../lib/url-service')

const APIRouter = new Router()

// Create new shortened link and return it
APIRouter.route('/short_links')
	.post((req, res) => {
		shortenURL(req.body.url)
			.then(shortLink => {
				res.json({
					shortURL: `http://nazr.in/${shortLink.base62}`
				})
			})
			.catch(err => {
				res.status(400)
				res.json({
					error: err.message
				})
			})
	})

// Get one of links
APIRouter.route('/short_links/:base62')
	.get((req, res) => {
		getURL(req.params.base62)
			.then(shortLink => {
				res.json(shortLink)
			})
			.catch(err => {
				res.status(400)
				res.json({
					error: err.message
				})
			})
	})

module.exports = APIRouter
