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
    if (value.trim() !== "") {
      setTodo((prevTodo) => ({
        ...prevTodo,
        title: e.target.value,
        id: Math.floor(Math.random() * 1000),
        createdAt: new Date().toISOString(),
      }))
    }
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
    <section className="px-4 h-24">
      <article className="relative flex flex-col gap-1">
        <label
          className="inline-block bg-clip-text text-lg lg:text-xl font-semibold text-orange-400"
          htmlFor="TodoItem"
        >
          Agregar tarea:
        </label>
        <input
          type="text"
          onChange={HandleChange}
          className="w-[300px] md:w-full rounded p-2 placeholder:pl-1 border border-orange-400 text-orange-500 focus:border-white placeholder:text-xs"
          placeholder="Tareas pendientes 😀"
          name="TodoItem"
          value={todo.title}
          id="TodoItem"
        />
        <button
          onClick={createTodo}
          className="bg-gradient-custom absolute bottom-1 right-1 z-10 flex max-h-[2rem] max-w-[4rem] items-center rounded border p-2 text-[12px] font-semibold  duration-300 ease-out text-white hover:grayscale"
        >
          Agregar
        </button>
      </article>
      {error.length > 0 ? (
        <span className="px-2 italic text-xs text-red-500 opacity-60">
          {error}
        </span>
      ) : null}
    </section>
  )
}
export default ToDoItem
