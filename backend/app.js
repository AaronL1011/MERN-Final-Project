require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

const uploadRoute = require('./routes/image-upload');

// Allow passing JSON objects and Cross Origin Resource Sharing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Initial routes
app.use('/', uploadRoute);
app.get('/', (req, res) => {
  res.send('Root directory');
});

// Initialise database connection
mongoose.connect(
  process.env.DB_CONNECTION,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log('Database connected okay.');
  }
);

// Define port for server to listen on
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Listening on port ${PORT}`));
