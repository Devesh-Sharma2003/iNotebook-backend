// imported Sequelize class from sequelize library...
// Sequelize helps to manage connection with db...
const {Sequelize} = require("sequelize");

// create a new connection sequelize with given configuration....
const sequelize=new Sequelize(
    "local_db",
    "postgres",
    "Password01",{
    host:"localhost",
    dialect:"postgres",
    port:5432
});


// async function to connect to postgres...
const connectToPostgres =async ()=>{
    try{
        await sequelize.authenticate();
        console.log("Connected to postgres successfully!");
    }catch(err){
        console.log("Error connecting to postgres "+err);
    }finally{
        console.log("finally block executed!");
    }
};


// export the connection pool object so that app can use over  any part to interact with db
module.exports={sequelize, connectToPostgres};