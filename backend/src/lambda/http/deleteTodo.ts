import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler
} from 'aws-lambda'
import { createLogger } from '../../utils/logger'
import deleteTodo from '../../business/deleteTodo'

const logger = createLogger('http')
const headers = { 'Access-Control-Allow-Origin': '*' }
export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const todoId = event.pathParameters.todoId

    // TODO: Remove a TODO item by id
    await deleteTodo(todoId)
    logger.info('Todo was successfully removed.', { todoId })
    return {
      statusCode: 204,
      headers,
      body: ''
    }
  } catch (error) {
    logger.error('Todo removal failed', { error })
    return {
      statusCode: 500,
      headers,
      body: error.message
    }
  }
}
