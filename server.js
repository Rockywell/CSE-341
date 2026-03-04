//express server.js
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}\nlisten at \x1b[32mhttp://localhost:${port}\x1b[0m`);
});