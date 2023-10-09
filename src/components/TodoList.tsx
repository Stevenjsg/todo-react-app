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
    className={className}
  >
    <path
      d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 
    56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0
     33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"
    />
  </svg>
)

function TodoList({ todo, setTodos }: Prop) {
  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target
    const todos = getTodosFromLocalStorage()
    const updatedTodos = todos.map((item: IToDo) =>
      item.id === Number(id) ? { ...item, completed: !item.completed } : item
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
  return (
    <section className="bg-wite flex w-full flex-col items-center justify-center gap-2 px-4">
      <h4 className="text-xl font-semibold text-red-500 opacity-95">
        Tareas pendientes
      </h4>
      <ul className="grap-2 flex w-full flex-col gap-1">
        {todo.length === 0 ? (
          <li className="rounded-lg border-dashed border-2  border-red-500/25 bg-white p-2 text-center shadow">
            <span className="text-sm md:text-lg text-orange-500">
              No hay tareas pendientes
            </span>
          </li>
        ) : (
          todo.map((item) => (
            <li
              key={item.id}
              className="flex animate-fade-in-up place-content-center rounded-lg border border-red-500/25 duration-200 ease-in-out hover:border-orange-500 bg-white gap-1 py-2 px-1 shadow"
            >
              <input
                type="checkbox"
                id={item.id.toString()}
                onChange={handleCheck}
                className="mr-2 accent-orange-600"
                defaultChecked={item.completed}
              />
              <section className="flex w-full items-center justify-between gap-1">
                <span className="text-sm md:text-lg text-orange-500">
                  {item.title}
                </span>
                <span className="text-[10px] text-orange-500 opacity-80">
                  {parseDatetoString(item.createdAt)}
                </span>
              </section>
              <button
                onClick={() => {
                  deleteToDo({ id: item.id })
                }}
                className="text-orange-600"
              >
                <TrashIcon className="hover:fill-orange-800" />
              </button>
            </li>
          ))
        )}
      </ul>
    </section>
  )
}
export default TodoList
