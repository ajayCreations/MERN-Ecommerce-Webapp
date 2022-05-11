const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, {
      // userNewUrlParser: true,
      // userUnifiedTopology: true,
      // useCreateIndex: true,
    }) 
    .then((data) => {
      console.log(`Mongodb connnected with server: ${data.connection.host}`);
    })
    // .catch((error) => {
    //   console.log(error);
    // });        it already handled in server. 
};


module.exports= connectDatabase;