var express = require('express');
var router = express.Router();
var IG = require('instagram-location')


/* GET home page. */
router.get('/:username', function(req, res, next) {
  try {
    var ig = new IG({
        clientID: process.env.IG_CLIENT_ID
    })

    ig.find({
        userName: req.params.username || 'adamcmiel'
    })
    .then(function(data) {
        console.log(data)
        res.render('index', data);
    })
    .catch(function(err) {
        res.write('error')
        res.write(err.message)
        res.end()
    })

  }
  catch (error) {
    next(error)
  }
});

module.exports = router;
