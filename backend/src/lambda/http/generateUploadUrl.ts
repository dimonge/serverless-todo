import 'source-map-support/register'

import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  APIGatewayProxyHandler
} from 'aws-lambda'
import { S3 } from 'aws-sdk'
const Bucket = process.env.FILE_UPLOAD_S3_BUCKET
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

    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ item: signedUrl })
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: error.message
    }
  }
}
