User = require('../server/models').user;

module.exports= {
    //Get a list of all authors using model.findAll()
    index(req, res) {
        User.findAll({
        })
            .then(function (users) {
                res.status(200).json(authors);
            })
            .catch(function (error) {
                res.status(500).json(error);
            });
    }
}