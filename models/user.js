const mongoose     = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const UserSchema = mongoose.Schema({
  token:    String,
  githubId: String,
  name:     String,
  username: String,
  email:    String,
  avatar:   String,
});

UserSchema.plugin(findOrCreate);
const User = mongoose.model('User', UserSchema);

module.exports = User;