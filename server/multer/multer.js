import multer from 'multer';
import crypto from 'crypto';
import sharp from 'sharp';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3, bucket  } from '../S3/S3.js';


// MULTER SETUP
export const multerSetup = () => {
  const storage = multer.memoryStorage();
  const upload = multer({ storage: storage });
 // .resize({ height: 1920, width: 1080, fit: "contain" })


  return { storage, upload };
};

export const imageUpload = async (req, res) => {
    // console.log("0000");
    
    
  const handleUpload = async (req, res) => {
    const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');

    const file = req.file;

    // Resize image
    const buffer = await sharp(file.buffer).toBuffer();
    const imageName = randomImageName();


    const params = {
      Bucket: bucket.bucketName,
      Key: imageName,
      Body: buffer,
      ContentType: file.mimetype,
    };
    // console.log(params,"111111111111----------=========11111111========1");
    

    const command = new PutObjectCommand(params);
    await s3.send(command);

    return imageName;
  };

  return handleUpload;
};