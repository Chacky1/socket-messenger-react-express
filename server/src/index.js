require('dotenv').config();
const cors = require('cors');
const express = require('express');

const app = express();
const httpServer = require('http').createServer(app);

const io = require('socket.io')(httpServer, {
  cors: '*',
});

const registerMessageHandler = require('./messages/messages.handler');
const usersRouter = require('./users/users.routes');
const authRouter = require('./auth/auth.routes');
const messagesRouter = require('./messages/messages.routes');
const roomsRouter = require('./rooms/rooms.routes');

const port = process.env.PORT || 5000;

app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));

app.use('/api/users', usersRouter);
app.use('/api/auth', authRouter);
app.use('/api/messages', messagesRouter);
app.use('/api/rooms', roomsRouter);

const onConnection = (socket) => {
  console.log('client connected');
  registerMessageHandler(io, socket);
};

io.on('connection', onConnection);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
