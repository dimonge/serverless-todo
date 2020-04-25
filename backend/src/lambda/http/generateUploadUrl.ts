import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler
} from 'aws-lambda'
import generateUploadUrl from '../../business/generateUploadUrl'
import { createLogger } from '../../utils/logger'

const logger = createLogger('http')
export const handler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    const todoId = event.pathParameters.todoId

    // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
    const uploadUrl = generateUploadUrl(todoId)
    logger.info('Upload url was successfully created' + uploadUrl)
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ uploadUrl })
    }
  } catch (error) {
    logger.error('File failed to generate upload url', { error })
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: error.message
    }
  }
}
