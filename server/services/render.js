const axios = require('axios')
const { response } = require('express')

exports.homeRoutes = (req, res)=>{
    axios.get(process.env.HOME_ROUTE).then(function(response){
    res.render('index', {users: response.data})
    }).catch(err => {
        res.send(err)
    })
}

exports.add_user = (req, res)=>{
    res.render('addUser')
}

exports.update_user = (req, res)=>{
    axios.get(process.env.HOME_ROUTE, {params: {id: req.query.id}})
    .then(function(userdata){
        res.render("updateUser", {user: userdata.data})
    })
    .catch(err => {
        res.send(err)
    })
}

exports.delete_user = (req, res)=>{
    const id = req.query.id
    axios.delete(process.env.HOME_ROUTE+id)
    .then(
        res.redirect("/")).catch(function (err) {
        console.log(err);
    });
}
exports.error=(req,res)=>{
    res.render("error.ejs");
}
