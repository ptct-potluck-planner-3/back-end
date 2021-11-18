//authorization middlewares as well as user creation validation

const Users = require("./users-model");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require(`../../secrets`);

const restricted = (req, res, next) => {
	const token = req.headers.authorization;
	if (!token) {
		res.status(401).json({ message: "Authorization failed! Token required!" });
	} else {
		jwt.verify(token, JWT_SECRET, (err, decoded) => {
			if (err) {
				res
					.status(401)
					.json({ message: "Authorization failed! Token is invalid!" });
			} else {
				req.decodedToken = decoded;
				next();
			}
		});
	}
};

const checkUserPayload = (req, res, next) => {
	const user = req.body;
	if (!user.username || !user.password) {
		return res.status(400).json({ message: `Missing username or password` });
	} else {
		next();
	}
};

const checkUsernameIsUnique = async (req, res, next) => {
	try {
		const rows = await Users.findBy({ username: req.body.username });
		if (!rows) {
			next();
		} else {
			return res
				.status(400)
				.json({ message: `Username ${req.body.username} already exists` });
		}
	} catch (err) {
		next(err);
	}
};

const checkLoginPayload = async (req, res, next) => {
	const user = req.body;
	try {
		const rows = await Users.findBy({ username: user.username });
		if (rows) {
			req.userData = rows;
			next();
		} else if (!rows || user.password !== rows.password) {
			return res.status(400).json({ message: "Invalid credentials" });
		}
	} catch (err) {
		next(err);
	}
};

module.exports = {
	restricted,
	checkUserPayload,
	checkUsernameIsUnique,
	checkLoginPayload,
};
