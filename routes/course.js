const { Router } = require('express');
const courseRouter = Router();


// purchase a course
courseRouter.post('/purchase', (req, res) => {

    res.json({
        message: "post purchase endpoint"
    });

});

// get all courses
courseRouter.get('/preview', (req, res) => {

    res.json({
        message: "get purchase preview endpoint"
    });

});

module.exports = {
    courseRouter: courseRouter
}
