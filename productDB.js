require('dotenv').config();
const connectDB = require("./db/connect");
const Product = require("./models/product");

const ProductJson = require("./products.json");

const start = async()=>{
    try{
      await connectDB(process.env.MONGODB_URL)
      await Product.deleteMany();                  //to delete all data of json in mongodb
      await Product.create(ProductJson);           //to create json data
      console.log("success")
    } catch(error){
        console.log(error);
    }
}

start();