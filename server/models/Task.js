const db = require("../util/db");

class Task {
	constructor(
		taskId,
		status,
		taskName,
		availability,
		deadline,
		assignee,
		assigner,
		awaiting,
		note
	) {
		this.taskId = taskId;
		this.status = status;
		this.taskName = taskName;
		this.availability = availability;
		this.deadline = deadline;
		this.assignee = assignee;
		this.assigner = assigner;
		this.awaiting = awaiting;
		this.note = note;
	}

	getTasks() {}
}
