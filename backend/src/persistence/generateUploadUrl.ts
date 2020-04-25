import { S3 } from 'aws-sdk'

const generateUploadUrl = async (todoId) => {
  const s3 = new S3({ signatureVersion: 'v4' })

  const Bucket = process.env.FILE_UPLOAD_S3_BUCKET
  const uploadUrl = s3.getSignedUrl('putObject', {
    Bucket,
    Key: todoId,
    Expires: 300
  })
  return uploadUrl
}

export default generateUploadUrl
