const express = require('express');
const router = express.Router();
const Product = require('./../MODULES/ProductSchema');

router.get('/test',(req,res)=>{

    res.json({message:`your router test api working`})

});
router.post('/create',async (req,res)=>{
    try{
        const {prod_name , prod_price ,brand_name ,hsn ,quantity } = req.body;

    const Product1 = new Product({
                    prod_name,
                    prod_price,
                    brand_name,
                    hsn,
                    quantity            
    })
    

    await Product1.save();
    res.status(201).json({
        data:Product1
    });

    }catch(error){
        resres.status(500).json({
            message:error
        });
    }
});

router.put('/update/:id' , async (req,res)=>{
       try
       {
             const {prod_name , prod_price , brand_name , hsn , quantity} = req.body;
            const updateProduct = await Product.findByIdAndUpdate(req.params.id , {


                    prod_name,
                    prod_price,
                    brand_name,
                    hsn,
                    quantity
            },{
                new:true    
            });
    
        if(!updateProduct){
            return  res.status(404) . json ({message:'your product is not found'});
            }
            const product  = await Product.findById(req.params.id);
            res.status(201).json({data: product, 
                message:'your product is updated'});
       }
       catch(error)
       {
            res.status(500).json({message:error.message});
       }
});


router.delete('/delete/:id', async(req,res)=>{

        try
        {
            const deleteProduct = await Product.findByIdAndDelete(req.params.id);

            if(!deleteProduct){
                return  res.status(404) . json ({message:'your product is not found'});
                }
                res.status(201).json({ 
                                            message:'your product is Deleted'
                });
        }
            catch(error)
            {
                res.status(500).json({
                    message:error.message
                });
            }
    
});

router.get('/productlist' ,async (req,res)=>{
   try
    {
            const productlist = await Product.find();
            res.status(201).json({
                data:productlist
            });

    }
    catch(error){

        res.status(500).json({
            message : error
        });
   }
});
router.get('/productlist/:id' ,async (req,res)=>{
    try
     {
             const singleProduct = await Product.findById(req.params.id);

             if(!singleProduct){
                return   res.status(404 ).json({message:"your id is not found"});
             }
             res.status(201).json({
                 data:singleProduct
             });
 
     }
     catch(error){
 
         res.status(500).json({
             message : error.message
         });
    }
 });

module.exports = router;
