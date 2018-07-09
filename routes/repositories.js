const express = require('express');
const GitHub  = require('github-api');
const Repo    = require('../models/repository');


var router = express.Router();

router.post('/publish/:repoId', function(req,res){
    let repo = new Repo({
        githubId:         req.body.id,
        user_id:          req.user._id,
        name:             req.body.name,
        url:              req.body.url,
        description:      req.body.desc,
        stargazers_count: req.body.stars
      });
    
      Repo.find({'githubId': repo.githubId}, (err, repos) => {
        if (err) { res.status(500).send('Something broke!') }
        if (!repos.length) {
          repo.save(repo, (err) => {
            if (err) { res.status(500).send('Something broke!') }
            res.status(200).send('Repo Added!');
          })
        } else {
          res.status(200).send('Repo Was already Added!');
        }
      });
});

router.get('/', ensureAuthenticated, function(req, res){
  var gh = new GitHub({
    username: req.user.username,
    token:    req.user.token
  });

  me = gh.getUser();
  me.listRepos((err, privateRepos) => {
    Repo.find({}, (err, publishedRepos) => {
      res.render('repositories/index', {
        user: req.user,
        privateRepos,
        publishedRepos
      });
    });
  });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
}

module.exports = router;