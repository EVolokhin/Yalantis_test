const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  surname: String,
  email: String,
  photo: String,
});

module.exports = mongoose.model('User', userSchema);
