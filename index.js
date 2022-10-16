const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRouter = require('./routes/authRoute');
const borrowRouter = require('./routes/borrowRoute');
const corsConfig = require('./config/corsConfig');
dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    limit: '30mb',
    extended: true,
  })
);
app.use(cors(corsConfig));

app.use('/auth', authRouter);
app.use('/borrow', borrowRouter);

app.get('/', (req, res) => {
  res.send('YouPay Backend is running');
});

const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 6000;

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
  .catch((err) => console.log(err));
