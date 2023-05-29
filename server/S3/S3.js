import {S3Client} from '@aws-sdk/client-s3'
import dotenv from 'dotenv'

dotenv.config()



export const bucket ={
region : process.env.REGION,
 bucketName : process.env.BUCKET_NAME,
 accessKey : process.env.ACCESS_KEY,
secretAccessKey : process.env.SECRET_ACCESS_KEY
}

export const s3 = new S3Client({
    credentials:{
        accessKeyId:bucket.accessKey,
        secretAccessKey: bucket.secretAccessKey
    },
    region:bucket.region
})