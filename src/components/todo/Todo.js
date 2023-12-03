import { useEffect, useState } from "react";
import { onTasksSnapshot } from "../../firebase/firebase";
import { TaskList } from "../";

export default function Todo({ user, logout }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = onTasksSnapshot(user.uid, (tasks) => {
      setTasks(tasks);
    });
    return () => unsubscribe();
  }, [user.uid]);

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <img src={user.photo} alt="profile" />
      <button onClick={logout}>Logout</button>
      <TaskList tasks={tasks} />
    </div>
  );
}
