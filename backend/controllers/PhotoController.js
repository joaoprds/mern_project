import Photo from '../models/Photo.js';
import User from '../models/User.js';
import mongoose from 'mongoose';



export const insertPhoto = async (req, res) => {
    const { title } = req.body;
    const image = req.file.filename;

    const reqUser = req.user
    const user = await User.findOne({ _id: reqUser.id }).select("-password");

    const newPhoto = await Photo.create({
        image,
        title,
        userId: user._id,
        userName: user.name
    })
    if (!newPhoto) {
        res.status(422).json({ errors: ["something went wrong, try again in 1 minute"] });
        return
    }

    res.status(201).json(newPhoto)
};

export const deletePhoto = async (req, res) => {

    try {

        const { id } = req.params;
        const reqUser = req.user;
        const photo = await Photo.findById(id)

        if (!photo) {
            res.status(404).json({ erros: ["Photo not Found"] });
            return
        }

        if (!photo.userId.equals(reqUser.id)) {
            res.status(422).json({ erros: ["haven't permission to exclude this Photo"] });
            return
        }

        await Photo.findOneAndDelete(photo._id)
        res.status(200).json({ id: photo._id, message: "Photo excluded with success!" })

    } catch (err) {
        res.status(402).json({ errors: ["Id incorret"] })
    }

};

export const getAllPhotos = async(req, res) => {
    const photos = await Photo.find({}).sort([["createdAt", -1]]).exec()
    return res.status(200).json(photos);
};

export const getUserPhotos = async(req, res) => {
    const {id} = req.params
    const photos = await Photo.find({userId: id}).sort([["createdAt", -1]]).exec()
    return res.status(200).json(photos);
}

export const getphotoById = async(req, res) => {
    const {id} = req.params
    const photos = await Photo.findById(id) 
    if(!photos){
        res.status(404).json({errors: ["Photo not found"]})
        return
    }
    return res.status(200).json(photos);
};

export const updatePhoto = async(req,res) => {
    const {id} = req.params;
    const {title} = req.body;
    const reqUser = req.user;
    const photo = await Photo.findById(id) 
    if(!photo){
        res.status(404).json({errors: ["Photo not found"]})
        return
    };
    
    /*if(!photo.userId.equals(reqUser.id)){
        res.status(422).json({errors: ["The system failed, try again"]})
        return
    };*/
    if(title){
        photo.title = title
    }

    await photo.save()

    res.status(200).json({photo, message:"Photo updated !"})
};

export const likePhoto = async(req, res) => {
    const {id} = req.params;
    const reqUser = req.user;
    const photo = await Photo.findById(id)

    if(!photo){
        res.status(404).json({errors: ["Photo not found"]})
        return
    };
    if(photo.likes.includes(reqUser._id)){
        res.status(422).json({errors: ["you Already like this photo. "]});
        return
    }

    photo.likes.push(reqUser._id)
    photo.save()
    res.status(200).json({photoId: id, userId: reqUser._id, message: "Like in Photo"})
};

export const commentPhoto = async(req,res) => {
    const {id} = req.params;
    const {comment} = req.body;
    const reqUser = req.user;

    const user = await User.findById(reqUser._id);
    const photo = await Photo.findById(id);

    if(!photo){
        res.status(404).json({errors: ["Photo not found"]})
        return
    };

    const userComment = {
        comment,
        userName: user.name,
        userImage: user.profileImage,
        userId: user._id
    };

    photo.comments.push(userComment);
    await photo.save()

    res.status(200).json({
        comment: userComment,
        message: "The comments have been added success"
    })


};

export const searchPhotos = async(req, res) => {
    const {q} = req.query;
    const photos = await Photo.find({title: new RegExp(q, "i")}).exec();
    res.status(200).json(photos);

};