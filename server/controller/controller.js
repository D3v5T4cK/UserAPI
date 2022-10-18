const signUpTemplateCopy = require('../model/model')
const axios=require('axios');

exports.create = async (req, res) => {
    let details= {
        id: "1",
        action: "shout" 
      }
    const gen=req.body.gender.toLowerCase(); 
    if(gen=="male"){
        const {data} = await axios.get(process.env.API_MALE)
        details = data.results[0];
    
    }
    if(gen=='female'){
        const {data} = await axios.get(process.env.API_FEMALE)
        details = data.results[0];
        
    }
 
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
            thumbnail:details.picture.thumbnail,
        
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
                    res.status(404).send({ message : "User not found!"})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Error retrieving user details"})
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
            res.status(404).send({message: `Can't update user data`})
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
            res.status(404).send({ message : `Cannot Delete user. Maybe user doesn't exist`})
        }else{
            res.send({
                message : "User was deleted successfully!"
            })
        }
    })
    .catch(err =>{
        res.status(500).send({
            message: "Could not delete user"
        });
    });
}

exports.search = async (request, response)=>{
    let type = request.body.type.trim();
    let search = request.body.search.trim();
    let l = '^'
    let r = '.*'
    const regex = new RegExp(l+search+r, 'i')
    if (type == "name") {
        let users = await signUpTemplateCopy.find({ "name.first": {$regex: regex} }).exec();
        response.send({ result: users })
    }
    if (type == "email") {
        let users = await signUpTemplateCopy.find({ email: {$regex: regex} }).exec();
        response.send({ result: users })
    }
    if (type == "phone") {
        let users = await signUpTemplateCopy.find({ phone: {$regex: regex} }).exec();
        response.send({ result: users })
    }
    if (type == "gender") {
        let users = await signUpTemplateCopy.find({ gender: {$regex: regex} }).exec();
        response.send({ result: users })
    }
    if (type == "location") {
        let users = await signUpTemplateCopy.find({ "location.postcode": {$regex: regex} }).exec();
        response.send({ result: users })
    }
    if (type == "address") {
        let users = await signUpTemplateCopy.find({ "location.city": {$regex: regex} }).exec();
        response.send({ result: users })
    }
    if (type == "dob") {
        let users = await signUpTemplateCopy.find({ "dob.date": {$regex: regex} }).exec();
        response.send({ result: users })
    }
}