import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler
} from 'aws-lambda'
import { DynamoDB, S3 } from 'aws-sdk'
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger'

const logger = createLogger('http')
const Bucket = process.env.FILE_UPLOAD_S3_BUCKET
const TableName = process.env.TODO_TABLE
const docClient = new DynamoDB.DocumentClient()
export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const todoId = event.pathParameters.todoId

    // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
    const s3 = new S3({ signatureVersion: 'v4' })

    const signedUrl = s3.getSignedUrl('putObject', {
      Bucket,
      Key: todoId,
      Expires: 300
    })
    const attachmentUrl = `https://${Bucket}.s3.amazonaws.com/${todoId}`
    const userId = getUserId(event)
    const params = {
      TableName,
      Key: {
        userId: userId,
        todoId: todoId
      },
      UpdateExpression: 'set attachmentUrl = :attachmentUrl',
      ExpressionAttributeValues: {
        ':attachmentUrl': attachmentUrl
      }
    }
    const response = await docClient.update(params).promise()
    logger.info('Updated the attachment url', { todo: response })
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ item: signedUrl })
    }
  } catch (error) {
    logger.error('attachment update failed', { error })
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: error.message
    }
  }
}
