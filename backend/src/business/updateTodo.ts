import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import updateTodoAccess from '../persistence/updateTodo'

const updateTodo = async (
  todoId,
  userId,
  updateTodoRequest: UpdateTodoRequest
) => {
  await updateTodoAccess(todoId, userId, updateTodoRequest)
  return true
}
export default updateTodo
