require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const PORT = process.env.PORT || 5000
const models = require('./models/models')
const app = express()
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const fileUpload = require('express-fileupload')
const path = require('path')
const authFileMiddleware = require('./middleware/authFileMiddleware')

app.use(cors())
app.use(express.json())
app.use('/static', express.static(path.resolve(__dirname,'static')))
app.use(fileUpload())
app.use('/api', router)
app.use(errorHandler)

app.get('/download', authFileMiddleware, (req, res) => {
    let {file, location} = req.query
    let fileLocation = path.join(__dirname,'./static',location, file)
    console.log(fileLocation)
    res.download(fileLocation)
});




const start = async () =>{
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, ()=> console.log(`Server started on port ${5000}`))
    }catch(e){
        console.log(e)
    }
}

start()