import { type IToDo } from "../type/types"

interface Prop {
  todo: IToDo[]
}

const parseDatetoString = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth().toString().padStart(2, "0")
  const day = date.getDate().toString().padStart(2, "0")
  return `${day}/${month}/${year}`
}

function TodoList({ todo }: Prop) {
  return (
    <>
      <h3 className="text-2xl font-semibold text-red-500">Tareas pendientes</h3>
      <ul className="grap-2 flex min-w-[80%] flex-col gap-2">
        {todo.map((item) => (
          <li
            key={item.id}
            className="flex items-center rounded-lg border border-red-500/25 bg-gray-200 p-2 shadow"
          >
            <input
              type="checkbox"
              className="mr-2 accent-orange-600"
              defaultChecked={item.completed}
            />
            <section className="flex w-full items-center justify-between gap-1">
              <span className="text-lg">{item.title}</span>
              <span className="text-[10px] text-orange-600 opacity-80">
                {parseDatetoString(item.createdAt)}
              </span>
            </section>
          </li>
        ))}
      </ul>
    </>
  )
}
export default TodoList
