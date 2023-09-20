const express = require('express');
const router = express.Router();
const User  = require('./../MODULES/UserSchema');


router.get('/' , async (req,res)=>{    
    try{

        const userDetails = await User.find();

        if (userDetails.length === 0) { 
            
            return res.status(404).json({
                message: 'No users exist in the database',
            });
        } 
        else
        {
            res.status(202).json({
                data:userDetails
            }); 
        }
       
    }catch(error){

        res.status(500).json({
            message:error.message
        });
        
    }
});

router.post('/', async (req,res)=>{
    try {

        
    const {user_name , user_adderss ,user_email , password} = req.body; 

    const emailExists = await User.findOne({ user_email });

    if (emailExists) {
        return res.status(400).json({
            message: 'Email already used',
        });
    }

    const Users = new User({

        user_name , user_adderss ,user_email , password

    });

    await Users.save();

    res.status(202).json({
        message:"user created successfully" ,
        data:Users
    });

    }catch(error){


        res.status(500).json({

            error:error.message

        });


    }

});


module.exports=router;