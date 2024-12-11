const { Storage } = require("@google-cloud/storage");
const { v4: uuidv4 } = require("uuid");
const multer = require("multer");

// Inisialisasi Google Cloud Storage
const gcs = new Storage({
  keyFilename: process.env.KEY_FILE
});
const bucketName = process.env.BUCKET_NAME;
const bucket = gcs.bucket(bucketName);

// Fungsi untuk mendapatkan URL public file di Google Cloud Storage
function getPublicUrl(filename) {
  return `https://storage.googleapis.com/${bucketName}/${filename}`;
}

// Middleware Multer untuk menangani file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Fungsi untuk mengunggah file ke GCS
async function uploadToGcs(file) {
  const gcsname = uuidv4();
  const bucketFile = bucket.file(gcsname);

  await new Promise((resolve, reject) => {
    const stream = bucketFile.createWriteStream({
      metadata: { contentType: file.mimetype },
    });

    stream.on("error", (err) => reject(err));
    stream.on("finish", () => resolve());

    stream.end(file.buffer);
  });

  return getPublicUrl(gcsname);
}

module.exports = {
  upload,
  uploadToGcs,
};