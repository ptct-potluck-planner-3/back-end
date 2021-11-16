const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../secrets");
const Users = require("../users/users-model");

router.get("/", async (req, res) => {
	res.json(await Users.getAllUsers());
});

router.post("/register", async (req, res) => {
	let user = req.body;
	const rounds = process.env.BCRYPT_ROUNDS || 8;
	const hash = bcrypt.hashSync(user.password, rounds);
	user.password = hash;

	Users.insertUser(user)
		.then((newUser) => {
			res.status(201).json(newUser);
		})
		.catch((err) => {
			res.status(400).json({ message: err });
		});
});

router.post("/login", async (req, res) => {
	let { username, password } = req.body;
	Users.findBy(username).then((user) => {
		if (user && bcrypt.compareSync(password, user.password)) {
			const token = makeToken(user);
			res.status(200).json({ message: `welcome, ${user.username}`, token });
		} else {
			res.status(401).json({ message: "invalid credentials" });
		}
	});
});

function makeToken(user) {
	const payload = {
		subject: user.id,
		username: user.username,
	};
	const options = {
		expiresIn: "24h",
	};
	return jwt.sign(payload, JWT_SECRET, options);
}

module.exports = router;
