import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('hey');
});


const port = 3000;
app.listen(port, () => {
  console.info(`listening on port ${port}`);
});
