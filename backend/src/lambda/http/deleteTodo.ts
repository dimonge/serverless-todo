import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler
} from 'aws-lambda'
import { DynamoDB } from 'aws-sdk'
import { createLogger } from '../../utils/logger'
import { getUserId } from '../utils'

const logger = createLogger('http')
const docClient = new DynamoDB.DocumentClient()
const TODO_TABLE = process.env.TODO_TABLE
const headers = { 'Access-Control-Allow-Origin': '*' }
export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const todoId = event.pathParameters.todoId

    // TODO: Remove a TODO item by id
    //const userId = getUserId(event)
    await docClient.delete({ TableName: TODO_TABLE, Key: { todoId } }).promise()

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
