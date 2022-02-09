import express from "express"
import { getUser, postUser, patchUser, deleteUser } from "../constrollers/userControllers.js"

const router = express()

router.get('/:id', getUser)
router.post('/', postUser)
router.path('/:id', patchUser)
router.delete('/:id', deleteUser)

export default router
