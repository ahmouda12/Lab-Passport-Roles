const mongoose     = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const RepoSchema = mongoose.Schema({
  githubId:         String,
  user_id:          mongoose.Schema.ObjectId,
  name:             String,
  url:              String,
  description:      String,
  stargazers_count: String
});

RepoSchema.plugin(findOrCreate);
const Repo = mongoose.model('Repo', RepoSchema);

module.exports = Repo;