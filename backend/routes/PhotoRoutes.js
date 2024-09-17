import { insertPhoto, deletePhoto, getAllPhotos, getUserPhotos, getphotoById, updatePhoto, likePhoto, commentPhoto, searchPhotos } from '../controllers/PhotoController.js';
import { validate } from '../middlewares/handleValidation.js';
import { authGuard } from '../middlewares/authGuard.js';
import { imageUpload } from '../middlewares/imageUpload.js';
import {photoIsertValidation, photoUpdateValidate, commentValidation} from '../middlewares/photoValidation.js';

import express from "express";
const router = express.Router();

router.post("/", authGuard,imageUpload.single("image"),photoIsertValidation(), validate, insertPhoto);
router.delete("/:id", authGuard, deletePhoto);
router.get("/", authGuard, getAllPhotos);
router.get("/user/:id", authGuard, getUserPhotos);
router.get("/search", authGuard, searchPhotos)
router.get("/:id", authGuard, getphotoById);
router.put("/:id", authGuard, photoUpdateValidate(), validate,  updatePhoto);
router.put("/like/:id", authGuard, likePhoto);
router.put("/comment/:id", authGuard, commentValidation(), validate, commentPhoto)




export default  router;