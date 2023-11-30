require('dotenv').config();
const WebSocket = require('ws');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

// Mongoose models and schemas (винести в окремі файли якщо потрібно)
const { DataModel,TruckModel } = require('./models/models');

// Connect to MongoDB
mongoose.connect(`mongodb+srv://astas2286:${process.env.MONGODB_PASSWORD}@logifycluster.c7ezing.mongodb.net/`)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:',err));

// WebSocket setup
const ws = new WebSocket('ws://75.119.151.220:12345');

ws.on('open',() => console.log('Connected to WebSocket'));
ws.on('error',(error) => console.error('WebSocket error:',error));

ws.on('message',async (data) => {
  try {
    const parsedData = JSON.parse(data.toLocaleString());
    console.log("Received data:",parsedData);

    const testTruck = await TruckModel.findOne({ id: "test" });
    if (testTruck) {
      testTruck.longitude = parsedData.longitude.parsed;
      testTruck.latitude = parsedData.latitude.parsed;
      await testTruck.save();
      console.log('Updated first truck document:',testTruck.longitude,testTruck.latitude);
    }

    // Save data to MongoDB
    await new DataModel({ message: data }).save();
    console.log('Data saved to MongoDB');
  } catch (err) {
    console.error('Error processing incoming data or saving to MongoDB:',err);
  }
});

// API endpoint to retrieve data
app.get('/data',async (req,res) => {
  try {
    const data = await DataModel.find({});
    res.json(data);
  } catch (err) {
    res.status(500).send('Error retrieving data from MongoDB');
  }
});

// Start the server
app.listen(3000,() => console.log('Server running on port 3000'));
