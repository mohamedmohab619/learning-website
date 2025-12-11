import { useState } from "react";

function TodoItem({ task, onToggle, onDelete }) {
  return (
    <div
      className={`flex items-center justify-between p-3 rounded-lg ${task.status === "done" ? "bg-green-50" : "bg-white"
        } mb-2 shadow-sm border hover:bg-gray-50 transition`}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={() => onToggle(task.id)}
          className={`w-4 h-4 rounded border flex items-center justify-center ${task.status === "done" ? "bg-green-500 border-green-500" : "border-gray-400"
            }`}
        >
          {task.status === "done" && (
            <span className="w-2 h-2 bg-white rounded-full"></span>
          )}
        </button>

        <div>
          <p className="text-sm font-medium text-gray-800">{task.title}</p>
          {task.time && (
            <span className="text-xs font-semibold text-orange-500">
              {task.time}
            </span>
          )}
        </div>
      </div>

      {/* Right side*/}
      <div className="flex items-center gap-2">
        {task.status === "done" && <div className="w-2 h-2 rounded-full bg-green-500"></div>}
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition"
          title="Delete task"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function ToDoItem() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Developing Restaurant Apps", time: "08:00 AM", status: "pending" },
    { id: 2, title: "Integrate API", status: "pending" },
    { id: 3, title: "Slicing Home Screen", status: "pending" },
    { id: 4, title: "Research Objective User", time: "02:40 PM", status: "pending" },
    { id: 5, title: "Report Analysis P2P-Business", time: "04:50 PM", status: "done" },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDate, setNewTaskDate] = useState("");
  const [newTaskTime, setNewTaskTime] = useState("");

  const formatDateTime = (date, time) => {
    if (!date && !time) return null;

    if (date && time) {
      const dateObj = new Date(date);
      const options = { month: 'short', day: 'numeric', year: 'numeric' };
      const formattedDate = dateObj.toLocaleDateString('en-US', options);

      const [hours, minutes] = time.split(':');
      const hour12 = hours % 12 || 12;
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedTime = `${hour12}:${minutes} ${ampm}`;

      return `${formattedDate} at ${formattedTime}`;
    } else if (date) {
      const dateObj = new Date(date);
      const options = { month: 'short', day: 'numeric', year: 'numeric' };
      return dateObj.toLocaleDateString('en-US', options);
    } else if (time) {
      const [hours, minutes] = time.split(':');
      const hour12 = hours % 12 || 12;
      const ampm = hours >= 12 ? 'PM' : 'AM';
      return `${hour12}:${minutes} ${ampm}`;
    }
    return null;
  };

  const addTask = () => {
    if (newTaskTitle.trim() === "") return;

    const formattedDateTime = formatDateTime(newTaskDate, newTaskTime);

    const newTask = {
      id: Date.now(),
      title: newTaskTitle.trim(),
      time: formattedDateTime,
      status: "pending",
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
    setNewTaskDate("");
    setNewTaskTime("");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, status: task.status === "pending" ? "done" : "pending" }
        : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const pendingTasks = tasks.filter(task => task.status === "pending");
  const finishedTasks = tasks.filter(task => task.status === "done");

  return (
    <div>
      <h3 className="font-semibold text-gray-800 mt-6 mb-2">To Do List</h3>

      {/* Add new task form */}
      <div className="mb-4 space-y-2">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTask()}
          placeholder="Add a new task..."
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="grid grid-cols-2 gap-2">
          <input
            type="date"
            value={newTaskDate}
            onChange={(e) => setNewTaskDate(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="time"
            value={newTaskTime}
            onChange={(e) => setNewTaskTime(e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={addTask}
          className="w-full px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition"
        >
          Add Task
        </button>
      </div>

      {/* Pending tasks */}
      {pendingTasks.length > 0 && (
        <div className="mb-4">
          {pendingTasks.map(task => (
            <TodoItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
          ))}
        </div>
      )}

      {/* Finished tasks section */}
      {finishedTasks.length > 0 && (
        <div className="mt-6">
          <h4 className="font-semibold text-gray-700 text-sm mb-2">Finished Tasks</h4>
          <div className="text-sm text-gray-500">
            {finishedTasks.map(task => (
              <TodoItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
