const router = require("express").Router();
const Items = require("./items_model");
const ItemMW = require("./items-middleware");
const UsersMW = require("../users/users-middleware");

router.get("/", UsersMW.restricted, async (req, res) => {
	res.json(await Items.findAllItems());
});

router.get("/:id", UsersMW.restricted, ItemMW.checkItemID, (req, res) => {
	const { id } = req.params;
	Items.findById(id)
		.then((item) => {
			res.status(200).json(item);
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});
});

router.get(
	"/:item_name",
	UsersMW.restricted,
	ItemMW.checkItemName,
	(req, res) => {
		const { item_name } = req.params;

		Items.findBy(item_name)
			.then((item) => {
				res.status(200).json(item);
			})
			.catch((err) => {
				res.status(500).json({ message: err.message });
			});
	}
);

router.post("/", UsersMW.restricted, ItemMW.checkItemPayload, (req, res) => {
	const newItem = req.params;
	Items.insertNewItem(newItem)
		.then((item) => {
			res.status(201).json(item);
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});
});

module.exports = router;
