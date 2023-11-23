const WebSocket = require('ws');
const mongoose = require('mongoose');
const express = require('express');
const app = express();

// Модель для MongoDB
const DataSchema = new mongoose.Schema({ message: String });
const DataModel = mongoose.model('Data', DataSchema);

// Підключення до MongoDB
mongoose.connect('mongodb+srv://astas2286:Z33TtjfFMlwnGPDL@logifycluster.c7ezing.mongodb.net/');

// Підключення до WebSocket
const ws = new WebSocket('ws://75.119.151.220:12345');

ws.on('message', function incoming(data) {
  // Зберігання даних у MongoDB
  const newData = new DataModel({ message: data });
  newData.save();
});

// API для отримання даних
app.get('/data', async (req, res) => {
  const data = await DataModel.find({});
  res.json(data);
});

// Запуск сервера
app.listen(3000, () => console.log('Server running on port 3000'));
