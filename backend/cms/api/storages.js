var queryBuilder = require("../buildQuery");

module.exports = function (app, connection) {
  app.get('/api/storages', function (req, res) {
    var query = queryBuilder.select("storages", "*");
    return connection.query(query, function (error, results, fields) {
      if (error) throw error;

      return res.send(results);
    });
  });

  app.post('/api/storage', function (req, res) {
    var body = req.body;
    if (!body || !body.name) {
      return res.status(400).send({error: "Bad request: 'Name' is required"});
    }
    body.id = body.id || "st" + Date.now();

    var query = queryBuilder.select("storages", "*", {id: body.id});
    return connection.query(query, function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        console.log("UPDATE");
        query = queryBuilder.update("storages", body, {id: body.id});
      } else {
        console.log("INSERT");
        query = queryBuilder.insert("storages", body)
      }

      return connection.query(query, function (error, results, fields) {
        if (error) throw error;
        return res.send({body: body});
      });
    });
  });

  app.delete('/api/storage/:id', function (req, res) {
    var id = req.params.id;
    if (!id) {
      return res.status(400).send({error: "Bad request: 'ID' is required"});
    }

    var query = queryBuilder.select("storages", "*", {id: id});
    return connection.query(query, function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        console.log("DELETE");
        query = queryBuilder.delete("storages", {id: id});
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
