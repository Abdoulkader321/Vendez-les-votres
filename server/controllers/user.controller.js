const User = require('../models/user.model').model;

const sendUserInformations = (user, res) => {
    const data = {};
    data.name = user.name;
    data.money = user.money;
    data.id = user.id;
    res.status(200).json(data);

}

module.exports.me =
    async(req, res) => {
        const user = await User.findById(req.userId);
        sendUserInformations(user, res);

    }