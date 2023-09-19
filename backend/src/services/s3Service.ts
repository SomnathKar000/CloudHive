import { bucketName, aws } from "../utils/aws";

const s3 = new aws.S3();

const generatePreSignedUrl = (key: string, type: string) => {
  return s3.getSignedUrlPromise("putObject", {
    Bucket: bucketName,
    ContentType: type,
    Key: key,
    Expires: 60 * 10,
  });
};

export { generatePreSignedUrl };
