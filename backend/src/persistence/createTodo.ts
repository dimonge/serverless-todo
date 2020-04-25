import { DynamoDB } from 'aws-sdk'

const docClient = new DynamoDB.DocumentClient()
const TODO_TABLE = process.env.TODO_TABLE

const createTodo = async (todo) => {
  await docClient
    .put({
      TableName: TODO_TABLE,
      Item: todo
    })
    .promise()
  return todo
}
export default createTodo
