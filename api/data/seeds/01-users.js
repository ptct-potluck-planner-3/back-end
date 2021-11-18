exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          username: "BobVance",
          password: "phyllisvance321",
          role: "organizer",
        },
        {
          username: "Timmy",
          password: "tman123456",
          role: "guest",
        },
        { username: "LeBron", password: "mjsucks", role: "guest" },
        {
          username: "TheRock",
          password: "itsaboutpower",
          role: "organizer",
        },
        {
          username: "KevinHeart",
          password: "fivefoot10",
          role: "guest",
        },
        { user_id: 6, username: "Vin", password: "musclecars", role: "guest" },
      ]);
    });
};
