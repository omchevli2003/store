const express = require('express');
const bodyParser = require('body-parser')
const core = require('cors');
const app = express();
const PORT = 3000;
const user = require('./MODULES/login');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('./MODULES/db');
require('dotenv').config();
app.use(bodyParser.json());
app.use(core());


function Authentication(req, res, next) {

    const token = req.headers.authorization.split(' ')[1];
    const { id } = req.body;
    // res.json({token});
    if (!token) { res.status(401).json({ message: "token not found" }) }

    try {
        const decoded1 = jwt.verify(token, process.env.JET_SCREAT_KEY);
        if (id && decoded1.id !== id) {
            return res.status(500).json({ message: "Enter Correct id" });
        }

        next();
    } catch (error) {

        res.status(500).json({ message: "try block erro is getting !!" });
    }
}

app.get('/', (req, res) => {
    res.send("hello im connect with om what im helping you !!");
});

app.post('/register', async (req, res ,next) => {


    try {

        const { username, email, password, age, gender } = req.body;

        const exsistUser = await user.findOne({ email });
        if (exsistUser) {
            // res.status(409).json({
            //     message: 'Email already exist !'
            // })
            const error = new Error('Email already exist !');
            next(error)

        }


        const exsistUsername = await user.findOne({ username });
        if (exsistUsername) {
            res.status(409).json({
                message: 'User already exist !'
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);
        console.log(hashpassword);
        const newUser = new user({
            username,
            email,
            password: hashpassword,
            age,
            gender
        })
        await newUser.save();
        res.status(201).json({
            message: "User Sccessfully installed"
        })

    } catch (error) {
            next(error);
    }

});

app.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body
        const exsistUser = await user.findOne({ email });
        if (!exsistUser) {
            res.status(401).json({
                message: 'Email and Password Not Matched !'
            })
        }
        console.log(exsistUser);
        const isPasswordConfirm = await bcrypt.compare(password, exsistUser.password)


        if (isPasswordConfirm) {

            const token = jwt.sign({ id: exsistUser._id }, process.env.JET_SCREAT_KEY, { expiresIn: '1h' });

            res.status(201).json({
                token: token
            })
        } else {

            res.status(401).json({
                message: "Your Password Not Matched"
            })
        }

    }
    catch (error) {

    }

});

app.post('/userProfile', Authentication, async (req, res) => {
    const { id } = req.body;
    const userdetails = await user.findById(id);
    userdetails.password = undefined;
    res.status(201).json({ userdetails });
})

// error handlling code 

app.use((err , req , res , next)=>{

    console.log('your middleware error solve  '+err );

    res.json({message:err.message});
    next()

})

app.listen(PORT, () => {

    console.log("Your System Is Connected Nodejs Server Services");

});
