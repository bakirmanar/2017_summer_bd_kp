var queryBuilder = require("../buildQuery");

module.exports = function (app, connection) {
    app.get('/api/providers', function (req, res) {
        var query = queryBuilder.select("providers", "*");
        return connection.query(query, function (error, results, fields) {
            if (error) throw error;

            return res.send(results);
        });
    });

    app.post('/api/provider', function (req, res) {
        var body = req.body;
        if (!body || !body.name){
            return res.status(400).send({error: "Bad request: 'Name' is required"});
        }
        body.id = body.id || "pr" + Date.now();

        var query = queryBuilder.select("providers", "*", {id: body.id});
        return connection.query(query, function (error, results, fields) {
            if (results.length > 0){
                console.log("UPDATE");
                query = queryBuilder.update("providers", body, {id: body.id});
            } else {
                console.log("INSERT");
                query = queryBuilder.insert("providers", body)
            }

            return connection.query(query, function (error, results, fields) {
                if (error) throw error;
                return res.send({body: body});
            });
        });
    });

    app.delete('/api/provider/:id', function (req, res) {
        var id = req.params.id;
        if (!id){
            return res.status(400).send({error: "Bad request: 'ID' is required"});
        }

      var query = queryBuilder.select("providers", "*", {id: id});
        return connection.query(query, function (error, results, fields) {
            if (results.length > 0){
                console.log("DELETE");
                query = queryBuilder.delete("providers", {id: id});
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
