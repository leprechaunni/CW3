const { Schema, model } = require('mongoose');

const game = new Schema({
   title: {
      type: String,
      required: true,
   },
   img: String,
   description: {
      type: String,
      required: true,
   },
   genre: {
      type: String,
   },
   url: String,
   userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
   }
});

module.exports = model('Game', game);
