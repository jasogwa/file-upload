import express, { Application } from 'express';
const cors = require('cors');
const bodyParser = require('body-parser');
import indexRoutes from './routes/index';

const app: Application = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// create express app
app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
    bodyParser.urlencoded({
        extended: true,
        'Content-Type': 'application/x-www-form-urlencoded'
    })
);
app.use(express.static(__dirname)); //resolve base url
app.use('/uploads', express.static('uploads'));

// parse requests of content-type - application/json
app.use(bodyParser.json());

//Routes
app.use(indexRoutes);

app.listen(3000);
console.log('Server running on Port 3000');
