const homeController = {};

homeController.index = async (req, res) => {
    res.send('Hello World!');
};

homeController.about = (req, res) => {
    res.send('This is the about page.');
}

module.exports = homeController;