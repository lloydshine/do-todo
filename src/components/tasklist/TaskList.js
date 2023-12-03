import "./tasklist.css";

export default function TaskList({ tasks }) {
  return (
    <div>
      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <div key={index}>
            <p>Task: {task.text}</p>
          </div>
        ))
      ) : (
        <p>No Task</p>
      )}
    </div>
  );
}
