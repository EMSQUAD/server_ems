require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const logger = require('morgan');
const bcrypt = require('bcrypt');
const User = require('./models/user.model');
const cors = require('cors');


// const jsonParser = bodyParser.json();

const app = express();
const port = 3000;
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(bodyParser.json());



const { userRouter } = require('./router/user.router');
app.use('/user', userRouter);

const { eventRouter } = require('./router/event.router');
app.use('/event', eventRouter);

const { messageRouter } = require('./router/message.router');
app.use('/messages', messageRouter);




app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
