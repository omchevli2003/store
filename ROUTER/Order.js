const express = require('express');
const router = express.Router();
const order = require('../MODULES/OrderSchema');
const inventory = require('../MODULES/InventorySchema');
router.get('/test',(req,res)=>{

    res.status(201).json({message:`your router test api working`})

});

router.post('/create' , async (req,res)=>{

    try{

        const { order_id, user_id, order_date , total_amount,shipping_addr , prod_name ,order_dis ,brand_name ,  payment_method , order_status}  = req.body ;

        const Order = new order({
            order_id, 
            user_id,   
            order_date , 
            total_amount,   
            prod_name,
            shipping_addr, 
            order_dis,
            brand_name,
            order_status,
            payment_method
            }); 

        await Order.save();

        

        res.status(201).json({
            data:Order
        })

    }
    catch(error){
    
        res.status(404).json({
            message : error.message
        });

    }




});



router.put('/update/:id', async (req, res) => {
    try {
        const {
            order_date,
            total_amount,
            user_id,
            shipping_addr,
            prod_name,
            order_dis,
            brand_name,
            payment_method,
            order_status
        } = req.body;

        // Validate the input data here if needed

        const updatedOrder = await order.findByIdAndUpdate(
            req.params.id, {
                order_date,
                total_amount,
                shipping_addr,
                prod_name,
                user_id,
                order_dis,
                brand_name,
                order_status,
                payment_method,
            }, {
                new: true,
            }
        );

        if (!updatedOrder) {
            return res.status(404).json({
                message: 'Order not found'
            });
        }

        if (order_status === 1) {
            const foundData = await order.findById(req.params.id);
            console.log(foundData);

            const inventoryData = new inventory({
                user_id: foundData.user_id,
                total_amount: foundData.total_amount,
                prod_name: foundData.prod_name,
                shipping_addr: foundData.shipping_addr,
                order_dis: foundData.order_dis,
                brand_name: foundData.brand_name,
                payment_method: foundData.payment_method,
                order_status:foundData.order_status 
            });

            await inventoryData.save();
        }

        res.status(200).json({
            data: updatedOrder,
            message: 'Order updated successfully'
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred while updating the order',
            error: error.message,
        });
    }
});




router.delete('/delete/:id' ,async (req,res)=>{

        try{

                const deleteOrder = await order.findByIdAndDelete(req.params.id); 

                if(!deleteOrder){

                    res.status(404).json({message:'your id Is Invalid'});

                }

                res.status(201).json({

                    message:"Your Order Is Remove Succesfully"

                });


        }catch(error){


            res.status(500).json({
                message:"Your id is Not Found "
            });
        }
})

router.get('/getallOrder', async (req,res)=>{

        try{

            const readOrder = await order.find();
            res.status(201).json({
    
                data:readOrder
            
            });

        }catch(error){

            res.status(404).json({
                message:"No Data Found"
            });

        }
});

router.get('/getallOrder/:id', async (req, res) => {
    try {
      const singleOrder = await order.findById(req.params.id);
  
      if (!singleOrder) {
        // Use a 404 status code for "Not Found"
        return res.status(404).json({
          message: 'Order not found'
        });
      }
  
      // Use a 200 status code for a successful response
      res.status(200).json({
        data: singleOrder
      });
    } catch (error) {
      // Use a 500 status code for server errors
      res.status(500).json({
        message: 'Internal server error'
      });
    }
  });
  




module.exports = router;