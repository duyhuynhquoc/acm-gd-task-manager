const mysql = require("mysql");

const dbConfig = {
	connectionLimit: 100,
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
};

class TaskController {
	get(req, res) {
		let sqlQuery = "SELECT * FROM Task;";

		const db = mysql.createPool(dbConfig);

		db.query(sqlQuery, (error, results, fields) => {
			if (error) {
				console.log(error);
				results = [];
			}
			res.send(results);
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

		const db = mysql.createConnection(dbConfig);

		db.query(sqlQuery, (error, results, fields) => {
			if (error) console.log(error);
			res.send(results);
		});
	}

	delete(req, res) {
		res.setHeader("Content-Type", "application/json");

		const { deleteId } = req.body;

		const db = mysql.createConnection(dbConfig);

		let sqlQuery = `DELETE FROM Task WHERE taskID = '${deleteId}'`;

		db.query(sqlQuery, (error, results, fields) => {
			if (error) console.log(error);
			res.send(results);
		});
	}

	update(req, res) {
		res.setHeader("Content-Type", "application/json");

		const { updateId, updateField, updateValue } = req.body;

		const db = mysql.createConnection(dbConfig);

		let sqlQuery = `UPDATE Task SET ${updateField} = '${updateValue}' WHERE taskId = '${updateId}'`;

		db.query(sqlQuery, (error, results, fields) => {
			if (error) console.log(error);
			res.send(results);
		});
	}
}

module.exports = new TaskController();
