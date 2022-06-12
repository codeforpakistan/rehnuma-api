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
  res.status(200).send('api active');
});

app.get('/get-license/:cnic', (req, res) => {
  axios.create().get(`${process.env.License_API}?key=${process.env.License_API_KEY}&search=${req.params.cnic}`).then((response: any) => {
    res.status(200).json(response.data);
  }).catch((error: any) => {
    res.status(500).json(error);
    console.error('erorr', error.message);
  });
});

app.get('/challan-info/:number', (req, res) => {
  try {
    axios.create().get(`${process.env.RABTA_API}/getchallandetail?ChallanNo=${req.params.number}`).then((response: any) => {
      if (response.data.name === 'Error') {
        return res.status(500).json(response.data);
      }
      return res.status(200).json(response.data);
    }).catch((error: any) => {
      res.status(500).json(error);
      console.error('erorr', error.message);
    });
  } catch(err) {
    console.error('err', err);
    res.status(500).send(err);
  }
});

app.get('/live-traffic-updates/:roadName', (req, res) => {
  try {
    console.log('roadName', req.params.roadName);
    axios.create().get(`${process.env.LIVE_TRAFFIC_UPDATE_API}/live_updates/get_updates?flag=${req.params.roadName}`).then((response: any) => {
      return res.status(200).json(response.data);
    }).catch((error: any) => {
      res.status(500).json(error);
      console.error('erorr', error.message);
    });
  } catch(err) {
    console.error('err', err);
    res.status(500).send(err);
  }
});

app.post('/renew-lisence', (req, res) => {
  try {
    // make the call to govt api
    // get response -- maybe transform the response to your liking?
    // return
  } catch(err) {
    console.error('err', err);
    res.status(500).send(err);
  }
});

const port = 3000;
app.listen(port, () => {
  console.info(`listening on port ${port}`);
});
