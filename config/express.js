import express from 'express';
// import bodyParser from 'body-parser';

import routes from '../server/routes'

const app = express();

app.use('/', routes);

app.use((req, res, next) => {
  res.status(404)
    .json({ 'error': 'NOT FOUND' });
});

export default app;
