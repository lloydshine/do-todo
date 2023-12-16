import "./stats.css";

function calculateTimeDifference(dateAdded, dateDone) {
  // Convert seconds and nanoseconds to milliseconds
  const addedMilliseconds =
    dateAdded.seconds * 1000 + dateAdded.nanoseconds / 1e6;
  const doneMilliseconds = dateDone.seconds * 1000 + dateDone.nanoseconds / 1e6;

  // Calculate the time difference in milliseconds
  const timeDiffMilliseconds = doneMilliseconds - addedMilliseconds;

  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(timeDiffMilliseconds / (24 * 60 * 60 * 1000));
  const hours = Math.floor(
    (timeDiffMilliseconds % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
  );
  const minutes = Math.floor(
    (timeDiffMilliseconds % (60 * 60 * 1000)) / (60 * 1000)
  );
  const seconds = Math.floor((timeDiffMilliseconds % (60 * 1000)) / 1000);

  // Return an object with the result
  return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
}

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

export default function Statistics({ tasks }) {
  return (
    <section className="stats">
      <Progress tasks={tasks} />
      <Archive tasks={tasks} />
    </section>
  );
}

function Archive({ tasks }) {
  const completedTasks = tasks.filter((task) => task.is_done);

  return (
    <section className="archive">
      <h1>Archive</h1>
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Date_Added</th>
            <th>Date_Done</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {completedTasks.map((task) => (
            <tr>
              <td>{task.text}</td>
              <td>{formatTimestamp(task.date_added)}</td>
              <td>{formatTimestamp(task.date_done)}</td>
              <td>
                {calculateTimeDifference(task.date_added, task.date_done)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
      <div className="s">
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
    </div>
  );
}
