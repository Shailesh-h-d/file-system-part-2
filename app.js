var express = require('express');
var app = express();
var cors = require('cors');
var dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());
app.search(cors());
const router = require('./router');
app.use('/api', router);

app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
});