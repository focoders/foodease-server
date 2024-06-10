import { Router } from "express";

import { default as v1route } from './v1/v1.route'

const router = Router()

router.use('/v1', v1route)

export default router