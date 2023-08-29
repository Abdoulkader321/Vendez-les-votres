const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');
var ObjectId = require('mongodb').ObjectID;

const Item = require('../models/good.model').model;

/*
 * Cree un objet et le mettre en vente pour l'utilisateur courant.
 */
const create = async(req, res) => {
    try {
        console.log(`requete creation item.`);
        const itemData = {
            ...req.body,
            ownerId: req.userId
        };
        const newItem = await Item.create(itemData); // save item in the database
        console.log("objet créé");
        res.status(201).json(itemData);
    } catch (err) {
        console.log(`pb création d'un objet et sa mise en vente ${err.message}`);
        res.status(409).json({ message: err.message });
    }

};

/**
 * retourne les articles mis en vente appartenant à l'utilisateur en cours 
 * @param {*} req  l'onject requete
 * @param {*} res l'objet reponse
 */
const getMyItems = async(req, res) => {
    try {
        const items = await Item.find({ ownerId: req.userId, forSale:true});
        res.status(201).json(items);

    } catch (err) {
        console.log(`pb recuperation de mes objets: ${err.message}`);
        res.status(409).json({ message: err.message });
    }
};

/**
 * retourne tous les objects mis en vente n'appartenant pas à l'utilisateur en cours.
 * @param {*} req  l'onject requete
 * @param {*} res l'objet reponse
 */
const getItemsOfOther = async(req, res) => {
    console.log(`requete recuperation item des autres`);
    try {
        let items = await Item.find({ ownerId: { $ne: req.userId }, forSale:true });
        res.status(201).json(items);

    } catch (err) {
        console.log(`pb recuperation des autres objets: ${err.message}`);
        res.status(409).json({ message: err.message });
    }
}




const deleteItem = async (req, res) => {
    console.log(`suppression, ${req.query.id}`);
    try {
        const items = await Item.deleteOne({ _id: req.query.id });
        res.status(201).json(items);

    } catch (err) {
        console.log(`pb recuperation des autres objets: ${err.message}`);
        res.status(409).json({ message: err.message });
    }
}


module.exports.delete = deleteItem;
module.exports.create = create;
module.exports.getItemsOfOther = getItemsOfOther;
module.exports.getMyItems = getMyItems;