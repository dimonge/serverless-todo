import { DynamoDB } from 'aws-sdk'

const docClient = new DynamoDB.DocumentClient()

const getTodos = async (userId) => {
  const todos = await docClient
    .query({
      TableName: process.env.TODO_TABLE,
      IndexName: process.env.INDEX_NAME,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      }
    })
    .promise()
  return todos.Items
}

export default getTodos
