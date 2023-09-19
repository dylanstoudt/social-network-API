const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

// Schema to create Post model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (dateValue) => dateValue.toLocaleDateString()
    },
    userName: {
      type: String,
    },
    reactions: {
      type: String,
      minLength: 15,
      maxLength: 500,
    },
    responses: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Create a virtual property `responses` that gets the amount of response per video
thoughtSchema
  .virtual('reactionCount')
  // Getter
  .get(function () {
    return this.responses.length;
  });

// Initialize our Video model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
