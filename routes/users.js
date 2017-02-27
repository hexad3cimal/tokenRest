var express = require('express');
var router = express.Router();
User = require('../server/models').user;
var password = require('../utils/Password');
//var passport=require('../config/Passport');
var jwt         = require('jwt-simple');

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

  User.create(req.body,{individualHooks: true}).then(function (newUser) {
        res.status(200).json(newUser);
    })
        .catch(function (error){
            res.status(500).json(error);
        });
});

router.post('/authenticate', function(req, res) {

    console.log(req.body.user_name)
    User.find({where:
    {
        user_name: req.body.user_name
    }}
    ).then(function(user) {

        console.log("Username"+user.user_name)
        if (!user) {
            res.send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
            // check if password matches
            password.comparePassword(req.body.password, user.password,function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var token = jwt.encode(user, "jovin");
                    // return the information including token as JSON
                    res.json({success: true, token: 'JWT ' + token});
                } else {
                    res.send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
    });

});

module.exports = router;
