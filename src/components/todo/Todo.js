import { useEffect, useState } from "react";
import {
  onTasksSnapshot,
  createTask,
  deleteTask,
  updateTask,
  updateTaskOrder,
} from "../../firebase/firebase";
import toast from "react-hot-toast";

import {
  FaTrash,
  FaCheck,
  FaDotCircle,
  FaHandMiddleFinger,
} from "react-icons/fa";

import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import "./todo.css";
import Navbar from "../navbar/Navbar";
import Statistics from "../statistics/Statistics";

export default function Todo({ user, logout }) {
  const [tasks, setTasks] = useState([]);

  const handleAdd = (newTask) => {
    toast.success("Added new Task!");
    createTask(user.uid, newTask);
  };
  const handleRemove = (taskId) => {
    toast.error("Removed a Task!");
    deleteTask(user.uid, taskId);
  };
  const handleUpdate = (taskId, isDone) => {
    toast.success("Updated a Tasks!");
    updateTask(user.uid, taskId, { is_done: isDone });
  };
  const handleUpdateOrder = (newOrder) => {
    updateTaskOrder(user.uid, newOrder);
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
      <TaskList
        tasks={tasks}
        handleRemove={handleRemove}
        handleUpdate={handleUpdate}
        handleUpdateOrder={handleUpdateOrder}
      />
      <Statistics tasks={tasks} />
    </div>
  );
}

function TaskList({ tasks, handleRemove, handleUpdate, handleUpdateOrder }) {
  const handleDragEnd = (e) => {
    const { active, over } = e;

    if (active.id !== over.id) {
      const newOrder = arrayMove(
        tasks,
        tasks.findIndex((task) => task.id === active.id),
        tasks.findIndex((task) => task.id === over.id)
      );
      console.log(newOrder);
      handleUpdateOrder(newOrder);
    }
  };
  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="list-info">
        <h2>Tasks({tasks.length})</h2>
        <div>
          <div>
            <p>Done</p>
            <div className="done"></div>
          </div>
          <div>
            <p>Not Done</p>
            <div className="not-done"></div>
          </div>
        </div>
      </div>
      <div className="task-list">
        <SortableContext items={tasks}>
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <Task
                task={task}
                key={index}
                handleRemove={handleRemove}
                handleUpdate={handleUpdate}
              />
            ))
          ) : (
            <p style={{ fontSize: "2rem" }}>No Task</p>
          )}
        </SortableContext>
      </div>
    </DndContext>
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

function Task({ task, handleRemove, handleUpdate }) {
  function formatTimestamp(timestamp) {
    const milliseconds =
      timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1e6);
    const date = new Date(milliseconds);
    const month = date.toLocaleString("en-us", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours() % 12 || 12; // Convert to 12-hour format
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const ampm = date.getHours() >= 12 ? "pm" : "am";
    const formattedDate = `${month} ${day}, ${year} ${hours}:${minutes} ${ampm}`;
    return formattedDate;
  }

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  return (
    <div
      className="task"
      style={{
        backgroundColor: task.is_done ? "#03943f" : "rgba(24, 26, 27, 0.65)",
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
      ref={setNodeRef}
    >
      <FaHandMiddleFinger {...attributes} {...listeners} className="handle" />
      <p className="text">{task.text}</p>
      <div className="task-actions">
        <p className="time">{formatTimestamp(task.date_added)}</p>
        <FaTrash size={20} onClick={() => handleRemove(task.id)} />
        {!task.is_done ? (
          <FaCheck
            size={20}
            onClick={() => handleUpdate(task.id, !task.is_done)}
          />
        ) : (
          <FaDotCircle
            size={20}
            onClick={() => handleUpdate(task.id, !task.is_done)}
          />
        )}
      </div>
      {task.is_done && (
        <p className="time">Done: {formatTimestamp(task.date_done)}</p>
      )}
    </div>
  );
}
