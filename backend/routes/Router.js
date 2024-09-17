import UserRouter from './UserRoutes.js';
import PhotoRoutes from './PhotoRoutes.js';
import express from "express";
const router = express();

router.use("/api/users", UserRouter)
router.use("/api/photos", PhotoRoutes)

router.get("/", (req, res) => {
    res.json({"ping":"pong"})
})



export default router;