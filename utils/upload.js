const cloudinary = require("../utils/cloudinary");
const streamifier = require("streamifier");

async function uploadToCloudinary(fileBuffer) {
    return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
            { folder: "patients" },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result); // result will contain the URL
                }
            }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
    });
}
module.exports = uploadToCloudinary;