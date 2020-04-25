import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { TodoItem } from '../models/TodoItem'
import { createLogger } from '../utils/logger'
import { v4 as UUIDv4 } from 'uuid'
const logger = createLogger('business')
import createTodoAccess from '../persistence/createTodo'

const createTodo = async (
  createTodoRequest: CreateTodoRequest,
  userId
): Promise<TodoItem> => {
  logger.info('Creating Todo', { createTodoRequest, userId })

  const bucket = process.env.FILE_UPLOAD_S3_BUCKET
  const todoId = UUIDv4()
  return await createTodoAccess({
    todoId,
    userId,
    name: createTodoRequest.name,
    dueDate: createTodoRequest.dueDate,
    createdAt: new Date().toISOString(),
    attachmentUrl: `https://${bucket}.s3.amazonaws.com/${todoId}`,
    done: false
  })
}

export default createTodo
