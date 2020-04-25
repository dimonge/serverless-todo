import { S3 } from 'aws-sdk'

const Bucket = process.env.FILE_UPLOAD_S3_BUCKET
const generateUploadUrl = (todoId) => {
  const s3 = new S3({ signatureVersion: 'v4' })

  const uploadUrl = s3.getSignedUrl('putObject', {
    Bucket,
    Key: todoId,
    Expires: 300
  })
  return uploadUrl
}

export default generateUploadUrl
