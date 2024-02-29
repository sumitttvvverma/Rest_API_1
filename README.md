"# Rest_API_1" 
first we create app.js , new terminal > npm init -y
after write app.js file data check node app.js for port is running or not
then npm i express , npm i nodemon 
after that we set and change in package.json > scripts =>
 "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  },
now for server > npm run dev 
Now check localhost:5000     &    you will get > hi i am live

<--End-->
Setup Routes and Controllers
create controllers > product.js , routes > product.js

In controllers/product.js =>
create =>getAllProducts async(req,res) , getAllProductsTesting async(req,res) function
in which =>res.status(200).json({msg:"______"});
after that => module.exports={getAllProducts,getAllProductsTesting};

<--End-->

In routes/product.js
const express = require("express");
const router=express.Router();
Import  functions of ../controllers/products =>
const {getAllProducts, getAllProductsTesting} = require("../controllers/products");

set the route for both functions() that imported =>
router.route("/").get(getAllProducts);
router.route("/testing").get(getAllProductsTesting);
after that => module.exports = router;

<--End-->

Now in app.js 
Import routes from routes/product.js  => 
const products_routes = require("./routes/products");
To set router =>
app.use("/api/products",products_routes); 

after that =>  npm run dev
and check => http://localhost:5000/api/products  , http://localhost:5000/api/products/testing are working or not ?
and u will get => getAllProducts, getAllProductsTesting msgs we passed in controllers/product.js through router.route of routes/product.js

<--End-->


<MONGODB>






<--End-->

create and install dotenv 
npm i dotenv  & create => .env
after that in .env
MONGODB_URL= urlofconnectionstring
in app.js =>
require("dotenv").config();
and put 'process.env.MONGODB_URL' inside await connectDB(process.env.MONGODB_URL);
Now in db/connect.js
comment out -> const uri line & pass the uri argument in function connectDB so process.env.MONGODB_URL=uri
then again npm run dev

<--End-->

create => models/product.js , /productDB.js , /products.json
in products.js => json data copy or create objs in array
[{"name": "iphone","price": "131","feature": "true","company": "apple"},{ similiar},{...},{..}]

in models/product.js=>
import => mongoose , create Schema -> new mongoose.Schema({name:{},prize:{}, .....})
after that => module.exports=mongoose.model("CollectionName",SchemaName);

in productDB.js=>
import => dotenv , ./db/connect.js , ./models/product.js , ./products.json
create=> async() called & inside => await connectDB(process.env.MONGODB_URL); by using dotenv , db/connect.js &
& => await Product.create(ProductJson); by using ./models/product.js , ./products.json
and > npm run dev ,
It will create a Collection>"CollectionName" in mongodb for db> myrestapi with inside products.json file data

<--End-->

now for read data from database 
Now in controllers/products.js =>
import => models/product.js
In both functions create=> const myData = await Product.find({})
replace msg box of both getAllProducts(),getAllProductsTesting() functions with myData
now on server http://localhost:5000/api/products/testing  , http://localhost:5000/api/products u will see the data

<--End-->

To add filration & Searching functionality
Use Postman paste  http://localhost:5000/api/products/testing  , http://localhost:5000/api/products 
both use to get data
now in controllers/products.js
add name="iphone" inside > Product.find > myData of function getAllProducts
add company:"apple" inside > Product.find > myData of function getAllProductsTesting
Now u see Both paste URl > u will get data in which 'iphone' or 'apple' have

<--End-->
in  controllers/products.js
in function getAllProductsTesting do=>       req.query
const myData = await Product.find(req.query);
and in Postman >get request
getAllProductsTesting>
http://localhost:5000/api/products/testing?company=mi  > key=company value=mi 
http://localhost:5000/api/products/testing?name=iphone
http://localhost:5000/api/products/testing?name=ip  > if put wrong value it will give >>>> {    "myData": []   }
http://localhost:5000/api/products/testing?featured=true  >work
http://localhost:5000/api/products/testing?featured=true&asas=def > Not work

<--End-->

even if have wrong keyValue with featured it will work getAllProducts becoz
http://localhost:5000/api/products?featured=true&aass=eer  >work and show all data, bcoz Product.find({})

in getAllProducts >
add req.query__ >
const { company }= req.query;
const myData = await Product.find({company})
http://localhost:5000/api/products?company=apple  > it will show company = apple data
http://localhost:5000/api/products?company=apple&asas=wes > myData empty/not work  
so 
if someone fill wrong keyValue with Right keyValue it will run at least right keyValue and show data for that
Add in getAllProducts function > const queryObject ={};       
and add company statement 
if(company){   queryObject.company = company;  }
after it 
change/update > myData => const myData = await Product.find(queryObject)
Now 
http://localhost:5000/api/products?company=apple&sww=ree > it will work

<--End-->

Now do same with 'name' in getAllProducts
update > const { company ,name }= req.query;
add > if(name){   queryObject.name = name; }
after that
http://localhost:5000/api/products?company=apple&name=iphone > it will work

<--End-->

regex => mongodb offers a full text search solution it is used to "if we enter a valueName, search engine show all valueNames which have that valueName  

in getAllProductsTesting >
in if(name) statement >
update > queryObject.name ={$regex: name, $options: "i"} 
after that
http://localhost:5000/api/products?company=apple&name=iphone > it will show iphone , iphone10 both

<--End-->

similiar for featured
http://localhost:5000/api/products?company=apple&name=iphone&featured=true > worked

<--End-->

Add sort functionality for ascending , descending
in getAllProductsTesting >
for sorting, update myData >  const myData = await Product.find(req.query).sort("name");
http://localhost:5000/api/products/testing >check
"name" means name will be ascending order(a-z)
"-name" means name will be descending order(z-a)

Now in getAllProducts > 
Sorting for all and multi >
update > const { company,name,featured,sort }= req.query;
for sorting assume myData value as it > let apiData = Product.find(queryObject) &
update > const myData = await apiData
create after apiData line > 
if(sort){
          let sortFix = sort.replace(","," ");
          apiData = apiData.sort(sortFix);          }
Now in Postman
http://localhost:5000/api/products?sort=name > check , worked
http://localhost:5000/api/products?sort=-name,-price > check ,worked

<--End-->

Now selection what we want to see in Postman
Now in getAllProducts >
update > const { company,name,featured,sort,select }= req.query;
if(select){
            let selectFix = select.replace(","," ");
            apiData = apiData.select(selectFix);          } 
Now in Postman
http://localhost:5000/api/products?select=name > check ,worked         
http://localhost:5000/api/products?select=name,company > check ,worked
http://localhost:5000/api/products?select=name,company,price > Not work , so for it 
update the selectFix>
let selectFix = select.split(",").join(" ");  
http://localhost:5000/api/products?select=name,company,price > check ,worked
