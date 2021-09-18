import { crudControllers } from '../../utils/crud'
import { Job } from './job.model'

export const filterJobs = async (req, res) => {
  const { page = 1, limit = 10 } = req.query

  try {
    const docs = await Job.find({
      ...req.query,
      name: { $regex: req.query.name || '', $options: 'i' },
    })
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
