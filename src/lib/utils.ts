import { type IToDo } from "../type/types"

export const getTodosFromLocalStorage = (): IToDo[] => {
  const data = localStorage.getItem("todo")
  return data !== null ? JSON.parse(data) : []
}
export const parseDatetoString = (date: string) => {
  const newDate = new Date(date)
  const year = newDate.getFullYear()
  const month = newDate.getMonth().toString().padStart(2, "0")
  const day = newDate.getDate().toString().padStart(2, "0")
  return `${day}/${month}/${year}`
}
