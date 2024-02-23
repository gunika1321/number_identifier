const express = require('express');
const http = require('http') ;
const path = require('path');
const helmet = require('helmet');
const Router = require('./routes/router');
const config = require('./config');
const https = require('https') 
const sequelize = require('./database');
const Contacts = require('./models/Contacts');
const ContactsMapping = require('./models/Contact_mapping');
const app = express();

app.use(helmet());
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', Router);

async function initializeServer(){
    // http.createServer(app).listen(config.PORT.HTTP,()=>{
    //     console.log("server listening on 80")
    // }); 
    https.createServer(app).listen(3000);
}

async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    // await sequelize.query('ALTER TABLE `contacts` ADD FULLTEXT INDEX `search_index` (`full_name`)');
    // await sequelize.query('CREATE INDEX ph_c_status_reg_index ON contacts (phone_number,country_code,is_registered, status)');

    console.log('Tables imported successfully');
  } catch (error) {
    console.error('Error in importing sequelize tables', error);
  }
}

initializeServer();
initializeDatabase();
