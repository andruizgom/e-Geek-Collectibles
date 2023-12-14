const express = require("express");
const router = require("./routes/index.js");
const morgan = require("morgan");
const cors = require("cors");

require('./db.js');

const server = express();

server.use(morgan("dev"));
server.use(express.json());
server.use(cors());
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://e-geek-collectibles-production.up.railway.app/'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

server.use('/', router);

module.exports = server;
