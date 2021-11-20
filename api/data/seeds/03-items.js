exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("items")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("items").insert([
        { item_name: "Coronas" },
        { item_name: "tuna sandwiches" },
        { item_name: "Kevin's Famous Chilli" },
        { item_name: "Alfredo's Pizza Café pizzas" },
      ]);
    });
};
