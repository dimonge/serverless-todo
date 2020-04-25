import getTodosAccess from '../persistence/getTodos'

const getTodos = async (userId) => {
  return await getTodosAccess(userId)
}

export default getTodos
