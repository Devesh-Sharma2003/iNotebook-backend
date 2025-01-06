const {DataTypes}=require("sequelize");
const {sequelize}=require("../db");
const {UserSchema}=require("./User");

const NotesSchema = sequelize.define("Note",{
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    tags:{
        type:DataTypes.STRING,
        allowNull:false
    },
    userId:{
        type:DataTypes.INTEGER,
        references:{
            model:UserSchema,
            key:"id"
        },
        allowNull:false
    }
});


module.exports = {NotesSchema};