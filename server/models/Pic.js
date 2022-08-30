const { Schema, model } = require('mongoose');
const commentSchema = require('./Comment')

const picSchema = new Schema(
  {
    pngString:{
      type: String,
      required: true,
      unique: true,
    },
    comments: [commentSchema],
    collaborators: [
      {
        username:{
          type: String,
          required: true
        } 
      }
    ]
  }
)

const Pic = model('Pic', picSchema);

module.exports = Pic;