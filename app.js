const WebSocket = require('ws');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

// Define a Mongoose schema for the data
const DataSchema = new mongoose.Schema({ message: String });
const DataModel = mongoose.model('Data',DataSchema);

// Connect to MongoDB
mongoose.connect('mongodb+srv://astas2286:Z33TtjfFMlwnGPDL@logifycluster.c7ezing.mongodb.net/')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:',err));

// Connect to WebSocket
const ws = new WebSocket('ws://75.119.151.220:12345');

ws.on('open',() => {

  console.log('Connected to WebSocket');
});

ws.on('message',function incoming(data) {
  try {
    const parsedData = JSON.parse(data.toLocaleString());
    console.log(parsedData.UTCTime.parsed);
    console.log("Received data:",parsedData);

    // Save data to MongoDB
    const newData = new DataModel({ message: data });
    newData.save()
      .then(() => console.log('Data saved to MongoDB'))
      .catch(err => console.error('Error saving data to MongoDB:',err));
  } catch (err) {
    console.error('Error processing incoming data:',err);
  }
});

ws.on('error',(error) => {
  console.error('WebSocket error:',error);
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

const truckSchema = new mongoose.Schema({
  _id: String,
  driverFirstName: String,
  driverLastName: String,
  id: String,
  companyName: String,
  supervisor: String,
  dispatcher: String,
  latitude: Number,
  longitude: Number,
  currentStatus: String,
  breakHours: String,
  driveHours: String,
  shifrHours: String,
  cycleHours: String,
  engineHours: Number,
  idleTime: Number,
  fuelLevel: Number,
  hoursWorkedToday: String,
  totalHoursSinceLastRestart: String,
  hoursAvailableTomorrow: String,
  currentSpeed: Number,
  time: String,
  VIN: String,
  unit: String,
  deviceNumber: String,
  yearOfProduction: Number,
  ELDserialNumber: String,
  odometer: Number,
  nextService: Number,
  address: String,
  fuelTankVolume: Number
});

const TruckModel = mongoose.model('Truck',truckSchema,'test2'); // The third argument 'test' is the collection name

// Connect to MongoDB
mongoose.connect('mongodb+srv://astas2286:Z33TtjfFMlwnGPDL@logifycluster.c7ezing.mongodb.net/')
  .then(() => {
    console.log('Connected to MongoDB');
    fetchFirstTruck();
  })
  .catch(err => console.error('Could not connect to MongoDB:',err));

  async function fetchFirstTruck() {
    try {
      const firstTruck = await TruckModel.findOne({ "id": "test" });
      if (firstTruck) {
        firstTruck.longitude = 25; // Змінюємо значення поля
        firstTruck.latitude = 15; // Змінюємо значення поля
        await firstTruck.save(); // Зберігаємо оновлення в базі даних
        console.log('Updated first truck document:', firstTruck);
      } else {
        console.log('No truck found with id "test"');
      }
    } catch (err) {
      console.error('Error fetching or updating data:', err);
    }
  }
 

// Start the server
app.listen(3000,() => console.log('Server running on port 3000'));
