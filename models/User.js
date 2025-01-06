const {DataTypes} = require("sequelize");
const {sequelize} = require("../db");


const UserSchema = sequelize.define("User", {
    name:{
        type:DataTypes.STRING, 
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            isEmail:true,
        },
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        minLength:8,
    },
    timestamp:{
        type:DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
},{timestamps:false});


module.exports = {UserSchema};