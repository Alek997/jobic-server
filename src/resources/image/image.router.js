import { Router } from 'express'
import controllers from './image.controllers'
import multer from 'multer'
import fs from 'fs'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  },
})

const upload = multer({ storage: storage })

const router = Router()

// /api/item
router.route('/upload').post(upload.single('image'), (req, res) => {
  var obj = {
    name: req.body.name,
    desc: req.body.desc,
    img: {
      data: fs.readFileSync(
        path.join(__dirname + '/uploads/' + req.file.filename)
      ),
      contentType: 'image/png',
    },
  }

  imgModel.create(obj, (err, item) => {
    if (err) {
      console.log(err)
    } else {
      // item.save();
      res.redirect('/')
    }
  })
})

// /api/item/:id
router.route('/:id').get(controllers.getOne).delete(controllers.removeOne)

export default router
