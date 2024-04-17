const express = require("express");

const server = express();

server.get('/', (req, res) => {
    return res.send("teste backend");
})

server.listen(3000);