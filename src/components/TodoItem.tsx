import { useState } from "react"

function ToDoItem() {
  const [todo, setTodo] = useState<string>("")
  const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value)
  }
  console.log(todo)
  return (
    <form className="relative flex min-w-[80%] flex-col gap-2">
      <label
        className="inline-block bg-clip-text text-xl font-semibold text-red-500  "
        htmlFor="TodoItem"
      >
        Agregar tarea:
      </label>
      <input
        type="text"
        onChange={HandleChange}
        className="w-full rounded p-2 placeholder:pl-1 focus:caret-red-700"
        placeholder="Tareas pendientes...?"
        name="TodoItem"
        id="TodoItem"
      />
      <button className="bg-gradient-custom pointer-events-none absolute bottom-1 right-1 z-10 flex max-h-[2rem] max-w-[4rem] cursor-pointer items-center rounded border p-2 text-[12px] font-semibold text-white">
        Agregar
      </button>
    </form>
  )
}
export default ToDoItem
