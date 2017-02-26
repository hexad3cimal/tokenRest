/**
 * Created by hexad3cimal on 26/2/17.
 */

var bcrypt = require('bcrypt');

module.exports = {
    generateHash:function (password)
{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
},

    comparePassword : function (passwd,password, cb) {
        bcrypt.compare(passwd, password, function (err, isMatch) {
            if (err) {
                return cb(err);
            }
            cb(null, isMatch);
        });
    }
}


