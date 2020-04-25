import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler
} from 'aws-lambda'
import { createLogger } from '../../utils/logger'
import { getUserId } from '../utils'
import getTodos from '../../business/getTodo'

const logger = createLogger('http')
const headers = { 'Access-Control-Allow-Origin': '*' }
export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // TODO: Get all TODO items for a current user
  try {
    const userId = getUserId(event)
    const todos = await getTodos(userId)

    logger.info('Successful returned the todos')

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ items: todos })
    }
  } catch (error) {
    logger.error('Fetching todos failed', { error })

    return {
      statusCode: 500,
      headers,
      body: error.message
    }
  }
}
