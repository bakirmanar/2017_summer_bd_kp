var queryBuilder = require("../buildQuery");

module.exports = function (app, connection) {
  app.get('/api/producers', function (req, res) {
    var query = queryBuilder.select("producers", "*");
    return connection.query(query, function (error, results, fields) {
      if (error) throw error;

      return res.send(results);
    });
  });

  app.post('/api/producer', function (req, res) {
    var body = req.body;
    if (!body || !body.name) {
      return res.status(400).send({error: "Bad request: 'Name' is required"});
    }
    body.id = body.id || "pd" + Date.now();

    var query = queryBuilder.select("producers", "*", {id: body.id});
    return connection.query(query, function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        console.log("UPDATE");
        query = queryBuilder.update("producers", body, {id: body.id});
      } else {
        console.log("INSERT");
        query = queryBuilder.insert("producers", body);
      }

      return connection.query(query, function (error, results, fields) {
        if (error) throw error;
        return res.send({body: body});
      });
    });
  });

  app.delete('/api/producer/:id', function (req, res) {
    var id = req.params.id;
    if (!id) {
      return res.status(400).send({error: "Bad request: 'ID' is required"});
    }

    var query = queryBuilder.select("producers", "*", {id: id});
    return connection.query(query, function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        query = queryBuilder.update("products", {producer: null}, {producer: id});
      } else {
        return res.status(404).send({error: "Not found"});
      }

      return connection.query(query, function (error, results, fields) {
        if (error) throw error;
        console.log("DELETE");
        query = queryBuilder.delete("producers", {id: id});

        return connection.query(query, function (error, results, fields) {
          if (error) throw error;
          return res.status(200).end();
        });
      });
    });
  });
};
