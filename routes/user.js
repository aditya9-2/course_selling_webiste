const { Router } = require('express');
const userRouter = Router();

const { userModel } = require('../db');

//signup
userRouter.post('/signup', (req, res) => {

    res.json({
        message: "signup endpoint"
    });


});

// signin
userRouter.post('/signin', (req, res) => {
    res.json({
        message: "sign endpoint"
    });

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