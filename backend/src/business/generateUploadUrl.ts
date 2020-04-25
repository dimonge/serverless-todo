import generateUploadUrlAccess from '../persistence/generateUploadUrl'

const generateUploadUrl = (todoId) => {
  return generateUploadUrlAccess(todoId)
}

export default generateUploadUrl
