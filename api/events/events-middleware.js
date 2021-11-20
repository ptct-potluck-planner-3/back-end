const Events = require(`./events-model`);

const checkEventId = (req, res, next) => {
	const { id } = req.params;
	try {
		const event = Events.findById(id);
		if (!event) {
			res.status(404).json({
				message: `event with id: ${id} does not exist`,
			});
		} else {
			req.event = event;
			next();
		}
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
};

const checkEventPayload = (req, res, next) => {
	const event = req.body;
	if (typeof event.event_name !== `string`) {
		res.status(401).json({ message: `event name must be a string` });
	} else {
		if (!event.event_name || event.event_name === "") {
			res.status(400).json({ message: `event must be named` });
		} else {
			if (!event.event_date || event.event_date === "") {
				res.status(400).json({ message: `date of event required` });
			} else {
				if (!event.event_time || event.event_time === "") {
					res.status(400).json({ message: `time of event required` });
				} else {
					if (!event.event_location || event.event_location === "") {
						res.status(400).json({ message: `location of event required` });
					} else {
						next();
					}
				}
			}
		}
	}
};

module.exports = { checkEventId, checkEventPayload };
