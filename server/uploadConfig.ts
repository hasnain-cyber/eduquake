import multer from 'multer';
import multers3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import crypto from 'crypto';

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
    region: process.env.AWS_REGION
});

const upload = multer({
    storage: multers3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME!,
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            const fileExtension = file.originalname.split('.').slice(1).join('.');
            cb(null, crypto.randomUUID() + '.' + fileExtension);
        }
    })
});

export default upload;