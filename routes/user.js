const { Router } = require('express');
const userRouter = Router();
const { userModel } = require('../db');
const { z } = require('zod')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


//signup
userRouter.post('/signup', async (req, res) => {

    const requiredBody = z.object({
        email: z.string().min(3).max(100).email(),
        password: z.string().min(3).max(30),
        firstName: z.string().min(3).max(100),
        lastName: z.string().min(3).max(100),
    });

    try {
        const parseDataWithSuccess = requiredBody.safeParse(req.body);

        if (!parseDataWithSuccess.success) {
            return res.status(400).json({
                message: "Incorrect Format!!",
                error: parseDataWithSuccess.error,
            });
        }

        const { email, password, firstName, lastName } = parseDataWithSuccess.data;

        // Check if the user with the given email already exists
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 5);

        await userModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName,
        });

        res.json({
            success: "Signed up successfully",
        });

    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            error: err.message,
        });
    }
});


// signin
userRouter.post('/signin', async (req, res) => {

    const signInSchema = z.object({
        email: z.string().min(3).max(100).email(),
        password: z.string().min(3).max(30),
    });

    const parseResult = signInSchema.safeParse(req.body);

    if (!parseResult.success) {
        return res.status(400).json({
            message: "Invalid input format",
            error: parseResult.error.errors,
        });
    }

    try {
        const { email, password } = parseResult.data;

        const user = await userModel.findOne({ email });

        if (!user) {
            res.status(401).json({
                message: "Invalid credentials",
            });
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (!result) {
                res.status(401).json({
                    message: "Wrong Password",
                });
            } else {
                let token = jwt.sign({
                    id: user._id,
                }, process.env.JWT_USER_SECRET);

                res.setHeader('token', token);

                res.json({
                    token
                });
            }
        });

    } catch (error) {
        res.status(401).json({
            message: "Something went Wrong"
        })
    }
});


// all courses purchases
userRouter.get('/purchases', (req, res) => {
    res.json({
        message: "get all purchase endpoint"
    });
});

module.exports = {
    userRouter: userRouter
}