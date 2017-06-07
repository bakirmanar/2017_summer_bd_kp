var queryBuilder = require("../buildQuery");

module.exports = function (app, connection) {
  app.get('/api/vacations', function (req, res) {
    var query = queryBuilder.select("vacations_schedule", "*");
    return connection.query(query, function (error, results, fields) {
      if (error) throw error;

      return res.send(results);
    });
  });

  app.post('/api/vacation', function (req, res) {
    var body = req.body;
    if (!body || !body.user) {
      return res.status(400).send({error: "Bad request: 'User' is required"});
    }
    body.id = body.id || "vc" + Date.now();

    var query = queryBuilder.select("vacations_schedule", "*", {id: body.id});
    return connection.query(query, function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        console.log("UPDATE");
        query = queryBuilder.update("vacations_schedule", body, {id: body.id});
      } else {
        console.log("INSERT");
        query = queryBuilder.insert("vacations_schedule", body)
      }

      return connection.query(query, function (error, results, fields) {
        if (error) throw error;
        return res.send({body: body});
      });
    });
  });

  app.delete('/api/vacation/:id', function (req, res) {
    var id = req.params.id;
    if (!id) {
      return res.status(400).send({error: "Bad request: 'ID' is required"});
    }

    var query = queryBuilder.select("vacations_schedule", "*", {id: id});
    return connection.query(query, function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        console.log("DELETE");
        query = queryBuilder.delete("vacations_schedule", {id: id});
      } else {
        return res.status(404).send({error: "Not found"});
      }

      return connection.query(query, function (error, results, fields) {
        if (error) throw error;
        return res.status(200).end();
      });
    });
  });
};
