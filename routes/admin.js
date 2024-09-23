const { Router } = require('express');
const adminRouter = Router();
const { adminModel, courseModel } = require('../db');
const { z } = require('zod');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { adminMiddleware } = require('../middleware/admin')



//signup
adminRouter.post('/signup', async (req, res) => {

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
        const existingUser = await adminModel.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 5);

        await adminModel.create({
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
adminRouter.post('/signin', async (req, res) => {
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

        const user = await adminModel.findOne({ email });

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
                }, process.env.JWT_ADMIN_SECRET);

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

adminRouter.post("/course", async (req, res) => {
    const adminId = req.userId;

    const { title, description, imageUrl, price } = req.body;

    const course = await courseModel.create({
        title: title,
        description: description,
        price: price,
        imageUrl: imageUrl,
        creatorId: adminId
    })

    res.json({
        message: "Course created",
        courseId: course._id
    })
})

adminRouter.put("/course", async function (req, res) {
    const adminId = req.userId;

    const { title, description, imageUrl, price, courseId } = req.body;

    const course = await courseModel.updateOne({
        _id: courseId,
        creatorId: adminId
    }, {
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price
    })

    res.json({
        message: "Course updated",
        courseId: course._id
    })
})

adminRouter.get("/bulk", async function (req, res) {
    const adminId = req.userId;

    const courses = await courseModel.find({
        creatorId: adminId
    });

    res.json({
        message: "getting all Courses",
        courses
    })
})

module.exports = {
    adminRouter: adminRouter
}