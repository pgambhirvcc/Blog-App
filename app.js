// ES5 Version
const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const mongoose = require('mongoose');
const morgan = require('morgan');

require('dotenv').config();

// This is kind of logger mechanism which tells us which api and their status code were called from the client
app.use(morgan('dev'));

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log('Database connected....');
}).catch((error) => {
    console.log('There was an error connecting database' + error);
})

app.get('/', (request, response) => {
    response.send('API ENDPOINTS')
})

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});