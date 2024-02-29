const mongoose = require('mongoose');

// MongoDB connection URI
// const uri = 'mongodb://localhost:27017/myrestapi';

//this one is for mongoose@5.0.18
async function connectDB(uri) {
  try {
   await mongoose.connect(uri);

   let db = mongoose.connection;
   
   
   // await db.collection('test').insertOne({test:'test'});    //this one also right  
   await db.createCollection('collection')                     //but it is better
    
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

// Export the connectDB function
module.exports = connectDB ;