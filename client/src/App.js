import React, { useEffect, useState } from "react";
import axios from "axios";
import url from "./url";

import "./App.css";
import NavBar from "./components/Navbar/Navbar";
import TaskList from "./components/TaskList/TaskList";
import TaskInput from "./components/TaskInput/TaskInput";

export default function App() {
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		// const readTasksFromLocalStorage = () => {
		// 	let data = window.localStorage.getItem("tasks");
		// 	if (data == null) {
		// 		window.localStorage.setItem("tasks", "[]");
		// 	} else {
		// 		data = JSON.parse(data);
		// 		setTasks(data);
		// 	}
		// };

		// readTasksFromLocalStorage();

		// Fetch data from database
		axios.get(`${url}/api/`).then((res) => {
			setTasks(res.data);
		});
	}, []);

	useEffect(() => {
		window.localStorage.setItem("tasks", JSON.stringify(tasks));
	}, [tasks]);

	const createTask = (newTask) => {
		setTasks([...tasks, newTask]);

		// Create new task on database
		axios.post(`${url}/api/`, newTask).then((res) => {
			if (res) console.log(res);
		});
	};

	const deleteTask = (deleteId) => {
		// Delete task by taskId
		let newTasks = tasks.filter((task) => task.taskId !== deleteId);

		// Update tasks' availability
		newTasks.map((task) => {
			if (task.awaiting === deleteId) {
				task.availability = "Available";
			}
			return task;
		});

		setTasks(newTasks);

		// Delete task on database
		axios.delete(`${url}/api/`, { data: { deleteId } }).then((res) => {
			if (res) console.log(res);
		});
	};

	const updateTask = (updateId, updateField, updateValue) => {
		let newTasks = tasks.map((task) => {
			if (task.taskId === updateId) {
				task[updateField] = updateValue;
			}
			return task;
		});

		setTasks(newTasks);

		// Update task on database
		axios
			.put(`${url}/api/`, { updateId, updateField, updateValue })
			.then((res) => {
				if (res) console.log(res);
			});
	};

	return (
		<div className="App">
			<NavBar />
			<div className="container-md py-4">
				<TaskInput createTask={createTask} tasks={tasks} />
				<TaskList
					tasks={tasks}
					deleteTask={deleteTask}
					updateTask={updateTask}
					setTasks={setTasks}
				/>
			</div>
		</div>
	);
}
