require("dotenv").config();
const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

const products_routes = require("./routes/products");

const connectDB = require('./db/connect');

app.get("/",(req,res)=>{
   res.send("hi i am live");
})

//middleware or to set router
app.use("/api/products",products_routes); 

const start = async()=>{
   try{

      await connectDB(process.env.MONGODB_URL);
      
    app.listen(PORT,()=>{
        console.log(`${PORT} express is running`)
    })
   }catch(err){
    console.log(err)
   }
}

start();