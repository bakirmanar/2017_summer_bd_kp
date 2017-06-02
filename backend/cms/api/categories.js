module.exports = function (app, connection) {
    app.get('/api/categories', function (req, res) {
        var query = 'SELECT * FROM categories';
        return connection.query(query, function (error, results, fields) {
            if (error) throw error;

            return res.send(results);
        });
    });

    app.post('/api/category', function (req, res) {
        var body = req.body;
        if (!body || !body.name){
            return res.status(400).end();
        }
        body.id = body.id || "ct" + Date.now();

        var query = "SELECT * FROM categories WHERE id = '" + body.id + "'" ;
        return connection.query(query, function (error, results, fields) {
            if (results.length > 0){
                console.log("UPDATE");
                query = "UPDATE categories SET name = '" + body.name + "' WHERE id = '"+ body.id +"'";
            } else {
                console.log("INSERT");
                query = "INSERT INTO categories (id, name) VALUES ('" + body.id + "', '" + body.name + "')";
            }

            return connection.query(query, function (error, results, fields) {
                if (error) throw error;
                return res.send({body: body});
            });
        });
    });

    app.delete('/api/category/:id', function (req, res) {
        var id = req.params.id;
        if (!id){
            return res.status(400).end();
        }

        var query = "SELECT * FROM categories WHERE id = '" + id + "'" ;
        return connection.query(query, function (error, results, fields) {
            if (results.length > 0){
                console.log("DELETE");
                query = "DELETE FROM categories WHERE id = '"+ id +"'";
            } else {
                return res.status(404).end();
            }

            return connection.query(query, function (error, results, fields) {
                if (error) throw error;
                return res.status(200).end();
            });
        });
    });
};
