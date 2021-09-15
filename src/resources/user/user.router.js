import { Router } from 'express'
import controllers, { me, updateMe } from './user.controllers'

const router = Router()

router.get('/', me)
router.put('/', updateMe)

// /api/item/all
router.route('/allUsers').get(controllers.getAll)

router.route('/:id').get(controllers.getOne)

export default router
