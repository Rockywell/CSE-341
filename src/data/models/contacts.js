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

module.exports = contactsModel;