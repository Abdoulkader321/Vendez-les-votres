const mongoose = require('mongoose');

// A good is object that a user will buy on our app

// definition of schema for good
const goodSchema = new mongoose.Schema({
    
    description: {
        type : String,
        required : true
    }, 

    price: {
        type : Number,
        required : true
    }, 
    
    ownerId: mongoose.ObjectId,
    forSale: {  // to do the difference between an item that we sell and an item that we buy.
        type: Boolean, 
        default:true
    }
});

module.exports = goodSchema;

const dbConnection = require('../controllers/db.controller');
const Goods = dbConnection.model('Good', goodSchema);
module.exports = goodSchema;
module.exports.model = Goods;