const express = require(`express`);
const Events = require(`./events-model`);

const router = express.Router();

router.get(`/`, (req, res) => {
	Events.getEvents()
		.then((events) => {
			res.status(200).json(events);
		})
		.catch((err) => {
			res.status(400).json({ message: err.message });
		});
});

router.get(`/:event_id`, (req, res) => {
	Events.getById(req.params.event_id)
		.then((event) => {
			res.status(200).json(event);
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});
});

router.post(`/`, (req, res) => {
	let theEvent = req.body;

	Events.create(theEvent)
		.then((newEvent) => {
			res.status(201).json(newEvent);
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});
});

router.put(`/:event_id`, (req, res) => {
	const changes = req.body;

	Events.update(req.params.event_id, changes)
		.then((updatedEvent) => {
			res.status(200).json(updatedEvent);
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});
});

router.delete(`/:event_id`, (req, res) => {
	Events.remove(req.params.event_id)
		.then((deleted) => {
			res.status(200).json(deleted);
		})
		.catch((err) => {
			res.status(500).json({ message: err.message });
		});
});

module.exports = router;
