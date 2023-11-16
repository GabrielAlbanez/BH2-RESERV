import multer from "multer";


const storageRifas = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'web\\src\\uploadsImgRifas'); 
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = file.originalname.split('.').pop(); 
    cb(null, uniqueSuffix + '.' + fileExtension); 
  },
});


const upload = multer({ storage: storageRifas });

export default upload;
