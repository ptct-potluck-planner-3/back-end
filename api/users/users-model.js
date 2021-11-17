const db = require("../data/db-config");

function findAllUsers() {
	return db("users").select("user_id", "username", "role", "password");
}
function findBy(username) {
	return db("users")
		.select("user_id", "username", "role", "password")
		.where("username", username)
		.first();
}
function findById(user_id) {
	return db("users")
		.select("user_id", "username", "role", "password")
		.where("user_id", user_id)
		.first();
}

async function insertUser(user) {

	const [id] = await db("users").insert(user, "user_id");
	return findById(id);


module.exports = { findAllUsers, findBy, findById, insertUser };
