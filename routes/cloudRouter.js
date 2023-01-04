const Router = require('express')
const router = new Router()
const cloudController = require('../controller/cloudController')
const checkRole = require('../middleware/checkMiddleWare')
const authMiddleware = require('../middleware/authMiddleware')
const authFileMiddleware = require('../middleware/authFileMiddleware')
const authCheckMiddleware = require('../middleware/authCheckMiddleware')

router.post('/', authMiddleware, cloudController.create)
router.get('/', authFileMiddleware, cloudController.getAll)
router.post('/delete', authMiddleware, cloudController.delete)
router.post('/file', authMiddleware, cloudController.getOne)
router.post('/addfolder', authMiddleware, cloudController.addFolder)
router.post('/deletefolder', authMiddleware, cloudController.deleteFolder)
router.post('/find', authMiddleware, cloudController.find)
router.post('/download', authMiddleware, cloudController.download)
router.post('/authcheck', authCheckMiddleware)

module.exports=router