import express from "express"
import userRoutes from "./userRoutes.js"

const router = express ()

router.use('/users', userRoutes)

export default router