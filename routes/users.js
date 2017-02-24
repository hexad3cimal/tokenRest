var express = require('express');
var router = express.Router();
User = require('../server/models').user;


/* GET users listing. */
router.get('/', function(req, res) {

    User.findAll({
    })
        .then(function (users) {
            res.status(200).json(users);
        })
        .catch(function (error) {
            res.status(500).json(error);
        });

});

router.post('/',function(req,res){

  User.create(req.body).then(function (newUser) {
        res.status(200).json(newUser);
    })
        .catch(function (error){
            res.status(500).json(error);
        });
});

module.exports = router;
