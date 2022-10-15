const express = require('express')
const route = express.Router()
const services = require('../services/render')
const controller = require('../controller/controller')
const multer  = require('multer');
const fs=require('fs');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
  
        // Uploads is the Upload_folder_name
        cb(null, "../USERAPI/server/controller/uploads")
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname+".jpg")
    }
  })
  var upload=multer({
    storage:storage
  }).single('file');
  
route.get('/', services.homeRoutes)
route.get('/addUser', services.add_user)
route.get('/updateUser', services.update_user)
route.get('/deleteUser', services.delete_user)

route.post('/api/users', controller.create)
route.get('/api/users', controller.find)
route.put('/api/users/:id', controller.update)
route.delete('/api/users/:id', controller.delete)
route.post('/api/search', controller.search)
route.post('/api/profileimg',upload,(req,res)=>{
   
        console.log("ok") ;
   
})
module.exports = route