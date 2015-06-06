var express = require('express');
var router = express.Router();
var IG = require('instagram-location')


/* GET home page. */
function findOnInstagram(req, res, next) {
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
        console.error(err)
        res.writeHead(404)
        res.write('error ')
        res.write(err.message)
        res.end()
    })

  }
  catch (error) {
    next(error)
  }
}

router.get('/:username', findOnInstagram)
router.get('/', findOnInstagram)

module.exports = router;
