import { useState } from "react"
import { type IToDo } from "../type/types"

export function useTodo() {
  const [todo, setTodo] = useState<IToDo>({
    title: "",
    id: -1,
    completed: false,
    createdAt: new Date().toISOString(),
  })
  const [error, setError] = useState<string>("")

  return { todo, setTodo, error, setError }
}
