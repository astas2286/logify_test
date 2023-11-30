const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({ message: String });
const DataModel = mongoose.model('Data', DataSchema);

const TruckSchema = new mongoose.Schema({
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
const TruckModel = mongoose.model('Truck', TruckSchema, 'test2');

module.exports = { DataModel, TruckModel };
