const router = require('express').Router();
import authRoute from './auth.route'
import categoryRoute from './category.route'
import bookRoute from './book.route'
import chapterRoute from './chapter.route'
import sliderRoute from './slider.route'

router.use('/v1/auth', authRoute)
router.use('/v1/categories', categoryRoute)
router.use('/v1/books', bookRoute)
router.use('/v1/chapters', chapterRoute)
// router.use('/v1/chapters', chapterRoute)
router.use('/v1/sliders', sliderRoute)

export default router
