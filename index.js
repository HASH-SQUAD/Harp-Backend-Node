const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();

app.use(express.json());

//Port Setting
const PORT = process.env.PORT;

//DataBase
const db = require('./models');

//API Test
app.get('/', (req, res) => {
    res.send('API Running');
});

//API Router Call
const ApiRouter = require('./routes/');
app.use('/', ApiRouter);

//Port
db.sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});
