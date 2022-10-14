const fetch = require("node-fetch")
const axios = require('axios')
const { response } = require('express')

exports.homeRoutes = (req, res)=>{
    axios.get('https://d3v5t4ck.herokuapp.com/api/users').then(function(response){
    res.render('index', {users: response.data})
    }).catch(err => {
        res.send(err)
    })
}

exports.add_user = (req, res)=>{
    res.render('addUser')
}

exports.update_user = (req, res)=>{
    axios.get('https://d3v5t4ck.herokuapp.com/api/users', {params: {id: req.query.id}})
    .then(function(userdata){
        res.render("updateUser", {user: userdata.data})
    })
    .catch(err => {
        res.send(err)
    })
}

exports.delete_user = (req, res)=>{
    const id = req.query.id
    fetch('https://d3v5t4ck.herokuapp.com/api/users/' + id, {
        method: 'DELETE'
    }).then(
        res.redirect("/")).catch(function (err) {
        console.log(err);
    });
}