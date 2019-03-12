import { Router } from 'express'
import { shortenURL, getURL } from '../services/url-service'

const APIRouter = new Router()

// Create new shortened link and return it
APIRouter.route('/short_links').post(async (req, res) => {
  try {
    const shortLink = await shortenURL(req.body.url)
    res.json({
      shortURL: `https://nazr.in/${shortLink.base62}`,
    })
  } catch (err) {
    res.status(400)
    res.json({
      error: err.message,
    })
    console.error(err)
  }
})

// Get one of links
APIRouter.route('/short_links/:base62').get(async (req, res) => {
  try {
    const shortLink = await getURL(req.params.base62)
    res.json(shortLink)
  } catch (err) {
    res.status(400)
    res.json({
      error: err.message,
    })
    console.error(err)
  }
})

export default APIRouter
