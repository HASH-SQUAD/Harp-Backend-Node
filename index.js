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
	res.send(`
        <h1>OAuth</h1>
        <a href="/auth/google">LogIn</a>
        <a href="/auth/google/logout">LogOut</a>

        <br />

        <a href="/auth/kakao">LogIn</a>
        <a href="/auth/kakao/logout">LogOut</a>
    `);
});

//API Router Call
const ApiRouter = require('./routes/');
app.use('/', ApiRouter);

//Port
db.sequelize.sync().then(() => {
	app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
});
