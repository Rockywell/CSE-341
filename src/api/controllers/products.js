const productsModel = require("../../data/models/products")
const productController = {};

productController.get = async (req, res) => {
    //#swagger.tags = ['products']
    const product = await productsModel.get(req.params.id);

    res.status(200).json(product);
};

productController.getAll = async (req, res) => {
    //#swagger.tags = ['products']
    const products = await productsModel.getAll();

    res.status(200).json(products);
};

productController.create = async (req, res) => {
    //#swagger.tags = ['products']

    const product = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        manufacturer: req.body.manufacturer
    };


    const result = await productsModel.create(product);

    if (result.acknowledged) {
        res.status(201).json(result);
    } else {
        res.status(500).json({ error: "Failed to create product" });
    }
};

productController.update = async (req, res) => {
    //#swagger.tags = ['products']
    const product = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        stock: req.body.stock,
        manufacturer: req.body.manufacturer
    };

    const result = await productsModel.update(req.params.id, product);

    if (result.modifiedCount > 0) {
        res.status(200).json(result);
    } else {
        res.status(500).json({ error: "Failed to update product" });
    }

};

productController.delete = async (req, res) => {
    //#swagger.tags = ['products']
    const result = await productsModel.delete(req.params.id);

    if (result.deletedCount > 0) {
        res.status(200).json(result);
    } else {
        res.status(500).json({ error: "Failed to delete product" });
    }
};

module.exports = productController;