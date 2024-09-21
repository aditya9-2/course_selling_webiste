const { Router } = require('express');
const adminRouter = Router();
const { adminModel } = require('../db');

//signup
adminRouter.post('/signup', (req, res) => {

    res.json({
        message: "signup endpoint"
    });


});

// signin
adminRouter.post('/signin', (req, res) => {
    res.json({
        message: "sign endpoint"
    });

});

adminRouter.post("/", function (req, res) {
    res.json({
        message: "signup endpoint"
    })
})

adminRouter.put("/", function (req, res) {
    res.json({
        message: "signup endpoint"
    })
})

adminRouter.get("/bulk", function (req, res) {
    res.json({
        message: "signup endpoint"
    })
})

module.exports = {
    adminRouter: adminRouter
}