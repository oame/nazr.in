var mongoose = require('mongoose')
var {Schema} = mongoose
var autoIncrement = require('mongoose-auto-increment')

var ShortLinkSchema = new Schema({
  url: String,
  base62: String
})

ShortLinkSchema.plugin(autoIncrement.plugin, { model: 'ShortLink', field: 'numerical_id' })

module.exports = mongoose.model('ShortLink', ShortLinkSchema)
