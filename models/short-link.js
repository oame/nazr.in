const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')

mongoose.Promise = global.Promise
const {Schema} = mongoose
const ShortLinkSchema = new Schema({
	_id: Number,
	url: String,
	base62: String
}, {_id: false})

ShortLinkSchema.plugin(AutoIncrement)

module.exports = mongoose.model('ShortLink', ShortLinkSchema)
