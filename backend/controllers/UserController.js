import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const jwtSecret = process.env.JWT_SECRET

const generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret, {
        expiresIn: "4d"
    })
};

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    const checkUserExists = await User.findOne({ email })
    if (checkUserExists) {
        res.status(422).json({ errors: ["Please, provide another Email. This email has already been used"] });
        return
    };

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name,
        email,
        password: passwordHash
    });

    if (!newUser) {
        res.status(422).json({ errors: ["something went wrong, try again in 1 minute"] });
        return
    }

    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id)
    });


};

export const login = async (req, res) => {
    const { email, password } = req.body;

    const checkUserExists = await User.findOne({ email });
    if (!checkUserExists) {
        res.status(404).json({ errors: ["User not found."] });
        return
    };

    if (!(await bcrypt.compare(password, checkUserExists.password))) {
        res.status(422).json({ errors: ["password Invalid"] })
    }

    res.status(201).json({
        _id: checkUserExists._id,
        profileImage: checkUserExists.profileImage,
        token: generateToken(checkUserExists._id)
    });

};

export const getCurrentUser = async (req, res) => {
    const user = req.user;
    console.log("dados do usuario: " + user)
    res.status(200).json({
        user
    });
};

export const update = async (req, res) => {
    const { name, password, bio } = req.body;

    let profileImage = null;

    if (req.file) {
        profileImage = req.file.filename
    }
    const reqUser = req.user
    const user = await User.findOne({ _id: reqUser.id }).select("-password");

    if (name) {
        user.name = name
    };

    if (password) {
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);
        user.password = passwordHash;
    };

    if (profileImage) {
        user.profileImage = profileImage
    }

    if (bio) {
        user.bio = bio
    }

    await user.save();
    res.status(200).json(user);
}

export const getUserById = async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.findOne({ _id: id }).select("-password");

        if (!user) {
            res.status(404).json({ errors: ["User Not Found"] });
            return
        }

        res.status(200).json(user);

    } catch (err) {
        res.status(404).json({ errors: ["Id incorret"] });
    }


}