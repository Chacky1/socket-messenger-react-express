require('dotenv').config();
const cors = require('cors');
const express = require('express');
const usersRouter = require('./users/users.routes');

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));

app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
