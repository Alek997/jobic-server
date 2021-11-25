import { crudControllers } from '../../utils/crud'
import { Category } from '../category/category.model'
import { Job } from './job.model'

export const findByUser = async (req, res) => {
  try {
    const docs = await Job.find({ createdBy: req.params.userId }).lean().exec()
    res.status(200).json({ data: docs })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const filterJobs = async (req, res) => {
  const { budgetFrom, budgetTo } = req.query
  const pageParam = parseInt(req.query.pageParam)
  const size = parseInt(req.query.size)

  const query = {
    name: { $regex: req.query.name || '', $options: 'i' },
    city: { $regex: req.query.city || '', $options: 'i' },
    budget: {
      $gte: parseInt(budgetFrom) || 0,
      $lte: parseInt(budgetTo) || 100000,
    },
  }
  if (req.query.categoryId) {
    query['categoryId'] = req.query.categoryId
  }
  if (req.query.status) {
    query['status'] = req.query.status
  }

  try {
    const docs = await Job.find(query)
      .limit(size * 1)
      .skip((pageParam - 1) * size)
      .lean()
      .exec()

    const count = await Job.countDocuments()
    const totalPages = Math.ceil(count / size)

    res.status(200).json({
      content: docs,
      totalElements: count,
      totalPages: totalPages,
      last: pageParam === totalPages,
      currentPage: pageParam,
      size: size,
    })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const getCategoryImage = async (categoryId) => {
  const category = await Category.findById(categoryId).lean().exec()

  return category.defaultImageUrl
}

export const createJob = async (req, res) => {
  const createdBy = req.user._id

  try {
    const doc = await Job.create({
      ...req.body,
      createdBy,
      imageUrl: req.body?.imageUrl
        ? req.body.imageUrl
        : await getCategoryImage(req.body.categoryId),
    })
    res.status(201).json({ data: doc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export default crudControllers(Job)
