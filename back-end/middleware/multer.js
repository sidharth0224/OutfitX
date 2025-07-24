import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images/');
    },
    filename: (req, file, cb) =>{
        console.log(file);
        cb(null, path.extname(file.originalname))
    }
})

// File filter for validation
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and WEBP are allowed.'));
    }
  };

const upload = multer({storage, fileFilter})

export default upload;
