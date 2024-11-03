const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const userModel = require('../models/user');


router.get('/register', (req, res) => {
    res.render('register');
});


router.post('/register',
    body('username').trim().isLength({ min: 3 }),
    body('email').trim().isEmail(),
    body('password').trim().isLength({ min: 5 }),
    async (req, res) => {
        const error = validationResult(req);
        
        if (!error.isEmpty()) {
            return res.status(400).json({
                error: error.array(),
                message: 'Invalid data'
            });
        }
        
        const { username, email, password } = req.body;
        
        try {
            const hashPassword = await bcrypt.hash(password, 10);
            console.log("Hash password:", hashPassword);

            const newUser = await userModel.create({
                email,
                username,
                password: hashPassword
            });

            res.json(newUser);
        } catch (err) {
            res.status(500).json({ message: 'Server error' });
        }
    }
);


router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login',
    body('email').trim().isEmail(),
    body('password').trim().isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: errors.array(),
                message: 'Invalid data'
            });
        }

        const { email, password } = req.body;

        try {
            const user = await userModel.findOne({ email });

            if (!user) {
                // console.log("User not found for email:", email);
                return res.status(400).json({ message: "Username or password is incorrect" });
            }


            const isMatch = await bcrypt.compare(req.body.password, user.password);
            // console.log("Password  result:", isMatch); 

            if (!isMatch) {
                return res.status(400).json({ message: "Username or password is incorrect" });
            } 

            // console.log("JWT Secret:", process.env.JWT_SECRET); 
            const token = jwt.sign(
                { userId: user._id, email: user.email, username: user.username },
                process.env.JWT_SECRET
            );

            res.cookie('token',token)
            res.send("Logged In Successfully !")
        } catch (err) {
            console.error("Error during login:", err);
            res.status(500).json({ message: 'Server error' });
        }
    }
);

module.exports = router;
