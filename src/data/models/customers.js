const mongodb = require("../database")
const { ObjectId } = require("mongodb");

const customersTable = mongodb.getTable("customers");
const customersModel = {};


customersModel.get = async (id) => {
    const customer = await customersTable.findOne({ _id: new ObjectId(id) });

    return customer;
}

customersModel.getAll = async () => {
    const customers = await customersTable.find().toArray();

    return customers;
}

customersModel.create = async (data) => {
    const result = await customersTable.insertOne(data);

    return result;
}

customersModel.update = async (id, data) => {
    const result = await customersTable.updateOne(
        { _id: new ObjectId(id) },
        { $set: data }
    );

    return result;
}

customersModel.delete = async (id) => {
    const result = await customersTable.deleteOne({ _id: new ObjectId(id) });

    return result;
}

module.exports = customersModel;