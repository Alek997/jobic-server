import { crudControllers } from '../../utils/crud'
import { Notification } from './notification.model'

export const findUserNotifications = async (req, res) => {
  try {
    const docs = await Notification.find({ user: req.user._id }).lean().exec()
    res.status(200).json({ data: docs })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const notifyUser = (newNotification, userId) => {
  try {
    Notification.create({ ...newNotification, user: userId })
  } catch (e) {
    console.error(e)
  }
}

export default crudControllers(Notification)
