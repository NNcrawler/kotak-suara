'use strict';
module.exports = (sequelize, DataTypes) => {
  var Issue = sequelize.define('Issue', {
    GovermentId: DataTypes.STRING,
    title: DataTypes.STRING,
    detail: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  Issue.associate = function (models) {
    Issue.belongsToMany(models.User, {through:models.Respond});
    Issue.hasMany(models.Respond);
    Issue.belongsTo(models.Goverment)
  };

  return Issue;
};
