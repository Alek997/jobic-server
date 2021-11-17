import { crudControllers } from '../../utils/crud'
import { Category } from './category.model'

export const createCategory = async (req, res) => {
  try {
    const doc = await Category.create(req.body)
    res.status(201).json({ data: doc })
  } catch (e) {
    console.error(e)
    console.log('jebiga,', e)
    res.status(400).end()
  }
}

export default crudControllers(Category)
