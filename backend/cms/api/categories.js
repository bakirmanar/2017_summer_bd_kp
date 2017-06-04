var queryBuilder = require("../buildQuery");

module.exports = function (app, connection) {
  app.get('/api/categories', function (req, res) {
    var query = queryBuilder.select("categories", "*");
    return connection.query(query, function (error, results, fields) {
      if (error) throw error;

      return res.send(results);
    });
  });

  app.post('/api/category', function (req, res) {
    var body = req.body;
    if (!body || !body.name) {
      return res.status(400).send({error: "Bad request: 'Name' is required"});
    }
    body.id = body.id || "ct" + Date.now();

    var query = queryBuilder.select("categories", "*", {id: body.id});
    return connection.query(query, function (error, results, fields) {
      if (results.length > 0) {
        console.log("UPDATE");
        query = queryBuilder.update("categories", body, {id: body.id});
      } else {
        console.log("INSERT");
        query = queryBuilder.insert("categories", body);
      }

      return connection.query(query, function (error, results, fields) {
        if (error) throw error;
        return res.send({body: body});
      });
    });
  });

  app.delete('/api/category/:id', function (req, res) {
    var id = req.params.id;
    if (!id) {
      return res.status(400).send({error: "Bad request: 'ID' is required"});
    }

    var query = queryBuilder.select("categories", "*", {id: id});
    return connection.query(query, function (error, results, fields) {
      if (results.length > 0) {
        console.log("DELETE");
        query = queryBuilder.delete("categories", {id: id});
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
