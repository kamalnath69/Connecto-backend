require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const Message = require('./models/messageModel'); // Import the message model

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// server.js
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('joinChat', ({ sender, recipient }) => {
    socket.join(`${sender}-${recipient}`);
    console.log(`${sender} joined chat with ${recipient}`);
  });

  socket.on('sendMessage', ({ sender, recipient, text }) => {
    // Emit the message to the chat rooms
    io.to(`${sender}-${recipient}`).emit('message', { sender, recipient, text, timestamp: new Date() });
    io.to(`${recipient}-${sender}`).emit('message', { sender, recipient, text, timestamp: new Date() });
  });

  socket.on('leaveChat', ({ sender, recipient }) => {
    socket.leave(`${sender}-${recipient}`);
    console.log(`${sender} left chat with ${recipient}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});


// Connect to the database
connectDB();

// Middleware
app.use(cors({
  origin: '*', // Allow requests from any origin
  methods: 'GET,POST,PUT,DELETE',
  credentials: true,
}));
app.use(express.json());

// Attach Socket.IO to the Express server
app.use((req, res, next) => {
  req.io = io;
  next();
});


// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/seeks', require('./routes/seekRoutes'));
app.use('/api/provides', require('./routes/provideRoutes'));
app.use('/api/pinned', require('./routes/pinnedRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/acceptedPosts', require('./routes/acceptedRoutes'));
app.use('/api/chats', require('./routes/chatRoutes')); // Add chat routes

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
