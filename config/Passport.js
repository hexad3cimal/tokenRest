/**
 * Created by hexad3cimal on 26/2/17.
 */
var JwtStrategy = require('passport-jwt').Strategy;
User = require('../server/models').user;




module.exports = function(passport) {
    var opts = {};
    opts.secretOrKey = "jovin";
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {

        console.log("jwt_payload"+jwt_payload)

        User.find({where:{id: jwt_payload.id}}).then(function (user,err){

            console.log("user"+user.password)


            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
};

