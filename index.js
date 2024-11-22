const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const cors = require('cors')
const logger = require('./logger');
const requestIp = require('request-ip');
const client = require('prom-client');

app.use(express.json());
app.use(cors());
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

//Prometheous
const register = new client.Registry();
client.collectDefaultMetrics({
    app: 'HARP_Server',
    prefix: 'node_',
    timeout: 10000,
    register
});
const httpRequestDuration = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'status_code'],
    buckets: [0.1, 0.5, 1, 2, 5]
});
const httpRequestTotal = new client.Counter({
    name: 'http_request_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status_code']
});
app.get('/metrics', async (req, res) => {
    res.setHeader('Content-Type', register.contentType);
    res.send(await register.metrics());
});
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        httpRequestDuration
            .labels(req.method, req.route?.path || req.path, res.statusCode)
            .observe(duration / 1000);

        httpRequestTotal
            .labels(req.method, req.route?.path || req.path, res.statusCode)
            .inc();
    });
    next();
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
