const db = require("../data/db-config");

function getAllEvents() {
  return db("events").select(
    "event_id",
    "event_name",
    "event_date",
    "event_time",
    "event_location"
  );
}
function findById(event_id) {
  return db("events")
    .select(
      "event_id",
      "event_name",
      "event_date",
      "event_time",
      "event_location"
    )
    .where("event_id", event_id)
    .first();
}
function findBy(event_name) {
  return db("events")
    .select(
      "event_id",
      "event_name",
      "event_date",
      "event_time",
      "event_location"
    )
    .where("event_name", event_name)
    .first();
}

async function insertEvent(event) {
  const [id] = await db("events").insert(event);
  return findById(id);
}

function update(event_id, changes) {
  return db("events")
    .select(
      "event_id",
      "event_name",
      "event_date",
      "event_time",
      "event_location"
    )
    .where("event_id", event_id)
    .update(changes);
}

function remove(event_id) {
  return db("events").where("event_id", event_id).del();
}

module.exports = {
  getAllEvents,
  findById,
  findBy,
  insertEvent,
  update,
  remove,
};
