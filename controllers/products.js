const Product = require("../models/product")

const getAllProducts = async (req,res) =>{
    // const myData = await Product.find({ name:"iphone"})     //add filration & Searching 
    
    const { company,name,featured,sort,select }= req.query;
    const queryObject ={};

    if(company){
        queryObject.company = company;
        // console.log(queryObject.company);
    }
    if(name){
        // queryObject.name = name;
        queryObject.name = {$regex: name, $options: "i"};
    }
    if(featured){
        queryObject.featured = featured;
    }

    //sorting
    let apiData = Product.find(queryObject);
    if(sort){
        let sortFix = sort.replace(","," ");
        apiData = apiData.sort(sortFix);
    }
    //selecting
    if(select){
        // let selectFix = select.replace(","," ");      //but this only for 2 keyValue
        let selectFix = select.split(",").join(" ");
        apiData = apiData.select(selectFix);
    }
    
    console.log(queryObject)
  
    const myData = await apiData;
    res.status(200).json({myData});
}


const getAllProductsTesting = async(req,res)=>{
    // const myData = await Product.find({company:"apple"})
    const myData = await Product.find(req.query).sort("-name");   
    console.log(req.query);                                  

    res.status(200).json({myData});
}

module.exports={getAllProducts,getAllProductsTesting};