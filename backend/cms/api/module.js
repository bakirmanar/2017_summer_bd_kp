module.exports = function (app, connection) {
  require("./categories")(app, connection);
  require("./positions")(app, connection);
  require("./producers")(app, connection);
  require("./products")(app, connection);
  require("./providers")(app, connection);
  require("./storages")(app, connection);
  require("./users")(app, connection);
  require("./worktimeShedule")(app, connection);
  require("./vacationsShedule")(app, connection);
};
