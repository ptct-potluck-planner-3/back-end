const Items = require("./items_model");

const checkItemID = (req, res, next) => {
	const { id } = req.params;

	Items.findById(id)
		.then((Item) => {
			if (!Item) {
				next();
			} else {
				res.status(404).json({ message: `Item with ID: ${id} does not exist` });
			}
		})
		.catch((err) => {
			res
				.status(500)
				.json({ message: `error while checking ID, ${err.message}` });
		});
};

const checkItemPayload = (req, res, next) => {
	const item = req.body;
	if (!item.item_name || item.item_name === "") {
		res.status(400).json({ message: `New Items require a name` });
	} else {
		next();
	}
};

const checkItemName = (req, res, next) => {
	const { item } = req.params;
	Items.findBy(item).then((foundItem) => {
		if (!foundItem) {
			res
				.status(404)
				.json({ message: `Item with name: ${item} does not exist` });
		} else {
			next();
		}
	});
};

module.exports = { checkItemID, checkItemPayload, checkItemName };
