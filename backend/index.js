const express = require('express');
const cors = require('cors');
const dns = require('dns'); // 1. Import dns
require('dotenv').config();

// 2. Force Node.js to use Google's DNS servers for SRV resolution
dns.setServers(['8.8.8.8', '8.8.4.4']);

const connectDB = require('./config/db');
const employeeRoutes = require('./routes/employeeRoutes');
const errorHandler = require('./middleware/errorHandler');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('API Connected'));
app.use('/api/employees', employeeRoutes);

// error handler must be registered last
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server active on port ${PORT}`));