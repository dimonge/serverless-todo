import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult
} from 'aws-lambda'
import { DynamoDB } from 'aws-sdk'
import { v4 as UUIDv4 } from 'uuid'
import { createLogger } from '../../utils/logger'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest'
import { TodoItem } from '../../models/TodoItem'
import { getUserId } from '../utils'

const TODO_TABLE = process.env.TODO_TABLE
const docClient = new DynamoDB.DocumentClient()
const logger = createLogger('auth')

const headers = { 'Access-Control-Allow-Origin': '*' }
export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const newTodo: CreateTodoRequest = JSON.parse(event.body)

    // TODO: Implement creating a new TODO item

    const item: TodoItem = {
      ...newTodo,
      todoId: UUIDv4(),
      createdAt: JSON.stringify(new Date()),
      done: false,
      userId: getUserId(event)
    }

    await docClient.put({ TableName: TODO_TABLE, Item: item }).promise()
    logger.info('Todo item was created', { todo: item })

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({ item })
    }
  } catch (error) {
    logger.error('Todo item creation failed', { error })
    return {
      statusCode: 500,
      headers,
      body: error.message
    }
  }
}
