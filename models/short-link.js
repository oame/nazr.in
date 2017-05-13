const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')

mongoose.Promise = global.Promise
const { Schema } = mongoose

const ShortLinkSchema = new Schema({
  url: String,
  base62: String
})

ShortLinkSchema.plugin(AutoIncrement, { inc_field: 'numerical_id' }) // eslint-disable-line camelcase

module.exports = mongoose.model('ShortLink', ShortLinkSchema)
