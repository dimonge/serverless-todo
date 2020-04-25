import generateUploadUrlAccess from '../persistence/generateUploadUrl'

const generateUploadUrl = async (todoId) => {
  return await generateUploadUrlAccess(todoId)
}

export default generateUploadUrl
