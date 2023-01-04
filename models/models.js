const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Cloud = sequelize.define('cloud', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: false,},
    file: {type: DataTypes.STRING, allowNull: false},
    fileName: {type: DataTypes.STRING, allowNull: false},
    location: {type: DataTypes.STRING, unique: false,  allowNull: true}
})

const Folder = sequelize.define('folder', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: false},
    folder: {type: DataTypes.STRING, unique: false},
    folderHS: {type: DataTypes.STRING, unique: true},
    location: {type: DataTypes.STRING, unique: false, allowNull: false, defaultValue: 'null'},
})

module.exports = {
    User,
    Cloud,
    Folder
}