import { useEffect, useState } from "react";
import {
  onTasksSnapshot,
  createTask,
  deleteTask,
} from "../../firebase/firebase";

import { FaTrash } from "react-icons/fa";

import "./todo.css";
import Navbar from "../navbar/Navbar";

export default function Todo({ user, logout }) {
  const [tasks, setTasks] = useState([]);

  const handleAdd = (newTask) => {
    createTask(user.uid, newTask);
  };

  const handleRemove = (taskId) => {
    deleteTask(user.uid, taskId);
  };

  useEffect(() => {
    if (user.uid) {
      const unsubscribe = onTasksSnapshot(user.uid, setTasks);
      return () => unsubscribe(); // Cleanup function to unsubscribe from the snapshot listener
    }
  }, [user.uid]);

  return (
    <div className="Todo">
      <Navbar user={user} logout={logout} />
      <TaskForm handleAdd={handleAdd} />
      <TaskList tasks={tasks} handleRemove={handleRemove} />
    </div>
  );
}

function TaskList({ tasks, handleRemove }) {
  return (
    <div className="task-list">
      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <Task task={task} key={index} handleRemove={handleRemove} />
        ))
      ) : (
        <p>No Task</p>
      )}
    </div>
  );
}

function TaskForm({ handleAdd }) {
  const [newTask, setNewtask] = useState("");

  const addTask = () => {
    if (newTask.length <= 3) return;
    handleAdd(newTask);
    setNewtask("");
  };

  return (
    <div className="task-form">
      <input
        type="text"
        placeholder="Enter Task"
        onChange={(e) => setNewtask(e.target.value)}
        value={newTask}
      />
      <button onClick={addTask}>Add</button>
    </div>
  );
}

function Task({ task, handleRemove }) {
  function formatTimestamp(timestamp) {
    // Convert seconds to milliseconds
    const milliseconds =
      timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1e6);
    // Create a new Date object
    const date = new Date(milliseconds);
    // Get the components of the date
    const month = date.toLocaleString("en-us", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours() % 12 || 12; // Convert to 12-hour format
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const ampm = date.getHours() >= 12 ? "pm" : "am";
    // Construct the formatted date string
    const formattedDate = `${month} ${day}, ${year} ${hours}:${minutes} ${ampm}`;
    return formattedDate;
  }

  return (
    <div className="task">
      <p className="text">{task.text}</p>
      <div className="task-actions">
        <p className="time">{formatTimestamp(task.date_added)}</p>
        <FaTrash size={20} onClick={() => handleRemove(task.id)} />
      </div>
    </div>
  );
}
