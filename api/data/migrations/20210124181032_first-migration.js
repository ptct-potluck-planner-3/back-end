exports.up = async (knex) => {
  await knex.schema.createTable("users", (users) => {
    users.increments("user_id");
    users.string("username", 200).notNullable();
    users.string("password", 200).notNullable();
    users.string("role", 200).notNullable();
  });
  await knex.schema.createTable("events", (events) => {
    events.increments("event_id");
    events.string("event_name", 200).notNullable();
    events.date("event_date").notNullable();
    events.time("event_time").notNullable();
    events.string("event_location", 200).notNullable();
  });
  await knex.schema.createTable("items", (items) => {
    items.increments("item_id");
    items.string("item_name", 200).notNullable();
  });
  await knex.schema.createTable("eu_appoint", (eu_appoint) => {
    eu_appoint.increments("eu_id");
    eu_appoint
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("user_id")
      .inTable("users")
      .onDelete("CASCADE");
    eu_appoint
      .integer("event_id")
      .unsigned()
      .notNullable()
      .references("event_id")
      .inTable("events")
      .onDelete("CASCADE");
    eu_appoint
      .integer("item_id")
      .unsigned()
      .notNullable()
      .references("item_id")
      .inTable("items")
      .onDelete("CASCADE");
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTableIfExists("eu_appoint");
  await knex.schema.dropTableIfExists("items");
  await knex.schema.dropTableIfExists("events");
  await knex.schema.dropTableIfExists("users");
};
