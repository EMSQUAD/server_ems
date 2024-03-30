require('dotenv').config();
const express = require('express');const bodyParser = require('body-parser');
// const fetch = require('node-fetch');
const logger = require('morgan');
const bcrypt = require('bcrypt');
const User = require('./models/user.model');


// const jsonParser = bodyParser.json();
const app = express();
const port = 3000;
const s_port = 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(bodyParser.json());


const http = require("http").Server(app);
const cors = require('cors');

app.use(cors());

const io = require('socket.io')(http, {
  cors: {
    origin: "<http://localhost:"+s_port+">"
  }
});

//👇🏻 Add this before the app.get() block
io.on('connection', (socket) => {
  socket.emit('test', 'Hello, World!');
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on('cmessage', (message) => {
    console.log('📩: Message received:', message);
    socket.broadcast.emit('smessage', message);
  });
 
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });
});

const { userRouter } = require('./router/user.router');
app.use('/user', userRouter);

const { eventRouter } = require('./router/event.router');
app.use('/event', eventRouter);

// socket.bind(dgram_port);
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

http.listen(s_port, () => {
  console.log(`socket listening on http://localhost:${s_port}`);
});
