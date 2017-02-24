'use strict';
module.exports = function(sequelize, DataTypes) {

  var user = sequelize.define('user', {
    user_name: DataTypes.STRING,
    password: DataTypes.STRING,
    full_name: DataTypes.STRING
  }, {
    underscored: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return user;
};