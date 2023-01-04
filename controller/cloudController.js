const {Cloud, Folder} = require('../models/models')
const ApiError = require('../error/ApiError')
const path = require('path')
const uuid = require('uuid')
const fs = require('fs')
const { dirname } = require('path')
const { Op } = require("sequelize")
const sequelize = require('../db')
const { log } = require('console')

class BuyController{
    async create(req, res){
        const {email, fileName, location} = req.body
        const {file} = req.files
        let size=0
        let fileNames=uuid.v4()+fileName.split(' ').join('')
        const loc =path.resolve(__dirname, '..','static', location, fileNames)
        // fs.watchFile(loc, function () {
            
        //     fs.stat(loc, function (err, stats) {
        //         console.log(stats.size)
        //     })
            
        // })
        file.mv(loc)
        const cloud = await Cloud.create({email, file: fileNames, fileName: fileName, location: location})
        return res.json(cloud)
    }

    async getAll(req, res){
        const {email, location} = req.query
        const folders = await Folder.findAndCountAll({where: {email: email, location: location}})
        const clouds = await Cloud.findAndCountAll({where:{email:email, location: location}})
        return res.json([folders, clouds])
    }

    async delete(req, res){
        const {email, file, location} = req.body
        const road = path.resolve(__dirname, '..', 'static', location, file)
        fs.unlink( road, ()=>{
            console.log('vse')
        })
        const cloud = await Cloud.destroy({where: {email: email, file: file}})
        return res.send(road)
    }

    async getOne(req, res){
        const {file, location} = req.body
        res.statusCode = 200;
        const s = file
        res.setHeader('Content-Type', 'image/jpg')
        const type = s.split('.').pop();
        if (type =='mp4'){
            res.setHeader("Content-Type", "video/mp4");
        }else if (type =='mp3'){
            res.setHeader("Content-Type", "audio/mp3");
        }
        fs.readFile('./static/'+location+'/'+file, (err, image) => {
            console.log(err)
            if(type=="jpg" || type=="png" || type=="mp4" || type=="gif" || type=="jfif"){
            image = image.toString('base64')
            }else{
            image = image.toString('utf-8')
            }
            return res.send([image, type])
            
          })
        }

    async addFolder(req, res){
        const {folder, email, location} = req.body
        
        
        const folderHS = folder.split(' ').join('') + uuid.v4()
        const folders =  await Folder.create({email, folderHS, folder, location})
        const folderName = './static/'+folderHS
        try {
            if (!fs.existsSync(folderName)){
              fs.mkdirSync(folderName)
            }
          } catch (err) {
            console.error(err)
          }
        return res.json(folders)
    }

    async deleteFolder(req, res){
        
        let papks = []
        const {email, location} = req.body
        const folders = await Folder.findAndCountAll({where: {email: email, location: location}})
        const clouds = await Cloud.findAndCountAll({where: {email: email, location: location}})
        
        for(let i = 0; i<folders.count; i++){
            papks.push(folders.rows[i].folderHS)
            let road = path.resolve(__dirname, '..', 'static', folders.rows[i].folderHS)
            fs.rmSync(road, { recursive: true, force: true })
            console.log(road)
            
        }

        for(let i=0; i<clouds.count; i++){
            let roadCloud = path.resolve(__dirname, '..', 'static', location, clouds.rows[i].file)
            fs.unlink(roadCloud,()=>{
                console.log('vse')
            })
        }
        papks.push(location)
        
        const foldersDel =  await Folder.destroy({where: {email: email, folderHS: (papks)}})
        const devices = await Cloud.destroy({where:{email: email, location: (papks)}})
        const road = path.resolve(__dirname, '..', 'static', location)
        fs.rmSync(road, { recursive: true, force: true })
        return res.json(folders)
    }

    async find(req, res){
        const {email, query} = req.body
        
        
        const folders =  await Folder.findAndCountAll({where:{email, 
            folder: {
                [Op.like]: '%' + query + '%'}}})
        const files =  await Cloud.findAndCountAll({
            where: {email,
              fileName: {
                [Op.like]: 
                    '%' + query + '%'
              }
            }
          });
        return res.json([folders,files])
    }

    async download(req, res){
        let {file, location} = req.body
    let fileLocation = path.join(__dirname, './static',location, file)
    // const fileLocation = fs.createWriteStream("file.jpg")
    return res.sendFile(fileLocation)
}
}

module.exports = new BuyController()