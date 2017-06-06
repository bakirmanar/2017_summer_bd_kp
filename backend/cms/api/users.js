var queryBuilder = require("../buildQuery");

module.exports = function (app, connection) {
  app.get('/api/users', function (req, res) {
    var query = queryBuilder.select("users", "*");
    return connection.query(query, function (error, results, fields) {
      if (error) throw error;

      return res.send(results);
    });
  });

  app.post('/api/user', function (req, res) {
    var body = req.body;
    if (!body || !body.username || !body.role || !body.position || !body.password) {
      return res.status(400).send({error: "Bad request: Not enough data"});
    }
    body.id = body.id || "us" + Date.now();

    var query = queryBuilder.select("users", "*", {id: body.id});
    return connection.query(query, function (error, results, fields) {
      if (results.length > 0) {
        console.log("UPDATE");
        query = queryBuilder.update("users", body, {id: body.id});
      } else {
        console.log("INSERT");
        query = queryBuilder.insert("users", body)
      }

      return connection.query(query, function (error, results, fields) {
        if (error) throw error;
        return res.send({body: body});
      });
    });
  });

  app.delete('/api/user/:id', function (req, res) {
    var id = req.params.id;
    if (!id) {
      return res.status(400).send({error: "Bad request: 'ID' is required"});
    }

    var query = queryBuilder.select("users", "*", {id: id});
    return connection.query(query, function (error, results, fields) {
      if (results.length > 0) {
        console.log("DELETE");
        query = queryBuilder.delete("users", {id: id});
      } else {
        return res.status(404).send({error: "Not found"});
      }

      return connection.query(query, function (error, results, fields) {
        if (error) throw error;
        return res.status(200).end();
      });
    });
  });

  app.get('/api/roles', function (req, res) {
    var roles = [
      {
        name: "ADMIN",
        displayName: "Администратор"
      },
      {
        name: "MANAGER",
        displayName: "Управляющий"
      },
      {
        name: "EMPLOYEE",
        displayName: "Сотрудник"
      }
    ];
    return res.send(roles)
  });
};
