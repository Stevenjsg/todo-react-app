import { type IToDo } from "../type/types"
import { getTodosFromLocalStorage } from "../lib/utils"
import { useTodo } from "../hooks/useTodo"

interface Props {
  setTodos: React.Dispatch<React.SetStateAction<IToDo[]>>
}

function ToDoItem({ setTodos }: Props) {
  const { todo, setTodo, error, setError } = useTodo()

  const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target

    setTodo((prevTodo) => ({
      ...prevTodo,
      title: value,
      id: Math.floor(Math.random() * 1000),
      createdAt: new Date().toISOString(),
    }))
  }

  const createTodo = () => {
    if (todo.title.trim().length > 0) {
      const todos = getTodosFromLocalStorage()
      todos.push(todo)
      localStorage.setItem("todo", JSON.stringify(todos))
      setTodos(todos)
      setTodo((prevTodo) => ({
        ...prevTodo,
        title: "",
      }))
    } else {
      setError("No se puede agregar una tarea vacía")
    }
  }
  return (
    <section className="h-24 px-4">
      <article className="relative flex flex-col gap-1">
        <label
          className="inline-block bg-clip-text text-lg font-semibold text-orange-400 lg:text-xl"
          htmlFor="TodoItem">
          Agregar tarea:
        </label>
        <input
          type="text"
          onChange={HandleChange}
          className="w-[400px] rounded border border-orange-400 px-2 py-3 text-orange-500 placeholder:pl-1 placeholder:text-sm hover:caret-amber-500 md:w-[500px] md:placeholder:text-lg"
          placeholder="Tareas pendientes 😀"
          name="TodoItem"
          value={todo.title}
          id="TodoItem"
        />
        <button
          onClick={createTodo}
          className="bg-gradient-custom absolute bottom-2 right-1 z-10 flex max-h-[2rem] max-w-[4rem] items-center rounded border p-2 text-[12px] font-semibold  text-white duration-300 ease-out hover:grayscale">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            fill="currentColor"
            viewBox="0 -960 960 960"
            width="24">
            <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q65 0 123 19t107 53l-58 59q-38-24-81-37.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q32 0 62-6t58-17l60 61q-41 20-86 31t-94 11Zm280-80v-120H640v-80h120v-120h80v120h120v80H840v120h-80ZM424-296 254-466l56-56 114 114 400-401 56 56-456 457Z" />
          </svg>
        </button>
      </article>
      {error.length > 0 ? (
        <span className="px-2 text-xs italic text-red-500 opacity-60">
          {error}
        </span>
      ) : null}
    </section>
  )
}
export default ToDoItem
