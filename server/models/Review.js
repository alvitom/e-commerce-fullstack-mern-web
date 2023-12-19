const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  rating: {
    type: Number,
  },
  comment: {
    type: String,
  },
  review_date: {
    type: Date,
  },
});

const Review = mongoose.model("reviews", reviewSchema);

module.exports = Review;
