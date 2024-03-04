require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const logger = require('morgan');
const bcrypt = require('bcrypt');
const User = require('./models/user.model');
const cors = require('cors');


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

app.post('/user', async (req, res) => {
    const { id_use, password } = req.body;

    try {
        console.log('Received login request with id_use:', id_use);

        const user = await User.findOne({ id_use });

        console.log('Data retrieved from MongoDB:', user);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            // Include push tokens in the user data
            const usersWithPushTokens = await User.find({ type_user: { $in: ['Comander', 'Solider'] }, push_token: { $exists: true } });
            const usersData = usersWithPushTokens.map(u => ({
                _id: u._id,
                id_use: u.id_use,
                first_name: u.first_name,
                last_name: u.last_name,
                type_user: u.type_user,
                push_token: u.push_token
            }));

            return res.json({ success: true, message: 'Login successful', users: usersData });
        } else {
            return res.status(401).json({ success: false, message: 'Incorrect password' });
        }
    } catch (error) {
        console.error('Error during authentication:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// let recordedAudio = null;

// app.post('/startRecording', (req, res) => {
//     console.log('Recording started...');
//     res.sendStatus(200);
// });

// app.post('/startRecording', (req, res) => {
//     console.log('Recording started...');
//     res.sendStatus(200);
// });

// app.post('/stopRecording', (req, res) => {
//     console.log('Recording stopped.');
//     recordedAudio = req.body.audioData;
//     res.sendStatus(200);
// });

// app.get('/getRecordedAudio', (req, res) => {
//     if (recordedAudio) {
//         res.send({ audioData: recordedAudio });
//     } else {
//         res.status(404).send('No recorded audio available');
//     }
// });

// app.post('/sendAudioMessage', async (req, res) => {
//     const { channelId, authToken } = req.body;
//     const audioData = recordedAudio; // Get recorded audio data from the previous requests

//     if (!channelId || !authToken || !audioData) {
//         return res.status(400).send('Missing channelId, authToken, or audioData');
//     }

//     try {
//         const response = await fetch('https://api.zellowork.com/v1/channels/' + channelId + '/audio_message', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'audio/x-wav',
//                 'Authorization': 'Bearer ' + authToken
//             },
//             body: audioData
//         });

//         if (response.ok) {
//             res.sendStatus(200);
//         } else {
//             const data = await response.json();
//             res.status(response.status).send(data);
//         }
//     } catch (error) {
//         console.error('Failed to send audio message:', error);
//         res.status(500).send('Failed to send audio message');
//     }
// });

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
