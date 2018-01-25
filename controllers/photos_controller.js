import multer from 'multer';
import AWS from 'aws-sdk';
const s3_config = require('../s3_config');

const s3 = new AWS.S3();
AWS.config.update(
  {
    accessKeyId: s3_config.AWS_ACCESS_KEY_ID,
    secretAccessKey: s3_config.AWS_SECRET_ACCESS_KEY,
    region: s3_config.REGION,
  });

const upload = multer({
  storage: multer.memoryStorage(),
});


module.exports = {
  upload(req, res, next) {
    s3.putObject({
      Bucket: 'your-bucket-name',
      Key: 'your-key-name',
      Body: req.file.buffer,
      ACL: 'public-read', // your permisions
    }, (err) => {
      if (err) return res.status(400).send(err);
      res.send('File uploaded to S3');
  },
