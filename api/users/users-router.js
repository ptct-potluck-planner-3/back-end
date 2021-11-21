const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../secrets");
const Users = require("./users-model");
const MW = require(`./users-middleware`);

router.get("/", async (req, res) => {
	res.json(await Users.findAllUsers());
});

router.get("/:id", async (req, res) => {
	const { id } = req.params;

	Users.findById(id)
		.then((found) => {
			res.status(200).json(found);
		})
		.catch((err) => {
			res.status(404).json({ message: err });
		});
});

router.post(
	"/register",
	MW.checkUserPayload,
	MW.checkUsernameIsUnique,
	async (req, res) => {
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
	}
);

router.post("/login", MW.checkLoginPayload, async (req, res) => {
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

// router.post("/login", MW.checkLoginPayload, async (req, res) => {
// 	let { username, password } = req.body;
// 	console.log(username, password);
// 	if (bcrypt.compareSync(password, password)) {
// 		const token = makeToken(req.body);
// 		res.status(200).json({ message: `welcome, ${username}`, token });
// 	} else {
// 		res.status(401).json({ message: "invalid credentials" });
// 	}
// });

router.post(`/logout`, MW.restricted, async (req, res) => {
	const token = req.headers.authorization;
	const decoded = jwt.verify(token, JWT_SECRET);
	if (decoded) {
		Users.logout()
			.then(() => {
				res.status(200).json({ message: `logout successful` });
			})
			.catch((err) => {
				res.status(400).json({ message: `logout unsuccessful` + err.message });
			});
	} else {
		res.status(401).json({ message: `must be logged in to log out` });
	}
});

function makeToken(user) {
	const payload = {
		subject: user.user_id,
		username: user.username,
		role: user.role,
	};
	const options = {
		expiresIn: "222222s",
	};
	return jwt.sign(payload, JWT_SECRET, options);
}

module.exports = router;
