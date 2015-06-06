var express = require('express');
var router = express.Router();
var IG = require('instagram-location')

var ig = new IG({
    clientID: process.env.IG_CLIENT_ID
})

/* GET home page. */
router.get('/', function(req, res, next) {
  ig.find({
    userName: 'adamcmiel'
  })
  .then(function(data) {
    console.log(data)
    res.render('index', data);
  })
  .catch(function(err) {
    res.write('error', err)
  })
});

module.exports = router;
