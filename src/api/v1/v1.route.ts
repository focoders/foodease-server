import { Router } from "express";

import { default as statusRouter } from './status/status.route'
import { default as userRouter } from './user/user.routes'

const router = Router()

router.use('/status', statusRouter)
router.use('/user', userRouter)

export default router