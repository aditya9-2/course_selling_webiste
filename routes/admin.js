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

adminRouter.post("/course", function (req, res) {
    res.json({
        message: "signup endpoint"
    })
})

adminRouter.put("/course", function (req, res) {
    res.json({
        message: "signup endpoint"
    })
})

adminRouter.get("/course/bulk", function (req, res) {
    res.json({
        message: "signup endpoint"
    })
})

module.exports = {
    adminRouter: adminRouter
}