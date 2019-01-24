import { Router } from 'express'
import { shortenURL, getURL } from '../services/url-service'

const APIRouter = new Router()

// Create new shortened link and return it
APIRouter.route('/short_links').post((req, res) => {
  shortenURL(req.body.url)
    .then(shortLink => {
      res.json({
        shortURL: `https://nazr.in/${shortLink.base62}`,
      })
    })
    .catch(err => {
      res.status(400)
      res.json({
        error: err.message,
      })
      console.error(err)
    })
})

// Get one of links
APIRouter.route('/short_links/:base62').get((req, res) => {
  getURL(req.params.base62)
    .then(shortLink => {
      res.json(shortLink)
    })
    .catch(err => {
      res.status(400)
      res.json({
        error: err.message,
      })
      console.error(err)
    })
})

export default APIRouter
