const Router = require('express')
const router = new Router()

const userRouter = require('./userRouter')
const cloudRouter = require('./cloudRouter')

router.use('/user', userRouter)
router.use('/cloud', cloudRouter)

module.exports=router