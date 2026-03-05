const homeController = {};
const pool = require("../../data/database")

homeController.index = async (req, res) => {
    await pool.listTables();
    res.send('Hello World!');
};

homeController.about = (req, res) => {
    res.send('This is the about page.');
}

module.exports = homeController;