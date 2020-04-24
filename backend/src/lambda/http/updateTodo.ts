import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyHandler,
  APIGatewayProxyResult
} from 'aws-lambda'
import { DynamoDB } from 'aws-sdk'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { createLogger } from '../../utils/logger'
const docClient = new DynamoDB.DocumentClient()
const logger = createLogger('http')
const tableName = process.env.TODO_TABLE

const headers = { 'Access-Control-Allow-Origin': '*' }
export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const todoId = event.pathParameters.todoId
    const updatedTodo: UpdateTodoRequest = JSON.parse(event.body)

    // TODO: Update a TODO item with the provided id using values in the "updatedTodo" object
    await docClient
      .update({
        TableName: tableName,
        Key: { todoId },
        UpdateExpression: 'set name = :name, dueDate = :dueDate, done = :done',
        ExpressionAttributeValues: {
          ':name': updatedTodo.name,
          ':dueDate': updatedTodo.dueDate,
          ':done': updatedTodo.done
        }
      })
      .promise()

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
