exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("events")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("events").insert([
        {
          event_name: "Launch Party",
          event_date: "2005-05-24",
          event_time: "20:04.000",
          event_location: "Scranton, PA",
        },
        {
          event_name: "Familia reunion ",
          event_date: "2020-12-12",
          event_time: "20:04.000",
          event_location: "Los Angeles, CA",
        },
      ]);
    });
};
