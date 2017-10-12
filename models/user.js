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

  User.prototype.vote = function(issue_id, vote, VoteIssue){
    console.log('------------======================---------------1212121')
    return new Promise((resolve, reject)=>{
      VoteIssue.findOrBuild({where:{UserId:this.id, IssueId:issue_id}}).then((voteIssues)=>{
        let voteIssue = null;
        if(voteIssues.length>0){
          voteIssue=voteIssues[0]
        }else{
          voteIssue = voteIssues
        }
        //console.log(voteIssue);
        if(vote == 'up'){
          voteIssue.isVoteUp = true;
          voteIssue.save();
          console.log(voteIssue)
          resolve(voteIssue);
        }else if(vote == 'down'){
          voteIssue.isVoteUp = false;
        }else{
          voteIssue.isVoteUp = null;
        }

        voteIssue.save();
        //console.log(voteIssue)
        resolve(voteIssue);

      })
    })
  }

  return User;
}
