const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const authUtil = require('./response/authUtil');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname + '/public')));

//Port Setting
const PORT = process.env.PORT;

//DataBase
const db = require('./models');

//Server Test
app.get('/', (req, res) => {
    res.send(`HARP Server is Running Port ${process.env.PORT}`);
});

//404 NotFound
app.get('*', (req, res) => {
    const requestPath = req.path;
    return res.status(404).send(authUtil.successFalse(404, "라우팅을 찾을 수 없습니다.", { path: requestPath }))
})

//API Router Call
const ApiRouter = require('./routes/');
app.use('/', ApiRouter);

//Port
db.sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});
