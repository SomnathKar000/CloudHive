import aws from "aws-sdk";
import { config } from "dotenv";

config();

const bucketName = process.env.AWS_S3_BUCKET_NAME!;

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  region: process.env.AWS_REGION!,
});

export { aws, bucketName };
