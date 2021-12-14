import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import { AiFillCloseCircle } from "react-icons/ai";

import "./TaskList.css";

export default function TaskList(props) {
	// Color rows depends on deadlines
	const colorTaskListRow = (task) => {
		let deadlineDate = new Date(task.deadline);
		deadlineDate.setHours(0, 0, 0, 0);
		let todayDate = new Date();
		todayDate.setHours(0, 0, 0, 0);

		if (task.status === "Done") {
			return "table-success";
		} else if (deadlineDate < todayDate) {
			return "table-danger";
		} else if (deadlineDate.getTime() === todayDate.getTime()) {
			return "table-warning";
		}
	};

	const awatingTask = (task) => {
		let index = "";

		if (props.tasks.awaiting !== "")
			props.tasks.map((t, i) => {
				if (t.id === task.awaiting) {
					index = i;
				}
				return task;
			});
		return index === "" ? "" : index + 1;
	};

	const editTaskName = (event, task) => {
		event.preventDefault();
		const taskCell = event.target;
		console.log(taskCell);

		let taskName = taskCell.innerHTML;

		taskCell.innerHTML = `<textarea id="edit-task-name" />`;

		const editTaskNameInput = document.querySelector("#edit-task-name");
		editTaskNameInput.value = taskName;
		editTaskNameInput.addEventListener("dbclick", (e) => {
			e.preventDefault();
		});
		editTaskNameInput.focus();

		editTaskNameInput.addEventListener("focusout", () => {
			let newTask = { ...task, taskName: editTaskNameInput.value };
			console.log(newTask);

			props.updateTask(task.id, newTask);
			// taskCell.innerHTML = editTaskNameInput.value;
			console.log("OUT");
		});
	};

	return (
		<div className="TaskList">
			<Table striped responsive hover>
				<thead>
					<tr>
						<th>Id</th>
						<th>Status</th>
						<th>Availability</th>
						<th>Task</th>
						<th>Deadline</th>
						<th>Assignee</th>
						<th>Assigner</th>
						<th>Awaiting</th>
						<th>Note</th>
						<th></th>
					</tr>
				</thead>

				<tbody>
					{props.tasks.map((task, index) => {
						let classList = colorTaskListRow(task);

						let awaitingTask = awatingTask(task);

						return (
							<tr className={classList} key={index + 1}>
								<td>{index + 1}</td>
								<td>{task.status}</td>
								<td
									className={`availability${
										task.availability === "Available" ? " available" : ""
									}`}
								>
									{task.availability}
								</td>
								<td onDoubleClick={(event) => editTaskName(event, task)}>
									{task.taskName}
								</td>
								<td>{task.deadline}</td>
								<td>{task.assignee}</td>
								<td>{task.assigner}</td>
								<td>{awaitingTask}</td>
								<td>{task.note}</td>
								<td>
									<div className="delete-btn">
										<AiFillCloseCircle
											className="delete-btn-icon"
											onClick={() => {
												props.removeTask(task.id);
											}}
										/>
									</div>
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		</div>
	);
}
