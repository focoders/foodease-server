import { Router } from "express";

import { default as statusRouter } from './status/status.route'
import { default as userRouter } from './user/user.routes'
import { default as storeRouter } from './store/store.routes'
import { default as addressRouter } from './address/address.routes'

const router = Router()

router.use('/status', statusRouter)
router.use('/user', userRouter)
router.use('/store', storeRouter)
router.use('/address', addressRouter)

export default router