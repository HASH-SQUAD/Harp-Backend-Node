const Protected = (req, res) => {
	res.send(`
    <h1>Hello User!</h1>
    <h3>UR Name : ${req.user.name}</h3>
    <h3>UR Email : ${req.user.email}</h3>
    <h3>UR GoogleID : ${req.user.userId}</h3>
    <img src=${req.user.profileImg} alt="ProfileIMG" width='400' height='400'/>
    <h3>Provider : ${req.user.provider}</h3>
  `);
};

module.exports = Protected;
