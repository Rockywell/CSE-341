const mongodb = require("../../data/database")
const { ObjectId } = require("mongodb");

const contactsTable = mongodb.getTable("contacts");
const contactsModel = {};


contactsModel.get = async (id) => {
    const contact = await contactsTable.findOne({ _id: new ObjectId(id) });

    return contact;
}

contactsModel.getAll = async () => {
    const contacts = await contactsTable.find().toArray();

    return contacts;
}

contactsModel.create = async (data) => {
    const result = await contactsTable.insertOne(data);

    return result;
}

contactsModel.update = async (id, data) => {
    const result = await contactsTable.updateOne(
        { _id: new ObjectId(id) },
        { $set: data }
    );

    return result;
}

contactsModel.delete = async (id) => {
    const result = await contactsTable.deleteOne({ _id: new ObjectId(id) });

    return result;
}

module.exports = contactsModel;