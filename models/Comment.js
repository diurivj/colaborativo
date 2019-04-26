const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    artist: {
      type: Schema.Types.ObjectId,
      ref: 'Artist'
    },
    body: String
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = mongoose.model('Comment', commentSchema)
