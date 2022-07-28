const mongoose = require('mongoose');

const {Schema} = mongoose;

const reviewer = new Schema({
  review_id: Number,
  name: String,
  email: String,
})
const PhotoSchema = new Schema ({
  id: Number,
  url: String,
})
const ReviewSchema = new Schema({
  review_id: Number,
  rating: Number,
  summary: String,
  recommend: Boolean,
  response: {type: String, default: null},
  body: String,
  date: new Date("<YYYY-mm-ddTHH:MM:ss>"),
  reviewer_name: ReviewSchema.name,
  helpfulness: Number,
  photos: [PhotoSchema],
});

const ReviewsSchema = new Schema({
  product_id: Number,
  result: [ReviewSchema]
});

//-----------------------
const RatingSchema = ({
  '1': Number,
  '2': Number,
  '3': Number,
  '4': Number,
  '5': Number,
})

const RecommendSchema = ({
  'false': Number,
  'true': Number,
})

const characteristicSchema = ({
  product_id: Number,
  name: String,
  size: Number,
  sum: Number,
  value: Number,
})

const MetaSchema = new Schema({
  product_id: Number,
  rating: RatingSchema,
  recommend: RecommendSchema,
  characteristic: characteristicSchema,
})

const Reviews = mongoose.model('reviews', ReviewsSchema);
const Meta = mongoose.model('meta', MetaSchema);

module.exports.Reviews = Reviews;
module.exports.Meta = Meta;

