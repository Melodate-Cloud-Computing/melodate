const multer = require("multer");
const { bucket } = require("../config/gcs");
const { v4: uuidv4 } = require("uuid");

const multerStorage = multer.memoryStorage();

const uploads = multer({
  storage: multerStorage,
  limits: {
    fileSize: 2 * 1024 * 1024, // Maksimal 2MB
  },
}).fields([
  { name: "profilePicture1", maxCount: 1 },
  { name: "profilePicture2", maxCount: 1 },
  { name: "profilePicture3", maxCount: 1 },
  { name: "profilePicture4", maxCount: 1 },
  { name: "profilePicture5", maxCount: 1 },
  { name: "profilePicture6", maxCount: 1 },
  { name: "topArtistImage1", maxCount: 1 },
  { name: "topArtistImage2", maxCount: 1 },
  { name: "topArtistImage3", maxCount: 1 },
  { name: "topTrackImage1", maxCount: 1 },
  { name: "topTrackImage2", maxCount: 1 },
  { name: "topTrackImage3", maxCount: 1 },
  { name: "topTrackImage4", maxCount: 1 },
  { name: "topTrackImage5", maxCount: 1 },
]);

const uploadToGCS = async (file) => {
  return new Promise((resolve, reject) => {
    const fileName = `uploads/${uuidv4()}-${file.originalname}`;
    const blob = bucket.file(fileName);

    const blobStream = blob.createWriteStream({
      resumable: true,
      contentType: file.mimetype,
    });

    blobStream
      .on("error", (err) => reject(err))
      .on("finish", () => {
        const publicUrl = `https://storage.googleapis.com/${melodatefirstbucket}/${blob.name}`;
        resolve(publicUrl);
      });

    blobStream.end(file.buffer);
  });
};

module.exports = { uploads, uploadToGCS };