const customersModel = require("../../data/models/customers")
const customerController = {};

customerController.get = async (req, res) => {
    //#swagger.tags = ['customers']
    const customer = await customersModel.get(req.params.id);

    res.status(200).json(customer);
};

customerController.getAll = async (req, res) => {
    //#swagger.tags = ['customers']
    const customers = await customersModel.getAll();

    res.status(200).json(customers);
};

customerController.create = async (req, res) => {
    //#swagger.tags = ['customers']
    const customer = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
    };


    const result = await customersModel.create(customer);

    if (result.acknowledged) {
        res.status(201).json(result);
    } else {
        res.status(500).json({ error: "Failed to create customer" });
    }
};

customerController.update = async (req, res) => {
    //#swagger.tags = ['customers']
    const customer = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
    };

    const result = await customersModel.update(req.params.id, customer);

    if (result.modifiedCount > 0) {
        res.status(200).json(result);
    } else {
        res.status(500).json({ error: "Failed to update customer" });
    }

};

customerController.delete = async (req, res) => {
    //#swagger.tags = ['customers']
    const result = await customersModel.delete(req.params.id);

    if (result.deletedCount > 0) {
        res.status(200).json(result);
    } else {
        res.status(500).json({ error: "Failed to delete customer" });
    }
};

module.exports = customerController;