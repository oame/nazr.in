const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

const {Schema} = mongoose

const ShortLinkSchema = new Schema({
	url: String,
	base62: String
})

ShortLinkSchema.plugin(autoIncrement.plugin, {model: 'ShortLink', field: 'numerical_id'})

module.exports = mongoose.model('ShortLink', ShortLinkSchema)
