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
  const { page = 1, limit = 10, budgetFrom, budgetTo } = req.query

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
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean()
      .exec()

    const count = await Job.countDocuments()

    res.status(200).json({
      data: docs,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export default crudControllers(Job)
