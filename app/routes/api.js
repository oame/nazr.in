const {Router} = require('express')
const Base62 = require('base62')
const validUrl = require('valid-url')

var ShortLink = require('../models/short_link')
var APIRouter = Router()

// Create new shortened link and return it
APIRouter.route('/short_links')
  .post((req, res) => {
    ShortLink.nextCount((err, nextCount) => {
      let url = req.body.url
      if (!validUrl.isUri(url)){
        res.json({error: "Invalid URL provided"})
        return
      }

      let shortLink = new ShortLink()
      shortLink.url = url
      shortLink.base62 = Base62.encode(nextCount)

      shortLink.save((err) => {
        if (err){
          res.json({error: err})
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
        res.send(err)
        return
      }
      res.json(shortLink)
    })
  })

module.exports = APIRouter
