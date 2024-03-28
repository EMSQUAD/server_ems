require('dotenv').config();
const express = require('express');
// const dgram = require('dgram');
const bodyParser = require('body-parser');
// const fetch = require('node-fetch');
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


const http = require("http").Server(app);
// const cors = require('cors');



const io = require('socket.io')(http, {
  cors: {
    origin: "<http://localhost:3000>"
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








// const socket = dgram.createSocket('udp4');
// const dgram_port = 3001;
// console.log('UDP Server listening on ' + dgram_port + " " + socket.address().port);

var subscribers = [];

// socket.on('close', () => {
//   console.log('UDP Server closed');
// });

// socket.on('error', (err) => {
//   console.log('UDP Server error:\n' + err.stack);
//   socket.close();
// });

// socket.on('listening', () => {
//   var address = socket.address();
//   console.log('UDP Server listening on ' + address.address + ":" + address.port);
// });

// socket.on('message', (message, remote) => {
//   console.log(remote.address + ':' + remote.port + ' - ' + message);
//   if (!subscribers.includes(remote)) {
//     subscribers.push(remote);
//   }
//   subscribers.filter((sub) => sub !== remote).forEach((sub) => {
//     console.log('Sending to ' + sub.address + ':' + sub.port);
//     socket.send(message, sub.port, sub.address);
//   });
// });

// socket.addListener('connect', () => {
//   console.log('connected');
//   subscribers.push(remote);
//   console.log(subscribers);

// });


// socket.on('subscribe', (message, remote) => {
//   console.log("su asdsadadb" + remote.address + ':' + remote.port + ' - ' + message);
// });

// socket.on('unsubscribe', (message, remote) => {
//   console.log(remote.address + ':' + remote.port + ' - ' + message);
//   subscribers = subscribers.filter((sub) => sub.address !== remote.address);
// });








const { userRouter } = require('./router/user.router');
app.use('/user', userRouter);

const { eventRouter } = require('./router/event.router');
app.use('/event', eventRouter);


const { messageRouter } = require('./router/message.router');
app.use('/messages', messageRouter);
// const { walkieRouter } = require('./router/walkie.router');
// app.use('/walkie', walkieRouter);




app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
