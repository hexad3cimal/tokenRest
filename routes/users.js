var express = require('express');
var router = express.Router();
User = require('../server/models').user;
var password = require('../utils/Password');
var passport	= require('passport');
require('../config/Passport')(passport);
var jwt         = require('jwt-simple');

/* GET users listing. */
router.get('/', passport.authenticate('jwt', { session: false}), function(req, res) {

    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, "jovin");

        User.find({where :{
            user_name: decoded.user_name
        }}).then( function(user, err) {
            if (err) throw err;

            if (!user) {
                return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
            } else {

                User.findAll({ limit: 10
                })
                    .then(function (users) {
                        res.status(200).json(users);
                    })
                    .catch(function (error) {
                        res.status(500).json(error);
                    });

            }
        });
    } else {
        return res.status(403).send({success: false, msg: 'No token provided.'});
    }



});

router.post('/',function(req,res){

  User.create(req.body,{individualHooks: true}).then(function (newUser) {
        res.status(200).json("Success!");
    })
        .catch(function (error){
            res.status(500).json("Error!");
        });
});

router.post('/authenticate', function(req, res) {

    console.log(req.body)
    User.find({where:
    {
        user_name: req.body.user_name
    }
    }
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


router.get('/member', passport.authenticate('jwt', { session: false}), function(req, res) {


    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, "jovin");

        User.find({where :{
            user_name: decoded.user_name
        }}).then( function(user, err) {
            if (err) throw err;

            if (!user) {
                return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
            } else {
                res.json({success: true, msg: 'Welcome in the member area ' + user.name + '!'});
            }
        });
    } else {
        return res.status(403).send({success: false, msg: 'No token provided.'});
    }
});


router.put('/', passport.authenticate('jwt', { session: false}), function(req, res) {


    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, "jovin");

        User.find({where :{
            user_name: decoded.user_name
        }}).then( function(user, err) {
            if (err) throw err;

            if (!user) {
                return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
            } else {
;
                User.update({user_name: req.body.user_name,
                    password:req.body.password},

                    {where :{
                    id: req.body.id
                }})
                    .then(function (users) {
                        res.status(200).json(users);
                    })
                    .catch(function (error) {
                        res.status(500).json(error);
                    });

            }
        });
    } else {
        return res.status(403).send({success: false, msg: 'No token provided.'});
    }
});

router.delete('/', passport.authenticate('jwt', { session: false}), function(req, res) {

    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, "jovin");

        User.find({where :{
            user_name: decoded.user_name
        }}).then( function(user, err) {
            if (err) throw err;

            if (!user) {
                return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
            } else {

                User.destroy({ where: {            id: decoded.id
                }
                })
                    .then(function (users) {
                        res.status(200).json(users);
                    })
                    .catch(function (error) {
                        res.status(500).json(error);
                    });

            }
        });
    } else {
        return res.status(403).send({success: false, msg: 'No token provided.'});
    }



});

getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

module.exports = router;
