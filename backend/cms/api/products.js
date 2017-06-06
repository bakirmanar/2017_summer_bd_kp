var queryBuilder = require("../buildQuery");

module.exports = function (app, connection) {
  app.get('/api/products', function (req, res) {
    var query = queryBuilder.select("products", "*");
    return connection.query(query, function (error, results, fields) {
      if (error) throw error;

      return res.send(results);
    });
  });

  app.post('/api/product', function (req, res) {
    var body = req.body;
    if (!body || !body.name) {
      return res.status(400).send({error: "Bad request: 'Name' is required"});
    }
    body.id = body.id || "pr" + Date.now();

    var query = queryBuilder.select("products", "*", {id: body.id});
    return connection.query(query, function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        console.log("UPDATE");
        query = queryBuilder.update("products", body, {id: body.id});
      } else {
        console.log("INSERT");
        query = queryBuilder.insert("products", body)
      }

      return connection.query(query, function (error, results, fields) {
        if (error) throw error;
        return res.send({body: body});
      });
    });
  });

  app.delete('/api/product/:id', function (req, res) {
    var id = req.params.id;
    if (!id) {
      return res.status(400).send({error: "Bad request: 'ID' is required"});
    }

    var query = queryBuilder.select("products", "*", {id: id});
    return connection.query(query, function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        console.log("DELETE");
        query = queryBuilder.delete("products", {id: id});
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
