var express = require('express');
var router = express.Router();
const Models = require('../models');
const checkLogin = require('../helpers/checkLogin')

router.use('/respond/:id', checkLogin)

let checkPermission = function(req, res, next){
	checkLogin(req, res, next, 'respond')
}

router.get('/',  (req, res)=>{
	// console.log(req.session)
	Models.Issue.findAll().then((result)=>{
		res.render('issue/list', {dataIssue:result})
	})
})


router.get('/respond/:id',checkPermission, (req, res)=>{
	//console.log(checkLogin)
	console.log(req.session)
	let data ={}
	Models.Respond.findAll({where:{IssueId : req.params.id}}).then((result_respond)=>{
		data.result_respond = result_respond
		return Models.Issue.findById(req.params.id)
	}).then((result_issue)=>{
		data.result_issue = result_issue
		res.render('issue/respond', data)
	})


})

router.get('/respond/:id/:vote',checkPermission, (req, res)=>{
	Models.User.findById(req.session.userId).then((user)=>{
		if(req.params.vote == 'up'){
			return user.vote(req.params.id, 'up', Models.VoteIssue)
		}else if(req.params.vote == 'down'){
			return user.vote(req.params.id, 'down', Models.VoteIssue)
		}
	}).then((voteIssue)=>{
		res.send(voteIssue)
	}).catch((err)=>{
		res.send(err)
	})

})



router.get('/respond/:id/command', (req, res)=>{
	console.log(req.session)
	let data = {
		id:req.params.id
	}
	res.render('issue/command', data)
})

router.post('/respond/:id', (req, res)=>{
	Models.Respond.create({
		IssueId: req.params.id,
		UserId: req.session.userId,
		respond: req.body.respond
	}).then(result=>{
		// res.send(result)
		res.redirect(`/issue/respond/${result.IssueId}`)
	})
})

router.get('/tes', (req, res)=>{
	console.log(req.body)
})

module.exports = router
