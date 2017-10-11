'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    salt: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  User.associate = function (models) {
    User.belongsToMany(models.Issue, {through:models.Respond});
    User.hasMany(models.Respond);
    User.hasMany(models.VoteIssue);
  };

  User.prototype.upVote = function(issue_id, VoteIssue){
    console.log('------------======================---------------1212121')
    return new Promise((resolve, reject)=>{
      VoteIssue.findOrCreate({where:{UserId:this.id, IssueId:issue_id}}).then((voteIssue)=>{
        if(voteIssue.length==1){
          voteIssue=voteIssue[0]
        }else{
          voteIssue.isVoteUp = true;
          voteIssue.save();
          console.log(voteIssue)
          resolve(voteIssue);
        }
     
      })
    })
  }

  User.prototype.downVote = function(){
    
  }



  return User;
};
