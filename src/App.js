import "./App.css";
import { AiOutlineDelete } from "react-icons/ai";
import { BiMessageSquareEdit } from "react-icons/bi";
import { MdNote } from "react-icons/md";

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1>
          <MdNote /> Todo List - List your todos
        </h1>
      </header>
      <main className="main">
        <div className="create-todo">
          <input type="text" className="task-name" />
          <input type="date" className="task-due_date" />
          <select>
            <option value="urgent">Urgent</option>
            <option value="normal">Normal</option>
            <option value="medium">Medium</option>
          </select>
          <button className="Task-add">Add</button>
        </div>
        <div className="todo">
          <ul className="todo-list">
            <li className="todo-item">
              <div className="left-col flex">
                <input type="checkbox" name="done" id="" />
                <p className="task-title">Make a website</p>
              </div>
              <div className="right-col ">
                <button>Details</button>
                <p>Jan 21st</p>
                <p className="delete">
                  <AiOutlineDelete />
                </p>
                <p className="edit">
                  <BiMessageSquareEdit />
                </p>
              </div>
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;
