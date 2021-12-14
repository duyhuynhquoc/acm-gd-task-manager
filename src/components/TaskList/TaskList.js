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

	const editStatus = (event, task) => {
		const taskCell = event.target;

		const submitStatus = () => {
			let newTask = { ...task, status: editStatusInput.value };

			props.updateTask(task.id, newTask);
			taskCell.innerHTML = editStatusInput.value;
		};

		// Get status value
		let status = taskCell.innerHTML;

		// Change text into input
		taskCell.innerHTML = `<select id="edit-status">
      <option value="To-do">To-do</option>
      <option value="In progress">In progess</option>
      <option value="Done">Done</option>
    </select>`;

		// No need to submit when press enter

		// Focus on input
		const editStatusInput = document.querySelector("#edit-status");
		editStatusInput.value = status;
		editStatusInput.focus();

		// Prevent double click on input
		editStatusInput.addEventListener("dblclick", (e) => {
			e.stopPropagation();
		});

		// Submit when move out of input
		editStatusInput.addEventListener("focusout", submitStatus);
	};

	const editTaskName = (event, task) => {
		const taskCell = event.target;

		const submitTaskName = (e) => {
			e.preventDefault();
			let newTask = { ...task, taskName: editTaskNameInput.value };

			props.updateTask(task.id, newTask);
			taskCell.innerHTML = editTaskNameInput.value;
		};

		// Get taskName value
		let taskName = taskCell.innerHTML;

		// Change text into input
		taskCell.innerHTML = `<form id="edit-task-name-form"><textarea id="edit-task-name" autocomplete="off"/></form>`;

		// Get form and add submit event
		const editTaskNameForm = document.querySelector("#edit-task-name-form");
		editTaskNameForm.addEventListener("submit", submitTaskName);

		// Focus on input
		const editTaskNameInput = document.querySelector("#edit-task-name");
		editTaskNameInput.value = taskName;
		editTaskNameInput.focus();

		// Prevent double click on input
		editTaskNameInput.addEventListener("dblclick", (e) => {
			e.stopPropagation();
		});

		// Submit when move out of input
		editTaskNameInput.addEventListener("focusout", submitTaskName);
	};

	const editDeadline = (event, task) => {
		const taskCell = event.target;

		const submitDeadline = (e) => {
			e.preventDefault();
			let newTask = { ...task, deadline: editDeadlineInput.value };

			props.updateTask(task.id, newTask);
			taskCell.innerHTML = editDeadlineInput.value;
		};

		// Get deadline value
		let deadline = taskCell.innerHTML;

		// Change text into input
		taskCell.innerHTML = `<form id="edit-deadline-form"><input type="date" id="edit-deadline-input" autocomplete="off"/></form>`;

		// Get form and add submit event
		const editDeadlineForm = document.querySelector("#edit-deadline-form");
		editDeadlineForm.addEventListener("submit", submitDeadline);

		// Focus on input
		const editDeadlineInput = document.querySelector("#edit-deadline-input");
		editDeadlineInput.value = deadline;
		editDeadlineInput.focus();

		// Prevent double click on input
		editDeadlineInput.addEventListener("dblclick", (e) => {
			e.stopPropagation();
		});

		// Submit when move out of input
		editDeadlineInput.addEventListener("focusout", submitDeadline);
	};

	const editAssignee = (event, task) => {
		const taskCell = event.target;

		const submitAssignee = (e) => {
			e.preventDefault();
			let newTask = { ...task, assignee: editAssigneeInput.value };

			props.updateTask(task.id, newTask);
			taskCell.innerHTML = editAssigneeInput.value;
		};

		// Get assignee value
		let assignee = taskCell.innerHTML;

		// Change text into input
		taskCell.innerHTML = `<form id="edit-assignee-form"><input type="text" id="edit-assignee-input" autocomplete="off"/></form>`;

		// Get form and add submit event
		const editAssigneeForm = document.querySelector("#edit-assignee-form");
		editAssigneeForm.addEventListener("submit", submitAssignee);

		// Focus on input
		const editAssigneeInput = document.querySelector("#edit-assignee-input");
		editAssigneeInput.value = assignee;
		editAssigneeInput.focus();

		// Prevent double click on input
		editAssigneeInput.addEventListener("dblclick", (e) => {
			e.stopPropagation();
		});

		// Submit when move out of input
		editAssigneeInput.addEventListener("focusout", submitAssignee);
	};

	const editAssigner = (event, task) => {
		const taskCell = event.target;

		const submitAssigner = (e) => {
			e.preventDefault();
			let newTask = { ...task, assigner: editAssignerInput.value };

			props.updateTask(task.id, newTask);
			taskCell.innerHTML = editAssignerInput.value;
		};

		// Get assigner value
		let assigner = taskCell.innerHTML;

		// Change text into input
		taskCell.innerHTML = `<form id="edit-assigner-form"><input type="text" id="edit-assigner-input" autocomplete="off"/></form>`;

		// Get form and add submit event
		const editAssignerForm = document.querySelector("#edit-assigner-form");
		editAssignerForm.addEventListener("submit", submitAssigner);

		// Focus on input
		const editAssignerInput = document.querySelector("#edit-assigner-input");
		editAssignerInput.value = assigner;
		editAssignerInput.focus();

		// Prevent double click on input
		editAssignerInput.addEventListener("dblclick", (e) => {
			e.stopPropagation();
		});

		// Submit when move out of input
		editAssignerInput.addEventListener("focusout", submitAssigner);
	};

	const editAwaiting = (event, task) => {
		const taskCell = event.target;

		const submitAwaiting = (e) => {
			e.preventDefault();
			let availability = task.availability;
			let awaiting = props.tasks[editAwaitingInput.value - 1];
			if (!awaiting) {
				awaiting = "";
				availability =
					editAwaitingInput.value === "" ? "Available" : "Unavailable";
			} else {
				availability = awaiting.status === "Done" ? "Available" : "Unavailable";
			}

			let newTask = { ...task, availability, awaiting: awaiting.id };

			props.updateTask(task.id, newTask);
			taskCell.innerHTML = !awaiting ? "" : editAwaitingInput.value;
		};

		// Get awaiting value
		let awaiting = taskCell.innerHTML;

		// Change text into input
		taskCell.innerHTML = `<form id="edit-awaiting-form"><input type="text" id="edit-awaiting-input" autocomplete="off" /></form>`;

		// Get form and add submit event
		const editAwaitingForm = document.querySelector("#edit-awaiting-form");
		editAwaitingForm.addEventListener("submit", submitAwaiting);

		// Focus on input
		const editAwaitingInput = document.querySelector("#edit-awaiting-input");
		editAwaitingInput.value = awaiting;
		editAwaitingInput.focus();

		// Prevent double click on input
		editAwaitingInput.addEventListener("dblclick", (e) => {
			e.stopPropagation();
		});

		// Submit when move out of input
		editAwaitingInput.addEventListener("focusout", submitAwaiting);
	};

	const editNote = (event, task) => {
		const taskCell = event.target;

		const submitNote = (e) => {
			e.preventDefault();
			let newTask = { ...task, note: editNoteInput.value };

			props.updateTask(task.id, newTask);
			taskCell.innerHTML = editNoteInput.value;
		};

		// Get note value
		let note = taskCell.innerHTML;

		// Change text into input
		taskCell.innerHTML = `<form id="edit-note-form"><textarea id="edit-note" autocomplete="off"/></form>`;

		// Get form and add submit event
		const editNoteForm = document.querySelector("#edit-note-form");
		editNoteForm.addEventListener("submit", submitNote);

		// Focus on input
		const editNoteInput = document.querySelector("#edit-note");
		editNoteInput.value = note;
		editNoteInput.focus();

		// Prevent double click on input
		editNoteInput.addEventListener("dblclick", (e) => {
			e.stopPropagation();
		});

		// Submit when move out of input
		editNoteInput.addEventListener("focusout", submitNote);
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
								<td onDoubleClick={(event) => editStatus(event, task)}>
									{task.status}
								</td>
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
								<td onDoubleClick={(event) => editDeadline(event, task)}>
									{task.deadline}
								</td>
								<td onDoubleClick={(event) => editAssignee(event, task)}>
									{task.assignee}
								</td>
								<td onDoubleClick={(event) => editAssigner(event, task)}>
									{task.assigner}
								</td>
								<td onDoubleClick={(event) => editAwaiting(event, task)}>
									{awaitingTask}
								</td>
								<td onDoubleClick={(event) => editNote(event, task)}>
									{task.note}
								</td>
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
