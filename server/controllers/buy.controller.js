
const Item = require('../models/good.model').model;
const User = require('../models/user.model').model;

const buy = async (req, res) =>{
    // todo attention a t-il le fonds necessaire
    console.log(`Acheter un item `);
	
    try {
		let itemPrice = await getItemPrice(req.params.itemId);
		let userBalance = await getUserBalance(req.userId);
		if(userCanBuyItem(userBalance , itemPrice)){
			const itemToBuy = await Item.findOne({_id: req.params.itemId});
			const itemToBuyOwnerId = itemToBuy.ownerId; // id du proprietaire de l'item qu'on veut acheter
			await User.findOneAndUpdate({_id: req.userId}, {$set: {money: userBalance - itemPrice}});
			const items = await Item.findOneAndUpdate({ _id: req.params.itemId}, {$set: {ownerId: req.userId, forSale:false}}, {new: true}); // mettre à jour le proprietaire de l'item
			await User.findOneAndUpdate({_id: itemToBuyOwnerId}, {$inc: {money: itemPrice}});
			res.status(201).json(items);
		}else{
			res.status(409).json({ message: "Solde insuffisant" });
		}

    } catch (err) {
        console.log(`pb recuperation des autres objets: ${err.message}`);
        res.status(409).json({ message: err.message });
    }
};

const userCanBuyItem = (userBalance, itemPrice) => {
	return userBalance >= itemPrice;
};


/**
 * Return the price of the item with id ${itemId}
 */
const getItemPrice = async (itemId) => {
	try {
        const item = await Item.findOne({ _id: itemId});
		return item.price;

    } catch (err) {
        console.log(`pb recuperation du prix d'un item: ${err.message}`);
    }
};

/**
 * Return the balance of user with id ${userId} 
 */
 const getUserBalance = async (userId) => {
	try {
        const user = await User.findOne({ _id: userId});
		return user.money;

    } catch (err) {
        console.log(`pb recuperation de la balance de l'utilisateur: ${err.message}`);
    }
};

/**
 * retourne les articles acheté appartenant à l'utilisateur en cours 
 * @param {*} req  l'onject requete
 * @param {*} res l'objet reponse
 */
 const getBoughtItems = async(req, res) => {
    try {
        const items = await Item.find({ ownerId: req.userId, forSale:false});
        res.status(201).json(items);

    } catch (err) {
        console.log(`pb recuperation de mes objets: ${err.message}`);
        res.status(409).json({ message: err.message });
    }
};


module.exports.buy = buy;
module.exports.getBoughtItems = getBoughtItems;