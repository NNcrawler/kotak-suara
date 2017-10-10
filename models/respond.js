'use strict';
module.exports = (sequelize, DataTypes) => {
  var Respond = sequelize.define('Respond', {
    id: DataTypes.INTEGER,
    IssueId: DataTypes.STRING,
    UserId: DataTypes.STRING,
    respond: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Respond.associate = function (models) {
    Respond.belongsTo(models.User);
    Respond.belongsTo(models.Issue);
  };

  return Respond;
};
