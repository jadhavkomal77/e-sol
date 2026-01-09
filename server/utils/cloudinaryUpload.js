import cloudinary from "./cloudinary.config.js";
import { Readable } from "stream";

/**
 * Upload file buffer directly to Cloudinary
 * @param {Buffer} fileBuffer - File buffer from multer memory storage
 * @param {string} folder - Cloudinary folder path
 * @param {string} originalName - Original filename for context
 * @returns {Promise<Object>} Cloudinary upload result
 */
export const uploadToCloudinary = async (fileBuffer, folder, originalName = "file") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folder,
        resource_type: "auto",
        transformation: [
          { quality: "auto" },
          { fetch_format: "auto" }
        ]
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    // Convert buffer to stream
    const stream = Readable.from(fileBuffer);
    stream.pipe(uploadStream);
  });
};

/**
 * Upload multiple files to Cloudinary
 * @param {Array} files - Array of file objects with buffer property
 * @param {string} folder - Cloudinary folder path
 * @returns {Promise<Array>} Array of Cloudinary upload results
 */
export const uploadMultipleToCloudinary = async (files, folder) => {
  const uploadPromises = files.map(file => 
    uploadToCloudinary(file.buffer, folder, file.originalname)
  );
  return Promise.all(uploadPromises);
};

