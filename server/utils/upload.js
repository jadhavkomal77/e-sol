// import multer from "multer";

// const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
// const fileFilter = (req, file, cb) => {
//   allowedTypes.includes(file.mimetype)
//     ? cb(null, true)
//     : cb(new Error("Invalid file type. Only JPEG, JPG, PNG, and WEBP are allowed"));
// };

// const memoryStorage = multer.memoryStorage();

// export const uploadSingle = (field) => multer({
//   storage: memoryStorage,
//   fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
// }).single(field);

// export const uploadMultiple = (fields) => multer({
//   storage: memoryStorage,
//   fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 },
// }).fields(fields);



import multer from "multer";

const allowedTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only JPEG, JPG, PNG, and WEBP images are allowed"
      ),
      false
    );
  }
};

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

export const uploadSingle = (field) => upload.single(field);
export const uploadMultiple = (fields) => upload.fields(fields);

export default upload;
