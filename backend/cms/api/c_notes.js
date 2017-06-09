var queryBuilder = require("../buildQuery");

module.exports = function (app, connection) {
  app.get('/api/c_notes', function (req, res) {
    var query = queryBuilder.select("сonsignment_notes", "*");
    return connection.query(query, function (error, results, fields) {
      if (error) throw error;

      return res.send(results);
    });
  });

  app.post('/api/c_note', function (req, res) {
    var body = req.body;
    if (!body || !body.serial_number) {
      return res.status(400).send({error: "Bad request: 'Serial number' is required"});
    }
    body.id = body.id || "cn" + Date.now();

    var query = queryBuilder.select("сonsignment_notes", "*", {id: body.id});
    return connection.query(query, function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        console.log("UPDATE");
        query = queryBuilder.update("сonsignment_notes", body, {id: body.id});
      } else {
        console.log("INSERT");
        query = queryBuilder.insert("сonsignment_notes", body);
      }

      return connection.query(query, function (error, results, fields) {
        if (error) throw error;
        return res.send({body: body});
      });
    });
  });

  app.delete('/api/c_note/:id', function (req, res) {
    var id = req.params.id;
    if (!id) {
      return res.status(400).send({error: "Bad request: 'ID' is required"});
    }

    var query = queryBuilder.select("сonsignment_notes", "*", {id: id});
    return connection.query(query, function (error, results, fields) {
      if (error) throw error;
      if (results.length > 0) {
        query = queryBuilder.update("users", {c_note: null}, {c_note: id});
      } else {
        return res.status(404).send({error: "Not found"});
      }

      return connection.query(query, function () {
        if (error) throw error;
        console.log("DELETE");
        query = queryBuilder.delete("сonsignment_notes", {id: id});

        return connection.query(query, function (error, results, fields) {
          if (error) throw error;
          return res.status(200).end();
        });
      })

    });
  });
};
