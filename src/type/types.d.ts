export interface IToDo {
  id: number
  title: string
  completed: boolean
  createdAt: string
}

export type title = Pick<IToDo, "title">
export type completed = Pick<IToDo, "completed">
export type createdAt = Pick<IToDo, "createdAt">
export type idTodo = Pick<IToDo, "id">
