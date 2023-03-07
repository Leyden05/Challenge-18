const { Schema, model } = require('mongoose');
// const { formateDate } = require('../utils/format.js')
const reactionSchema = require('./Reaction');


const thoughtSchema = new Schema(
  {
      thoughtText: {
          type: String,
          required: true,
          maxlength: 280,
      },
      createdAt: {
          type: Date,
          get: ((date) => {
              date = new Date().toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"}) 
              return date
          }),
          default: Date.now,
      },
      username: {
          type: String,
          required: true,
      },
      reactions: [reactionSchema],
  },
  {
      toJSON: {
          getters: true,
          virtuals: true,
      },
      id: false,
  }
)


// retrieves the length of the user's friends
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;