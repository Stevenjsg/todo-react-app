import { useState } from "react"
import { getTodosFromLocalStorage, parseDatetoString } from "../lib/utils"
import { type idTodo, type IToDo } from "../type/types"
interface Prop {
  todo: IToDo[]
  setTodos: React.Dispatch<React.SetStateAction<IToDo[]>>
}
const TrashIcon = ({ size = 20, color = "currentColor", className = "" }) => (
  <svg
    height={size}
    fill={color}
    viewBox="0 -960 960 960"
    width={size}
    className={className}>
    <path
      d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 
    56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0
     33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"
    />
  </svg>
)

function TodoList({ todo, setTodos }: Prop) {
  const [show, setShow] = useState(false)
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target
    const todos = getTodosFromLocalStorage()
    const updatedTodos = todos.map((item: IToDo) =>
      item.id === Number(id) ? { ...item, completed: !item.completed } : item,
    )
    localStorage.setItem("todo", JSON.stringify(updatedTodos))
    setTodos(updatedTodos)
  }
  const deleteToDo = ({ id }: idTodo) => {
    const todos = getTodosFromLocalStorage()
    const updatedTodos = todos.filter((item: IToDo) => item.id !== Number(id))
    localStorage.setItem("todo", JSON.stringify(updatedTodos))
    setTodos(updatedTodos)
  }
  const filterTodo = () => {
    setShow((prevShow) => !prevShow)
  }
  return (
    <section className="bg-wite flex w-full flex-col items-center justify-center gap-2 px-2">
      <h4 className="text-xl font-semibold text-red-500 opacity-95">
        Tareas pendientes
      </h4>
      <nav className="flex items-center gap-2 ">
        <button
          onClick={filterTodo}
          className="rounded bg-orange-300 p-2 text-amber-800 shadow hover:bg-orange-500">
          {show ? "Todos" : "Hechos"}
        </button>
      </nav>
      <ul className="grap-2 flex w-full flex-col gap-1">
        {todo.length === 0 ? (
          <li className="rounded-lg border-2 border-dashed  border-red-500/25 bg-white p-2 text-center shadow">
            <span className="text-sm text-orange-500 md:text-lg">
              No hay tareas pendientes
            </span>
          </li>
        ) : (
          todo
            .filter((todo) => (show ? todo.completed : true))
            .map((filteredTodo) => (
              <li
                key={filteredTodo.id}
                className={`${
                  filteredTodo.completed
                    ? "bg-gray-400/25 duration-500 ease-in"
                    : "bg-white duration-500 ease-in"
                } relative flex animate-fade-in-up place-content-center gap-1 overflow-hidden rounded-lg border border-red-500/25 px-2 py-3 shadow duration-200 ease-in-out hover:border-orange-500`}>
                <input
                  type="checkbox"
                  id={filteredTodo.id.toString()}
                  onChange={handleCheck}
                  className="mx-1 accent-orange-600"
                  defaultChecked={filteredTodo.completed}
                />
                <section className="flex w-full items-center justify-between gap-1">
                  <span className="text-md text-orange-500 md:text-lg">
                    {filteredTodo.title}
                  </span>
                  <span className="text-[10px] text-orange-500 opacity-50">
                    {parseDatetoString(filteredTodo.createdAt)}
                  </span>
                </section>
                <button
                  onClick={() => {
                    deleteToDo({ id: filteredTodo.id })
                  }}
                  className="text-orange-600">
                  <TrashIcon size={24} className="hover:fill-orange-800" />
                </button>
                <hr
                  className={`${
                    !filteredTodo.completed ? "hidden" : ""
                  } animate-cross-out absolute top-[50%] h-0.5 w-full border-0 bg-black`}
                />
              </li>
            ))
        )}
      </ul>
    </section>
  )
}
export default TodoList
