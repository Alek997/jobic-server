import { Router } from 'express'
import controllers, { findUserNotifications } from './notification.controllers'

const router = Router()

router.route('/').get(findUserNotifications)

// /api/item/:id
router.route('/:id').put(controllers.updateOne)

export default router
