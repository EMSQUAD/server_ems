require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
// const fetch = require('node-fetch');
// const uuid = require('uuid');
const logger = require('morgan');
// const User = require('../models/user.model');

// const User = require('./models/user.model');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));


const {userRouter} = require('./router/user.router');
app.use('/user', userRouter);

const{eventRouter}=require('./router/event.router');
app.use('/event',eventRouter);





app.use(bodyParser.json());





app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

