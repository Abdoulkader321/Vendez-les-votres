const mongoose = require('mongoose');

// definition of schema for user
const userSchema = new mongoose.Schema({
    
    name: {
        type : String,
        required : true
    },
    login: {
        type : String,
        required : true,
        unique: true
    },

    password: {
        type : String,
        required : true
    },

    money: {
        type:Number,
        default: 200
    }    

});

const dbConnection = require('../controllers/db.controller');
const Users = dbConnection.model('User', userSchema);
module.exports = userSchema;
module.exports.model = Users;
