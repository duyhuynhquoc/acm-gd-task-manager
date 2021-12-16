const db = require("../utils/db");

class TaskController {
	index(req, res) {}

	get(req, res) {
		let sqlQuery = "SELECT * FROM Task;";

		db.query(sqlQuery, (err, result) => {
			if (err) throw err;

			res.send(result);
		});
	}
}

module.exports = new TaskController();
