require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const logger = require('morgan');
const bcrypt = require('bcrypt');
const User = require('./models/user.model');
const cors = require('cors');
const FirebaseService = require('./db/FirebaseService');
const { Expo } = require('expo-server-sdk');
// const jsonParser = bodyParser.json();

const app = express();
const port = 3000;
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(bodyParser.json());
const expo = new Expo();


const { userRouter } = require('./router/user.router');
app.use('/user', userRouter);

const { eventRouter } = require('./router/event.router');
app.use('/event', eventRouter);

const { messageRouter } = require('./router/message.router');
app.use('/messages', messageRouter);

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


// New endpoint to send push notifications
app.post('/sendNotification', async (req, res) => {
    const { title, body } = req.body;

    // Retrieve Expo Push Tokens from MongoDB for all users
    const allUsers = await User.find({});
    const allTokens = allUsers.map((user) => user.expoPushToken).filter(Boolean); // Filter out undefined/null tokens

    // Prepare messages
    const messages = allTokens.map((token) => ({
        to: token,
        sound: 'default',
        title: title,
        body: body,
        data: { someData: 'goes here' },
    }));

    // Send push notifications
    const chunks = expo.chunkPushNotifications(messages);
    const tickets = [];

    for (const chunk of chunks) {
        try {
            const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
            tickets.push(...ticketChunk);
        } catch (error) {
            console.error(error);
        }
    }

    res.json({ success: true, tickets });
});



app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
