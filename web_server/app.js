/*
 Routing 자체는 Front에서 진행 ( metemask 같은 browser wallet 사용시 용이 )
 get method 호출시 db에 있는 정보를 이용하여 return ( IPFS Hash 값을 이용하여 IPFS에 저장된 것도 Return)
 listener를 이용하여 contract 에서 발생한 event
 */

require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const api_db = require('./routes/routes');
const app = express();
const port = process.env.PORT || 3000;

// Node.js의 native promise를 사용
mongoose.Promise = global.Promise;


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.use('/api',api_db); // routing 처리
app.use('*', express.static('clientApp')); // const clientApp = path.join(__dirname, '../client/build')i

// CONNECT TO MONGODB SERVE
mongoose.connect('mongodb://localhost:27017/Database', { })
    .then(()=> console.log('Successfully connected to mongodb'))
    .catch(e => console.error(e));

app.listen(port, (err)=> {
    console.log(`SYSTEM: HTTP SERVER RUNNING ON ${port} PORT`);
});