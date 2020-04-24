import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler
} from 'aws-lambda'
import { createLogger } from '../../utils/logger'
import { getUserId } from '../utils'
import { DynamoDB } from 'aws-sdk'

const docClient = new DynamoDB.DocumentClient()
const logger = createLogger('http')
const headers = { 'Access-Control-Allow-Origin': '*' }
export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // TODO: Get all TODO items for a current user
  try {
    const userId = getUserId(event)

    const todos = await docClient
      .scan({
        TableName: process.env.TODO_TABLE,
        IndexName: process.env.INDEX_NAME,
        FilterExpression: 'userId=:userId',
        ExpressionAttributeValues: {
          ':userId': userId
        }
      })
      .promise()

    logger.info('Successful returned the todos')

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ items: todos.Items })
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
