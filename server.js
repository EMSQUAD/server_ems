require('dotenv').config();
const express = require('express');
// const dgram = require('dgram');
// const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const logger = require('morgan');
const bcrypt = require('bcrypt');
const User = require('./models/user.model');
// const FirebaseService = require('./db/FirebaseService');
const { Expo } = require('expo-server-sdk');
// const jsonParser = bodyParser.json();


const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
const expo = new Expo();

const http = require("http").Server(app);
const cors = require('cors');

app.use(cors());

const io = require('socket.io')(http, {
  cors: {
    origin: "<http://localhost:"+port+">"
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

// const { walkieRouter } = require('./router/walkie.router');
// app.use('/walkie', walkieRouter);

// app.post('/user', async (req, res) => {
//     const { id_use, password } = req.body;

//     try {
//         console.log('Received login request with id_use:', id_use);

//         const user = await User.findOne({ id_use });

//         console.log('Data retrieved from MongoDB:', user);

//         if (!user) {
//             return res.status(404).json({ success: false, message: 'User not found' });
//         }

//         const passwordMatch = await bcrypt.compare(password, user.password);

//         if (passwordMatch) {
//             // Include push tokens in the user data
//             const usersWithPushTokens = await User.find({ type_user: { $in: ['Comander', 'Solider'] }, push_token: { $exists: true } });
//             const usersData = usersWithPushTokens.map(u => ({
//                 _id: u._id,
//                 id_use: u.id_use,
//                 first_name: u.first_name,
//                 last_name: u.last_name,
//                 type_user: u.type_user,
//                 push_token: u.push_token
//             }));

//             return res.json({ success: true, message: 'Login successful', users: usersData });
//         } else {
//             return res.status(401).json({ success: false, message: 'Incorrect password' });
//         }
//     } catch (error) {
//         console.error('Error during authentication:', error);
//         return res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
// });

// app.post("/registerPushToken", jsonParser, async (req, res ) => {
//     const userId = String(req.body._id);
//     const token = String(req.body.token);
//     await FirebaseService.saveToken(userId, token);
//     res.status(200).send("success");
// });


// // New endpoint to send push notifications
// app.post('/sendNotification', async (req, res) => {
//     const { title, body } = req.body;

//     // Retrieve Expo Push Tokens from MongoDB for all users
//     const allUsers = await User.find({});
//     const allTokens = allUsers.map((user) => user.expoPushToken).filter(Boolean); // Filter out undefined/null tokens

//     // Prepare messages
//     const messages = allTokens.map((token) => ({
//         to: token,
//         sound: 'default',
//         title: title,
//         body: body,
//         data: { someData: 'goes here' },
//     }));

//     // Send push notifications
//     const chunks = expo.chunkPushNotifications(messages);
//     const tickets = [];

//     for (const chunk of chunks) {
//         try {
//             const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
//             tickets.push(...ticketChunk);
//         } catch (error) {
//             console.error(error);
//         }
//     }

//     res.json({ success: true, tickets });
// });






////test notification///////////
// Existing imports and setup code...

// // New endpoint to send push notifications to all soldiers
// app.post('/sendNotificationToSoldiers', async (req, res) => {
//     const { title, body } = req.body;

//     try {
//         // Find all soldiers
//         const allSoldiers = await User.find({ type_user: 'Soldier' });
//         const soldierTokens = allSoldiers.map((soldier) => soldier.expoPushToken).filter(Boolean);

//         if (soldierTokens.length === 0) {
//             return res.json({ success: false, message: 'No soldiers found' });
//         }

//         // Prepare messages
//         const messages = soldierTokens.map((token) => ({
//             to: token,
//             sound: 'default',
//             title: title,
//             body: body,
//             data: { someData: 'goes here' },
//         }));

//         // Send push notifications
//         const chunks = expo.chunkPushNotifications(messages);
//         const tickets = [];

//         for (const chunk of chunks) {
//             try {
//                 const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
//                 tickets.push(...ticketChunk);
//             } catch (error) {
//                 console.error(error);
//             }
//         }

//         res.json({ success: true, tickets });
//     } catch (error) {
//         console.error('Error sending notifications:', error);
//         res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
// });

// Existing code for other routes and server start...

// app.post('/sendNotificationToSoldiers', async (req, res) => {
//     const { title, body } = req.body;

//     try {
//       // Find all soldiers
//       const allSoldiers = await User.find({ type_user: 'Soldier', expoPushToken: { $exists: true } });

//       if (allSoldiers.length === 0) {
//         return res.json({ success: false, message: 'No soldiers found with push tokens' });
//       }

//       // Prepare messages
//       const messages = allSoldiers.map((soldier) => ({
//         to: soldier.expoPushToken,
//         sound: 'default',
//         title: title,
//         body: body,
//         data: { someData: 'goes here' },
//       }));

//       // Send push notifications
//       const chunks = expo.chunkPushNotifications(messages);
//       const tickets = [];

//       for (const chunk of chunks) {
//         try {
//           const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
//           tickets.push(...ticketChunk);
//         } catch (error) {
//           console.error(error);
//         }
//       }

//       res.json({ success: true, tickets });
//     } catch (error) {
//       console.error('Error sending notifications:', error);
//       res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
// });

// socket.bind(dgram_port);
// app.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });

http.listen(port, () => {
  console.log(`socket listening on http://localhost:${port}`);
});
