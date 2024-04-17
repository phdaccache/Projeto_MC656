const express = require("express");

const server = express();

server.get('/', (req, res) => {
    return res.send("Teste 123");
})

server.listen(3000);