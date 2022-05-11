const app = require('./app')

const dotenv = require('dotenv')
const connectDatabase= require('./config/database');
const PORT = process.env.PORT || 8000;

//Handling Uncaught Exceptions
process.on('uncaughtException',(e)=>{
    console.log(`Error : ${e.message}`);
    console.log('Shutting down the server due to uncaught expression')    
    process.exit(1);
})
 



//config
dotenv.config({path:'server/config/config.env'})

// connect 
connectDatabase();




const server = app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`);
})  









// Unhandled Promise Rejection 
process.on('unhandledRejection',err=>{
    console.log(`Error : ${err.message}`)
    console.log('Shuting down the server due to unhandled promise rejection ');

    server.close(()=>{
        process.exit(1);
    });

})



