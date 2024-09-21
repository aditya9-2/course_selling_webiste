const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const { userRouter } = require('./routes/user');
const { courseRouter } = require('./routes/course');
const { adminRouter } = require('./routes/admin');

const dotenv = require('dotenv');
dotenv.config();


const port = process.env.PORT || 3000;
const dburl = process.env.DB_URL;


app.use('/api/v1/user', userRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/course', courseRouter);

const main = async () => {

    try {
        await mongoose.connect(dburl);
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`listening`);
        });
    } catch (err) {
        console.error('Error connecting to MongoDB', err);
    }

}
main();