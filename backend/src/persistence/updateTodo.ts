import { DynamoDB } from 'aws-sdk'

const docClient = new DynamoDB.DocumentClient()
const bucket = process.env.FILE_UPLOAD_S3_BUCKET
const tableName = process.env.TODO_TABLE

const updateTodo = async (todoId, userId, updateTodo) => {
  const imageUrl = `https://${bucket}.s3.amazonaws.com/${todoId}`
  await docClient
    .update({
      TableName: tableName,
      Key: { todoId, userId },
      UpdateExpression:
        'set attachmentUrl = :a, set dueDate = :dueDate, done = :done',
      ExpressionAttributeValues: {
        ':a': imageUrl,
        ':dueDate': updateTodo.dueDate,
        ':done': updateTodo.done
      },
      ReturnValues: 'UPDATED_NEW'
    })
    .promise()
}
export default updateTodo
