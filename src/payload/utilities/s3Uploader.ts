import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_REGION,
});

export const uploadToS3 = async (file: Buffer, filename: string, mimeType: string): Promise<string> => {
  const params = {
    Bucket: process.env.bucket_name,
    Key: `${uuidv4()}-${filename}`,
    Body: file,
    ContentType: mimeType,
  };

  const uploadResult = await s3.upload(params).promise();
  return uploadResult.Location; 
};