import { crudControllers } from '../../utils/crud'
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
  if (req.query.category) {
    query['categoryId'] = req.query.category
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

export default crudControllers(Job)
