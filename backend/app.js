const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const medicamentRoute = require('./route/medicamentRoute');

const app = express();

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use('/api/medicaments', medicamentRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
