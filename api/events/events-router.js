const express = require(`express`);
const Events = require(`./events-model`);
const UsersMW = require(`../users/users-middleware`);
const EventsMW = require(`./events-middleware`);

const router = express.Router();

router.get(`/`, UsersMW.restricted, (req, res) => {
	Events.getAllEvents()
		.then((events) => {
			res.status(200).json(events);
		})
		.catch((err) => {
			res.status(400).json({ message: err.message });
		});
});

router.get(
	`/:id`,
	UsersMW.restricted,
	EventsMW.checkEventId,
	async (req, res) => {
		const { id } = req.params;
		Events.findById(id)
			.then((event) => {
				res.status(200).json(event);
			})
			.catch((err) => {
				res.status(500).json({ message: err.message });
			});
	}
);

router.post(`/`, UsersMW.restricted, EventsMW.checkEventPayload, (req, res) => {
	let theEvent = req.body;

	Events.insertEvent(theEvent)
		.then((newEvent) => {
			res.status(201).json(newEvent);
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});
});

router.put(`/:id`, UsersMW.restricted, EventsMW.checkEventId, (req, res) => {
	const { id } = req.params;
	const changes = req.body;

	Events.update(id, changes)
		.then((updatedEvent) => {
			res.status(200).json(updatedEvent);
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});
});

router.delete(`/:id`, UsersMW.restricted, EventsMW.checkEventId, (req, res) => {
	const { id } = req.params;
	Events.remove(id)
		.then((deleted) => {
			res.status(200).json(deleted);
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});
});

module.exports = router;
