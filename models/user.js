const { Schema, model } = require('mongoose');

const userSchema = new Schema({
   email: {
      type: String,
      required: true,
   },
   name: {
      type: String,
      required: true,
   },
   gameId: {
      type: Schema.Types.ObjectId,
      ref: 'Game',
   },
})

module.exports = model('User', userSchema);