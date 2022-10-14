const axios = require('axios')
const { response } = require('express')

exports.homeRoutes = (req, res)=>{
    axios.get('http://localhost:3000/api/users').then(function(response){
    res.render('index', {users: response.data})
    }).catch(err => {
        res.send(err)
    })
}

exports.add_user = (req, res)=>{
    res.render('addUser')
}

exports.update_user = (req, res)=>{
    axios.get('http://localhost:3000/api/users', {params: {id: req.query.id}})
    .then(function(userdata){
        res.render("updateUser", {user: userdata.data})
    })
    .catch(err => {
        res.send(err)
    })
}