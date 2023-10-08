import { useEffect, useState } from "react"
import ToDoItem from "./components/TodoItem"
import TodoList from "./components/TodoList"
import { todo } from "./cosntant"
import { type IToDo } from "./type/types"

function App() {
  const [todos, setTodos] = useState<IToDo[]>([])
  useEffect(() => {
    setTodos(todo)
  }, [])
  return (
    <>
      <main className="flex min-h-[100vh] flex-col items-center justify-center gap-2 bg-gray-200">
        <h1 className=" bg-gradient-custom inline-block bg-clip-text text-center text-4xl font-bold text-transparent drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
          ToDo React App
        </h1>
        <ToDoItem />
        <TodoList todo={todos} />
      </main>
    </>
  )
}

export default App
