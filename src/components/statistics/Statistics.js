import "./stats.css";

export default function Statistics({ tasks }) {
  return (
    <section className="stats">
      <Progress tasks={tasks} />
    </section>
  );
}

function Progress({ tasks }) {
  const completedTasks = tasks.filter((task) => task.is_done);
  const percentageCompleted = Math.ceil(
    (completedTasks.length / tasks.length) * 100
  );
  const uncompletedTasks = tasks.length - completedTasks.length;
  return (
    <div className="progress">
      <div className="per">
        <h1>{percentageCompleted}%</h1>
        <progress
          value={completedTasks.length}
          min="0"
          max={tasks.length}
        ></progress>
      </div>
      <div className="total">
        <p>Total Tasks</p>
        <h1>{tasks.length}</h1>
      </div>
      <div className="comp">
        <p>Completed</p>
        <h1>{completedTasks.length}</h1>
      </div>
      <div className="uncomp">
        <p>Uncompleted</p>
        <h1>{uncompletedTasks}</h1>
      </div>
    </div>
  );
}
