const mongoose = require('mongoose');
const User = require('./userModels');

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title cannot be empty'],
    },
    body: {
      type: String,
    },
    photo: {
      type: String,
      required: [true, 'Please upload a photo'],
    },
    likes: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    comments: {
      text: String,
      postedByComment: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    },
    postedBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Post must belong to a user'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
