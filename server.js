const {join} = require('path')
const express = require('express')
const corser = require('corser')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')

// Setup database
const port = process.env.PORT || 3000
const databaseURL = process.env.MONGODB_URI || 'mongodb://localhost/nazrin'
const connection = mongoose.connect(databaseURL)

const ShortLink = require('./models/short-link')
const APIRouter = require('./routes/api')

// Setup app server
const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(morgan('combined'))
app.use(corser.create())
app.use(express.static(join(__dirname, 'public')))

// API routes
// app.use(subdomain('api', APIRouter))
app.use('/api', APIRouter)

// Global routes
app.get('/*', (req, res) => {
	ShortLink.findOne({base62: req.params[0]}, (err, shortLink) => {
		if (err || shortLink === null) {
			res.redirect('/')
			return
		}
		res.redirect(shortLink.url)
	})
})

app.listen(port, () => {
	console.log(`http://localhost:${port}`)
})
