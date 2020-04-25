import { DynamoDB } from 'aws-sdk'

const docClient = new DynamoDB.DocumentClient()

const TODO_TABLE = process.env.TODO_TABLE

const deleteTodo = async (todoId) => {
  await docClient.delete({ TableName: TODO_TABLE, Key: { todoId } }).promise()
}

export default deleteTodo
