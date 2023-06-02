import express from 'express'
import { createUser, fetchUsers, loginUser } from '../controllers/users'

const router = express.Router()

router.get('/', fetchUsers)

router.post('/register-user', createUser)

router.post('/login-user', loginUser)

// router.get('/:id', userDetail)

export default router