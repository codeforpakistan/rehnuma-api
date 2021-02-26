require('dotenv').config();
import express from 'express';
import bodyParser =  require('body-parser');
var cors = require('cors');
var axios = require('axios');
const app = express();
const FormData = require('form-data');

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).send('hey');
});

app.post('/get-license', (req, res) => {
  axios.create().get(`${process.env.License_API}?key=${process.env.License_API_KEY}&search=${req.body.cnic}`).then((response: any) => {
    res.status(200).json(response.data);
  }).catch((error: any) => {
    res.status(500).json(error);
    console.error('erorr', error.message);
  });
});

const port = 3000;
app.listen(port, () => {
  console.info(`listening on port ${port}`);
});
