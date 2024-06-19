import { Router } from "express";

import { default as statusRouter } from './status/status.route'
import { default as userRouter } from './user/user.routes'
import { default as storeRouter } from './store/store.routes'

const router = Router()

router.use('/status', statusRouter)
router.use('/user', userRouter)
router.use('/store', storeRouter)

export default router