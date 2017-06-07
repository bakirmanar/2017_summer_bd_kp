var queryBuilder = require("../buildQuery");

module.exports = function (app, connection) {
  app.get('/api/worktimes', function (req, res) {
    var query = queryBuilder.select("worktime_schedules", "*");
    return connection.query(query, function (error, results, fields) {
      if (error) throw error;

      return res.send(results);
    });
  });

  app.post('/api/worktime', function (req, res) {
    var body = req.body;
    if (!body || !body.user) {
      return res.status(400).send({error: "Bad request: 'User' is required"});
    }
    body.id = body.id || "wt" + Date.now();

    var query = queryBuilder.select("worktime_schedules", "*", {id: body.id});
    return connection.query(query, function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        console.log("UPDATE");
        query = queryBuilder.update("worktime_schedules", body, {id: body.id});
      } else {
        console.log("INSERT");
        query = queryBuilder.insert("worktime_schedules", body)
      }

      return connection.query(query, function (error, results, fields) {
        if (error) throw error;
        return res.send({body: body});
      });
    });
  });

  app.delete('/api/worktime/:id', function (req, res) {
    var id = req.params.id;
    if (!id) {
      return res.status(400).send({error: "Bad request: 'ID' is required"});
    }

    var query = queryBuilder.select("worktime_schedules", "*", {id: id});
    return connection.query(query, function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        console.log("DELETE");
        query = queryBuilder.delete("worktime_schedules", {id: id});
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
