import "./App.css";
import { AiOutlineDelete } from "react-icons/ai";
import { TbEditCircle } from "react-icons/tb";
import { MdNote } from "react-icons/md";
import { useState } from "react";

function App() {
  let [input, setInput] = useState({
    taskName: "",
    dueDate: "",
    taskPriority: "Urgent",
  });

  let [taskData, setTaskData] = useState(
    JSON.parse(localStorage.getItem("taskData")) || [],
  );

  let [showError, setShowError] = useState(false);
  let [editMode, setEditMode] = useState(false);
  let [editIndex, setEditIndex] = useState(-1);

  const addTask = () => {
    if (!input.taskName || !input.dueDate) {
      setShowError(true);
      return;
    }
    setShowError(false);

    const updatedTaskData = [
      ...taskData,
      {
        id: Math.floor(Math.random() * 100),
        taskName: input.taskName,
        dueDate: input.dueDate,
        taskPriority: input.taskPriority,
        completed: false,
      },
    ];
    setTaskData(updatedTaskData);
    localStorage.setItem("taskData", JSON.stringify(updatedTaskData));
    setInput({ taskName: "", dueDate: "", taskPriority: "Urgent" });
  };

  const deleteTask = (index) => {
    const updateData = taskData.filter((el) => taskData.indexOf(el) !== index);
    setTaskData(updateData);
    localStorage.setItem("taskData", JSON.stringify(updateData));
  };

  const filter = () => {
    const filterArr = taskData.filter((el) => !el.completed);
    return filterArr.length;
  };

  const completedTask = (index) => {
    const temp = [...taskData];
    temp[index].completed = !temp[index].completed;

    setTaskData(temp);
    localStorage.setItem("taskData", JSON.stringify(temp));
  };

  const editTask = (index) => {
    setEditMode(true);
    setInput(taskData[index]);
    setEditIndex(index);
  };

  const updateTask = () => {
    const temp = [...taskData];
    temp[editIndex] = input;
    setTaskData(temp);
    localStorage.setItem("taskData", JSON.stringify(temp));
    setInput("");
  };

  return (
    <div className="App">
      <header className="header">
        <h1>
          <MdNote /> Todo List - List your todos
        </h1>
      </header>
      <main className="main">
        <div className="create-todo">
          <input
            type="text"
            className="task-name"
            value={input.taskName}
            onChange={(e) =>
              setInput((prev) => {
                return {
                  ...prev,
                  taskName: e.target.value,
                };
              })
            }
            required
          />
          <input
            type="date"
            className="task-due_date"
            value={input.dueDate}
            onChange={(e) =>
              setInput((prev) => {
                return {
                  ...prev,
                  dueDate: e.target.value,
                };
              })
            }
            required
          />
          <select
            value={input.taskPriority}
            onChange={(e) =>
              setInput((prev) => {
                return {
                  ...prev,
                  taskPriority: e.target.value,
                };
              })
            }
            required
          >
            <option value="Urgent">Urgent</option>
            <option value="Normal">Normal</option>
            <option value="Medium">Medium</option>
          </select>

          {editMode ? (
            <button className="Task-add" onClick={() => updateTask()}>
              Update
            </button>
          ) : (
            <button className="Task-add" onClick={() => addTask()}>
              Add
            </button>
          )}
        </div>
        {showError && (
          <p style={{ textAlign: "center", color: "red" }}>
            {!input.taskName ? " Please enter task" : "Please select due date"}
          </p>
        )}

        <div className="todo">
          <ul className="todo-list">
            {taskData?.map(
              ({ id, taskName, dueDate, taskPriority, completed }, index) => {
                return (
                  <li className="todo-item" key={id}>
                    <div className="left-col flex">
                      <input
                        type="checkbox"
                        name="done"
                        checked={completed}
                        onChange={() => completedTask(index)}
                      />
                      <p
                        className="task-title"
                        style={{
                          textDecoration: completed && "line-through",
                          transition: completed && "all 1s ease",
                        }}
                      >
                        {taskName}
                      </p>
                    </div>
                    <div className="right-col ">
                      <p>{dueDate}</p>
                      <p>{taskPriority} </p>
                      <p className="edit" onClick={() => editTask(index)}>
                        <TbEditCircle />
                      </p>
                      <p className="delete" onClick={() => deleteTask(index)}>
                        <AiOutlineDelete />
                      </p>
                    </div>
                  </li>
                );
              },
            )}
          </ul>
        </div>
        <div
          className="todo_stats"
          style={{ border: "1px solid rgb(61, 60, 60)" }}
        >
          <p
            className="todo-count"
            style={{ paddingRight: "1rem", fontWeight: "bold" }}
          >
            Total Todos:
            <span style={{ fontWeight: "normal", paddingLeft: "0.5rem" }}>
              {taskData.length}
            </span>
          </p>
          <p
            className="todo-count"
            style={{ paddingRight: "1rem", fontWeight: "bold" }}
          >
            Todos left:
            <span style={{ fontWeight: "normal", paddingLeft: "0.5rem" }}>
              {filter()}
            </span>
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;
