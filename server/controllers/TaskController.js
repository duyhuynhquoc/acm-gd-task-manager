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

	create(req, res) {
		const {
			taskId,
			status,
			taskName,
			availability,
			deadline,
			assignee,
			assigner,
			awaiting,
			note,
		} = req.body;

		console.log("Id" + taskId);

		let sqlQuery = `INSERT INTO Task VALUES ('${taskId}', '${status}', '${taskName}', '${availability}', '${deadline}', '${assignee}', '${assigner}', '${awaiting}', '${note}');`;

		db.query(sqlQuery, (err, result) => {
			if (err) throw err;
		});

		res.send("Create OK");
	}
}

module.exports = new TaskController();
