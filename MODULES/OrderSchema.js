const mongoose = require('mongoose');

const orderSchema   = mongoose.Schema({

        order_id:{
            type            :Number,
            default:0
        },
        user_id:{
            type            :Number,
            required:true
        },
        prod_name:{
            type : String,
            required:true
        },
        quantity:{
            type:Number,
        },
        order_date:{
            type            : Date , default  : new Date()
        },
        total_amount:{
            type            : Number ,
            required:true
        },
        shipping_addr:{
            type            :String,
            required:true
        },
        order_dis:{
            type:String,
        
        },
        brand_name:{
            type:String,
            require:true
        },
        order_status:{
            type : Number  ,default : 0,
            ENUM:[0,1,2]  ,// pandding  // Success  // rejected 
            required:true
            },
        payment_method:{
            type           : String    ,required     : true      //[cash on delivery/online payemnt]
        }
    },
    
    { timestamps:true}
    
    
    );

    orderSchema.pre('save', async function (next) {
        const orders = this;
    
        if (!orders.isNew) {
            return next(); // Only auto-increment for new documents
        }
    
        try {
            const lastProduct = await order.findOne().sort({ order_id: -1 }).exec();
            if (lastProduct) {
                orders.order_id = lastProduct.order_id + 1;
            } else {
                orders.order_id = 1; // Initial value
            }
            next();
        } catch (error) {
            next(error);
        }
    });

// module.exports = mongoose.model('order' ,orderSchema);
const order = mongoose.model('order', orderSchema);

module.exports = order;
