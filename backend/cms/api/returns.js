var queryBuilder = require("../buildQuery");

module.exports = function (app, connection) {
  app.get('/api/returns', function (req, res) {
    var query = queryBuilder.select("products_returns", "*");
    return connection.query(query, function (error, results, fields) {
      if (error) throw error;

      return res.send(results);
    });
  });

  app.post('/api/return', function (req, res) {
    var body = req.body;
    if (!body || !body.product || !body.c_note) {
      return res.status(400).send({error: "Bad request: 'User' and 'TTN' is required"});
    }
    body.id = body.id || "rt" + Date.now();

    var query = queryBuilder.select("products_returns", "*", {id: body.id});
    return connection.query(query, function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        console.log("UPDATE");
        query = queryBuilder.update("products_returns", body, {id: body.id});
      } else {
        console.log("INSERT");
        query = queryBuilder.insert("products_returns", body)
      }

      return connection.query(query, function (error, results, fields) {
        if (error) throw error;
        return res.send({body: body});
      });
    });
  });

  app.delete('/api/return/:id', function (req, res) {
    var id = req.params.id;
    if (!id) {
      return res.status(400).send({error: "Bad request: 'ID' is required"});
    }

    var query = queryBuilder.select("products_returns", "*", {id: id});
    return connection.query(query, function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        console.log("DELETE");
        query = queryBuilder.delete("products_returns", {id: id});
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
