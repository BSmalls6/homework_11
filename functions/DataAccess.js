class DataAccess {
    constructor(connection) {
        this.connection = connection;
    }
    viewEmployees(cb) {
        var query = "SELECT * FROM employees";
        this.connection.query(query, function (err, res) {
            if (err) throw (err);
            console.table(res)
            cb(res);
        });
    };
}

module.exports = DataAccess;