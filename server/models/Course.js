const mongoose = require('mongoose');

const externalLinkSchema = new mongoose.Schema({
  title: String,
  url: String,
  type: String
}, { _id: false });

const quizQuestionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: Number,
  explanation: String
}, { _id: false });

const chapterSchema = new mongoose.Schema({
  id: String,
  title: String,
  order: Number,
  isCompleted: { type: Boolean, default: false },
  content_md: String,
  videoId_1: String,
  videoId_2: String,
  external_links: [externalLinkSchema],
  quiz: [quizQuestionSchema]
});

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  coverImage: { type: String },
  totalChapters: { type: Number, default: 0 },
  completedChapters: { type: Number, default: 0 },
  chapters: [chapterSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', courseSchema);
