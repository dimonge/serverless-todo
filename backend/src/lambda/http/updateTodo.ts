import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult
} from 'aws-lambda'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { createLogger } from '../../utils/logger'
import updateTodo from '../../business/updateTodo'
import { getUserId } from '../utils'
const logger = createLogger('http')

const headers = { 'Access-Control-Allow-Origin': '*' }
export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const todoId = event.pathParameters.todoId
    const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)

    const userId = getUserId(event)
    await updateTodo(todoId, userId, updatedTodo)

    logger.info('Todo was successful updated', { todoId })
    return {
      statusCode: 204,
      headers,
      body: ''
    }
  } catch (error) {
    logger.error('Updating todo failed', { error })
    return {
      statusCode: 500,
      headers,
      body: error.message
    }
  }
}
