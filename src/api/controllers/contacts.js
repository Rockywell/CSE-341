const contactsModel = require("../../data/models/contacts")
const contactsController = {};

contactsController.get = async (req, res) => {
    //#swagger.tags = ['Contacts']
    const contact = await contactsModel.get(req.params.id);

    res.status(200).json(contact);
};

contactsController.getAll = async (req, res) => {
    //#swagger.tags = ['Contacts']
    const contacts = await contactsModel.getAll();

    res.status(200).json(contacts);
};

contactsController.create = async (req, res) => {
    //#swagger.tags = ['Contacts']
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };


    const result = await contactsModel.create(contact);

    if (result.acknowledged) {
        res.status(201).json(result);
    } else {
        res.status(500).json({ error: "Failed to create contact" });
    }
};

contactsController.update = async (req, res) => {
    //#swagger.tags = ['Contacts']
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };

    const result = await contactsModel.update(req.params.id, contact);

    if (result.modifiedCount > 0) {
        res.status(200).json(result);
    } else {
        res.status(500).json({ error: "Failed to update contact" });
    }

};

contactsController.delete = async (req, res) => {
    //#swagger.tags = ['Contacts']
    const result = await contactsModel.delete(req.params.id);

    if (result.deletedCount > 0) {
        res.status(200).json(result);
    } else {
        res.status(500).json({ error: "Failed to delete contact" });
    }
};

module.exports = contactsController;