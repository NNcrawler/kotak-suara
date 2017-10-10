var express = require('express');
var router = express.Router();
const Models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Models.User.findAll().then((users)=>{
    res.render('login/login.ejs')
  })
  //res.send('respond with a resource');
});

module.exports = router;
