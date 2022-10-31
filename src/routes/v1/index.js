const router = require('express').Router();
import authRoute from './auth.route'
import categoryRoute from './category.route'
import bookRoute from './book.route'
import chapterRoute from './chapter.route'
import sliderRoute from './slider.route'
import axios from 'axios'
import createHttpError from 'http-errors';
router.use('/auth', authRoute)
router.use('/categories', categoryRoute)
router.use('/books', bookRoute)
router.use('/chapters', chapterRoute)
// router.use('/chapters', chapterRoute)
router.use('/sliders', sliderRoute)
router.use('/image', async (req, res, next) => {
    let { url } = req.query
    if (!url) return next(createHttpError(404, 'url not found'))
    try {
        let resData = await axios.get(url, { responseType: "stream" })
        return resData.data.pipe(res)
    } catch (error) {
        console.log(error)
        return next(createHttpError(500, 'server error'))
    }

})

export default router
