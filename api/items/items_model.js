const db = require("../data/db-config");

function findAllItems() {
  return db("items").select("item_id", "item_name");
}
function findBy(item_name) {
  return db("items")
    .select("item_id", "item_name")
    .where("item_name", item_name)
    .first();
}
function findById(item_id) {
  return db("items")
    .select("item_id", "item_name")
    .where("item_id", item_id)
    .first();
}

async function insertNewItem(item) {
  const [id] = await db("items").insert(item, "item_id");
  return findById(id);
}

module.exports = { findAllItems, findBy, findById, insertNewItem };
