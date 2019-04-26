const mongoose = require('mongoose')

const artistSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    genre: String,
    members: [String],
    rating: {
      type: Number,
      min: 1,
      max: 10
    },
    year: Number
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = mongoose.model('Artist', artistSchema)
