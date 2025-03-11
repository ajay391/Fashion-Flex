const express = require('express');
const Products = require('./products.model');
const Reviews = require('../reviews/reviews.model');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');
const router = express.Router();

// 
router.post("/create-product" , async(req, res) => {
    try{
        const newProduct = new Products({
            ...req.body
        })

        const savedProduct = await newProduct.save();

        // calculate reviews
        const reviews = await Reviews.find({productId:savedProduct._id});
        if(reviews.length > 0 ){
            const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
            const averageRating = totalRating / reviews.length;
            savedProduct.rating = averageRating;
            await savedProduct.save();
        }
        res.status(201).send(savedProduct)
    }catch(error){
        console.error("products not saved", error);
        res.status(500).send({message:"Failed to creating new product"})
    }
})
// 
router.get("/" , async(req, res) => {
    try{
        const {category, color, minPrice, maxPrice, page=1, limit = 10} = req.query
        let filter = {};
        if(category && category !== "all"){
            filter.category = category;
        }
        if(color && color !== "all"){
            filter.color = color;
        }
        if(minPrice && maxPrice){
            const min = parseFloat(minPrice);
            const max = parseFloat(maxPrice);
            if(!NaN(min) && !NaN(max)){
                filter.price = {$gte: min, $lte:max};
            }
        }
        const skip = (parseInt(page) - 1) * parseInt(limit);
        const totalProducts = await Products.countDocuments(filter);
        const totalPages = Math.ceil(totalProducts / parseInt(limit));
        const products = await Products.find(filter)
        .skip(skip)
        .limit(parseInt(limit))
        .populate("author", "email")
        .sort({createdAt: -1});

        res.status(200).send({products, totalPages, totalProducts})
    }catch(error){
        console.error("Error fetching products", error);
        res.status(500).send({message:"Error while fetching products"})
    }
})

// get single products

router.get("/:id", async (req, res) => {
    try{
        const productId = req.params.id
        const product = await Products.findById(productId).populate("author", "email username");
        if(!product){
            return res.status(404).send({message: "product not found"});
        }
        const reviews = await Reviews.find({productId}).populate("userId", "username email");
        res.status(200).send({product, reviews})
    }catch(error){
        console.error("Error Fetching the product", error);
        res.status(500).send({message:"Error Fetchin the product"})
    }
})

router.patch("/update-product/:id", verifyToken, verifyAdmin, async (req, res) => {
    try{

        const productId = req.params.id

        const updateProduct = await Products.findByIdAndUpdate(productId, {...req.body}, {new:true})
        if(!updateProduct){
            res.status(404).send({message: "product not found"});
        }
        
        res.status(200).send({message:"Product updated successfully", product: updateProduct})
        
    }catch(error){
        console.error("Error Fetchin the product", error);
        res.status(500).send({message:"Error Fetchin the product"})
    }
})

router.delete("/:id", async (req, res) => {
    try{

       const productId = req.params.id;
       const deletedProduct = await Products.findByIdAndDelete(productId);
       if(!deletedProduct) {
        return res.status(404).send({message: "product not Found"})
       }
       await Reviews.deleteMany({productId: productId})
       res.status(200).send({message:"Product deleted successfully"})
    }catch(error){
        console.error("Error Deleteing the product", error);
        res.status(500).send({message:"Error Deleteing the product"})
    }
})

router.get("/related/:id", async (req, res) => {
    try{
       const id = req.params.id;
       if(!id){
        return res.status(400).send({message: "product ID required"})
       }
      const product = await Products.findById(id);
      if(!product){
        return res.status(404).send({message: "product not Found"})
      }

      const titleRegex = new RegExp(
        product.name.split("").filter((word)=> word.length > 1).join("|"),"i"
      );
      const relatedProducts = await Products.find({
        _id: {$ne :id},
        $or :[
            {name: {$regex: titleRegex}},
            {category: product.category}
        ]
      })

      res.status(200).send({relatedProducts})

    }catch(error){
        console.error("Error fetching related products", error);
        res.status(500).send({message:"Error fetching related products"})
    }
})






module.exports = router;