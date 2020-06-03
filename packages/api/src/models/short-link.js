import mongoose, {model, Schema} from 'mongoose';
import MongooseSequence from 'mongoose-sequence';

const AutoIncrement = MongooseSequence(mongoose);

const ShortLinkSchema = new Schema({
  url: String,
  base62: String,
});

ShortLinkSchema.plugin(AutoIncrement, {inc_field: 'numerical_id'}); // eslint-disable-line camelcase

export default model('ShortLink', ShortLinkSchema);
