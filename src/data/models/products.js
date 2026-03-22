const mongodb = require("../database")
const { ObjectId } = require("mongodb");

const productsTable = mongodb.getTable("products");
const productsModel = {};


productsModel.get = async (id) => {
    const product = await productsTable.findOne({ _id: new ObjectId(id) });

    return product;
}

productsModel.getAll = async () => {
    const products = await productsTable.find().toArray();

    return products;
}

productsModel.create = async (data) => {
    const now = new Date();

    const result = await productsTable.insertOne({
        ...data,
        createdAt: now,
        updatedAt: now
    });

    return result;
}

productsModel.update = async (id, data) => {
    const result = await productsTable.updateOne(
        { _id: new ObjectId(id) },
        {
            $set: {
                ...data,
                updatedAt: new Date()
            }
        }
    );

    return result;
}

productsModel.delete = async (id) => {
    const result = await productsTable.deleteOne({ _id: new ObjectId(id) });

    return result;
}

module.exports = productsModel;