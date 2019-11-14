const aws = require('aws-sdk');
const fs = require('fs');
const mime = require('mime-types');
const path = require('path');
const project = require('./package.json');

aws.config.region = process.env.AWS_REGION || 'us-west-2';
const artifactDir = process.env.ARTIFACT_DIR || './dist';
const artifactName = process.env.ARTIFACT_NAME || project.name;
const artifactVersion = process.env.ARTIFACT_VERSION || project.version;
const s3Bucket = process.env.S3_BUCKET || 'myuw-artifacts';
const s3Folder = `${artifactName}@${artifactVersion}`;

console.log(`${Date.now()} :: Starting upload`);
fs.readdir(artifactDir, (err, files) => {
  if (err) {
    console.log('Failed to read artifact directory', err);
    return;
  }
  if(!files || !files.length) {
    console.log(`'${artifactDir}' is empty, nothing to publish ☹`);
    return;
  }
  const s3 = new aws.S3();
  Promise
    .all(files.map(file => s3
      .upload({
        Body: fs.createReadStream(`${artifactDir}/${file}`),
        Bucket: s3Bucket,
        ContentType: mime.lookup(file),
        Key: `${s3Folder}/${file}`
      })
      .promise()
    ))
    .then(() => console.log(`${Date.now()} :: finished upload`))
  ;
});
