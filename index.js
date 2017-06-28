import mongoose from 'mongoose';

import config from './config/config';
import app from './config/express';

Promise = require('bluebird');

mongoose.Promise = Promise;

const mongoUri = config.mongo.host;
mongoose.connect(mongoUri, { server: { socketOptions: { keepAlive: 1 } } });
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

app.listen(config.port, () => {
  console.info(`server started on port ${config.port}`); // eslint-disable-line no-console
});

export default app;
