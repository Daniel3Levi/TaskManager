const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
app.use(express.static('./public'));

app.use(express.json());

// routes

app.use('/api/v1/tasks', tasks);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.use(notFound);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5001;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log('***Connected to MongoDB***');

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
