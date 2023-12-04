import { useEffect, useState } from "react";
import {
  onTasksSnapshot,
  createTask,
  deleteTask,
} from "../../firebase/firebase";

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
  return (
    <div>
      <p>Task: {task.text}</p>
      <button onClick={() => handleRemove(task.id)}>Remove</button>
    </div>
  );
}
