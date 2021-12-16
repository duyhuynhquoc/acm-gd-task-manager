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
		res.setHeader("Content-Type", "application/json");

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

		let sqlQuery = `INSERT INTO Task VALUES ('${taskId}', '${status}', '${taskName}', '${availability}', '${deadline}', '${assignee}', '${assigner}', '${awaiting}', '${note}');`;

		db.query(sqlQuery, (err, result) => {
			if (err) throw err;
			res.send("Create OK");
			return;
		});
	}

	delete(req, res) {
		res.setHeader("Content-Type", "application/json");

		const { deleteId } = req.body;

		let sqlQuery = `DELETE FROM Task WHERE taskID = '${deleteId}'`;

		db.query(sqlQuery, (err, result) => {
			if (err) throw err;
			res.send("Delete OK");
			return;
		});
	}

	update(req, res) {
		res.setHeader("Content-Type", "application/json");

		const { updateId, newTask } = req.body;

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
		} = newTask;

		console.log("Update");

		// let sqlQuery = `DELETE FROM Task WHERE taskID = '${deleteId}'`;
		// db.query(sqlQuery, (err, result) => {
		// 	if (err) throw err;
		// 	res.send("Update OK");
		// 	return;
		// });
	}
}

module.exports = new TaskController();
