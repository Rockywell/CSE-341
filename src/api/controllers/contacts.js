const contactsModel = require("../../data/models/contacts")
const contactsController = {};

contactsController.get = async (req, res) => {
    const contact = await contactsModel.get(req.params.id);

    res.status(200).json(contact);
};

contactsController.getAll = async (req, res) => {
    const contacts = await contactsModel.getAll();

    res.status(200).json(contacts);
};

module.exports = contactsController;