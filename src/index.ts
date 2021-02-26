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
  console.log('reqbody', req.body);
  let form = new FormData();
  form.append( 'cnic', req.body.cnic );
  axios.create({
    headers: form.getHeaders()
  }).post('http://103.240.220.76/kptraffic//license_verification/get_license_data', form).then((response: any) => {
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
