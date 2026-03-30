const config = {};


config.env = process.env.NODE_ENV || 'development';
config.server = {
    protocol: process.env.PROTOCOL || 'http',
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3000,
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
};
config.db = {
    url: process.env.DATABASE_URL,
    name: process.env.DATABASE_NAME || 'admin'
};


module.exports = Object.freeze(config);