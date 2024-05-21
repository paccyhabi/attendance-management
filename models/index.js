const dbconfig = require('../config/dbconfig');
const {Sequelize, DataTypes} = require('sequelize');
const sequelize = new Sequelize(
    dbconfig.DB,
    dbconfig.USER,
    dbconfig.PASSWORD, {
        host: dbconfig.HOST,
        dialect: dbconfig.dialect,
        operatorsAliases: false,

    }
)
sequelize.authenticate()
.then(() => {
    console.log("Connected...")
})
.catch(err => {
    console.log('Error'+err);
})
const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.users = require('./userModel.js')(sequelize, DataTypes)
db.institutions = require('./institutionModel.js')(sequelize, DataTypes)
db.sequelize.sync({force:false})
.then(() => {
    console.log('yes re-sync done!')
})
module.exports = db