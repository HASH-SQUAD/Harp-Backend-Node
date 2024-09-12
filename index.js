const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const authUtil = require('./response/authUtil');
const logger = require('./logger');
const requestIp = require('request-ip');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname + '/public')));

// Server Logs
app.use((req, res, next) => {
    const ipAddress = requestIp.getClientIp(req);
    const requestPath = req.path;
    const method = req.method;
    logger.info(`Request received`, { ip: ipAddress, path: requestPath, method: method });
    next();
});

// Port Setting
const PORT = process.env.PORT;

// DataBase
const db = require('./models');

//Server Test
app.get('/', (req, res) => {
    res.send(`HARP Server is Running Port ${process.env.PORT}`);
});

// API Router Call
const ApiRouter = require('./routes/');
app.use('/', ApiRouter);

// Port
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        logger.info(`Sever Started on Port ${process.env.PORT}`);
    });
});
