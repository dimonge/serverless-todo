import deleteTodoAccess from '../persistence/deleteTodo'

const deleteTodo = async (todoId) => {
  await deleteTodoAccess(todoId)
}

export default deleteTodo
