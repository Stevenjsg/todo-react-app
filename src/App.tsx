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
    <main className="grid grid-rows-[auto,1fr,auto] bg-yellow-50">
      <header className="mx-auto">
        <h1 className="bg-gradient-custom inline-block bg-clip-text text-center text-4xl font-bold text-transparent drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          ToDo React App
        </h1>
      </header>
      <section className="min-h-[92.7vh] md:w-[40%] mx-auto">
        <ToDoItem setTodos={setTodos} />
        <section className="w-full mx-auto min-h-[12rem] overflow-y-hidden">
          <TodoList todo={todos} setTodos={setTodos} />
        </section>
      </section>
      <footer>
        <h4 className="leading-6 italic font-semibold text-black text-center text-[10px] opacity-80">
          By: Steven JSG
        </h4>
      </footer>
    </main>
  )
}

export default App
