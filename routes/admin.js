const { Router } = require('express');
const adminRouter = Router();

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

// all courses purchases
adminRouter.get('/purchases', (req, res) => {
    res.json({
        message: "get all purchase endpoint"
    });
});

adminRouter.get('/purchases', (req, res) => {
    res.json({
        message: "get all purchase endpoint"
    });
});

module.exports = {
    adminRouter: adminRouter
}