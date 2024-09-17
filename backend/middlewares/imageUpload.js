import multer from 'multer';
import path from 'path';

export const imageStore = multer.diskStorage({
    destination: (req, file, cb) =>{
        let folder = ""

        req.baseUrl.includes("users") ? folder = "users" : folder = "photos";
        cb(null, `uploads/${folder}/`)
    },
    filename: (req,file,cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

export const imageUpload = multer({
    storage: imageStore,
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(png|jpg)$/)){
            return cb( new Error("Only png or jpg Files"))
        }
        cb(undefined,true)
    }
})