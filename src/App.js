import React, { useEffect, useState } from "react";

import "./App.css";
import NavBar from "./components/Navbar/Navbar";
import TaskList from "./components/TaskList/TaskList";
import TaskInput from "./components/TaskInput/TaskInput";

export default function App() {
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		const readTasksFromLocalStorage = () => {
			let data = window.localStorage.getItem("tasks");
			if (data == null) {
				window.localStorage.setItem("tasks", "[]");
			} else {
				data = JSON.parse(data);
				setTasks(data);
			}
		};

		readTasksFromLocalStorage();
	}, []);

	useEffect(() => {
		window.localStorage.setItem("tasks", JSON.stringify(tasks));
	}, [tasks]);

	const addTask = (newTask) => {
		setTasks([...tasks, newTask]);
	};

	const removeTask = (id) => {
		// Remove task by id
		let newTasks = tasks.filter((task) => task.id !== id);

		// Update tasks' availability
		newTasks.map((task) => {
			if (task.awaiting === id) {
				task.availability = "Available";
			}
			return task;
		});

		setTasks(newTasks);
	};

	const updateTask = (id, newTask) => {
		let newTasks = tasks.map((task) => {
			if (task.id === id) {
				task = newTask;
			}
			return task;
		});

		setTasks(newTasks);
	};

	return (
		<div className="App">
			<NavBar />
			<div className="container-md py-4">
				<TaskInput addTask={addTask} tasks={tasks} />
				<TaskList
					tasks={tasks}
					removeTask={removeTask}
					updateTask={updateTask}
					setTasks={setTasks}
				/>
			</div>
		</div>
	);
}
