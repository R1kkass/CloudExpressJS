const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const {email} = req.query
        const token = req.headers.authorization.split(' ')[1]
        console.log(email)
        if (!token) {
            return res.status(401).json({message: "Не авторизован"})
        }else{
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            
            if(decoded.email == email){
            req.user = decoded
            next()
            // return res.status(200).json({message: decoded.email})
        }else{
            return res.status(401).json({message: 'У вас нет доступа'})
        }

        }
       
    } catch (e) {
        res.status(401).json({message: "Не авторизован"})
    }
}