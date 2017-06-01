module.exports = function (app, connection) {
    app.get('/api/products', function (req, res) {
        var query = 'SELECT * FROM products';
        return connection.query(query, function (error, results, fields) {
            if (error) throw error;

            return res.send(results);
        });
    });

    app.post('/api/product', function (req, res) {
        if (!req.body || !req.body.name){
            return res.status(400).end();
        }

        var query = "INSERT INTO products (id, name, count) VALUES (";
        query += "'pr" + Date.now() + "',";
        query += "'" + req.body.name + "',";
        query += req.body.count ? req.body.count : "0";
        query += ")";

        return connection.query(query, function (error, results, fields) {
            if (error) throw error;

            console.log('Tables: ', results);
            return res.send(results);
        });

    });
};
