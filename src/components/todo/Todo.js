import { useEffect, useState } from 'react';
import {
  onTasksSnapshot,
  createTask,
  deleteTask,
} from '../../firebase/firebase';

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
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <img src={user.photo} alt="profile" />
      <button onClick={logout}>Logout</button>
      <TaskForm handleAdd={handleAdd} />
      <TaskList tasks={tasks} handleRemove={handleRemove} />
    </div>
  );
}

function TaskList({ tasks, handleRemove }) {
  return (
    <div>
      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <div key={index}>
            <p>Task: {task.text}</p>
            <button onClick={() => handleRemove(task.id)}>Remove</button>
          </div>
        ))
      ) : (
        <p>No Task</p>
      )}
    </div>
  );
}

function TaskForm({ handleAdd }) {
  const [newTask, setNewtask] = useState('');

  const addTask = () => {
    if (newTask.length <= 3) return;
    handleAdd(newTask);
    setNewtask('');
  };

  return (
    <div className="taskform">
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
