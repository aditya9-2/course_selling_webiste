const express = require('express');
const { userRouter } = require('./routes/user');
const { courseRouter } = require('./routes/course');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;


app.use('/user', userRouter);
app.use('/course', courseRouter)



app.listen(port, () => {
    console.log(`listening`);
})