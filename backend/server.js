const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const elephantRoutes = require('./routes/elephantRoutes');
app.use('/api/elephants', elephantRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
