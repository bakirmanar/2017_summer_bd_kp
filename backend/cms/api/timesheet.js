var queryBuilder = require("../buildQuery");

module.exports = function (app, connection) {
  app.get('/api/timesheet', function (req, res) {
    var query = queryBuilder.select("timesheet", "*");
    return connection.query(query, function (error, results, fields) {
      if (error) throw error;

      return res.send(results);
    });
  });

  app.post('/api/timesheet', function (req, res) {
    var body = req.body;
    if (!body || !body.user) {
      return res.status(400).send({error: "Bad request: 'User' is required"});
    }
    body.id = body.id || "ts" + Date.now();

    var query = queryBuilder.select("timesheet", "*", {id: body.id});
    return connection.query(query, function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        console.log("UPDATE");
        query = queryBuilder.update("timesheet", body, {id: body.id});
      } else {
        console.log("INSERT");
        query = queryBuilder.insert("timesheet", body)
      }

      return connection.query(query, function (error, results, fields) {
        if (error) throw error;
        return res.send({body: body});
      });
    });
  });

  app.delete('/api/timesheet/:id', function (req, res) {
    var id = req.params.id;
    if (!id) {
      return res.status(400).send({error: "Bad request: 'ID' is required"});
    }

    var query = queryBuilder.select("timesheet", "*", {id: id});
    return connection.query(query, function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        console.log("DELETE");
        query = queryBuilder.delete("timesheet", {id: id});
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
