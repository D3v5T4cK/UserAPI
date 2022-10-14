const signUpTemplateCopy = require('../model/model')

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({ message: "Content can't be empty!" })
        return;
    }
    const user = new signUpTemplateCopy(
        {
            gender: req.body.gender,
            name: {
                first: req.body.first,
                last: req.body.last,
            },
            location: {
                city: req.body.city,
                state: req.body.state,
                country: req.body.country,
                postcode: req.body.postcode,
            },
            email: req.body.email,
            login: {
                username: req.body.username,
                password: req.body.password,
            },
            dob: {
                date: req.body.date,
                age: req.body.age,
            },
            phone: req.body.phonenumber,
            picture: req.body.picture
        }
    )
    user.save(user).then(res.redirect('/')).catch(err => res.status(500).send({ message: err.message || "Create operation error" }))
}

exports.find = (req, res) => {
    if(req.query.id)
    {
        const id = req.query.id;
        signUpTemplateCopy.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving user with id " + id})
            })
    }
    else{
    signUpTemplateCopy.find().then(user => res.send(user)).catch(err => ers.status(500).send({message: err.message || "Error occurred while retriving user information"}))
    }
}

exports.update = (req, res) => {
    if(!req.body){
        return res.status(400).send({message: "Data to update can't be empty"})
    }
    const id = req.params.id;
    signUpTemplateCopy.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
    .then(data => {
        if(!data){
            res.status(404).send({message: `Can't update user with ${id}`})
        }
        else{
            res.redirect('/')
        }
    }).catch(err =>{
        res.status(500).send({ message : "Error updating user information"})
    })
}  

exports.delete = (req, res) => {
    const id = req.params.id;
    signUpTemplateCopy.findByIdAndDelete(id).then(data => {
        if(!data){
            res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
        }else{
            res.send({
                message : "User was deleted successfully!"
            })
        }
    })
    .catch(err =>{
        res.status(500).send({
            message: "Could not delete User with id=" + id
        });
    });
}