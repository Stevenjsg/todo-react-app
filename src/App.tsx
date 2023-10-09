import { useEffect, useState } from "react"
import ToDoItem from "./components/TodoItem"
import TodoList from "./components/TodoList"
import { type IToDo } from "./type/types"
import { getTodosFromLocalStorage } from "./lib/utils"

function App() {
  const [todos, setTodos] = useState<IToDo[]>([])
  useEffect(() => {
    const Todo = getTodosFromLocalStorage()
    setTodos(Todo)
  }, [])
  return (
    <main className="grid min-h-[100vh] min-w-[100vw] grid-rows-[auto,1fr,auto] gap-6">
      <header className="mx-auto flex flex-col items-center gap-1.5">
        <h1 className="bg-gradient-custom inline-block bg-clip-text text-center text-4xl font-bold leading-10 text-transparent drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] lg:text-6xl">
          ToDo React App
        </h1>
        <span className="rounded bg-blue-600 p-0.5 font-serif font-bold text-white shadow shadow-cyan-600/25">
          Ts
        </span>
      </header>
      <section className="mx-auto flex w-full flex-col items-center lg:w-[40%]">
        <ToDoItem setTodos={setTodos} />
        <section className="min-h-[20rem] w-full">
          <TodoList todo={todos} setTodos={setTodos} />
        </section>
      </section>
      <footer>
        <h4 className="text-center text-[10px] font-semibold italic leading-6 text-black opacity-80">
          By: SJSG {new Date().getFullYear()}
        </h4>
      </footer>
    </main>
  )
}

export default App
