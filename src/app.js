import createError from 'http-errors'
import express from 'express'
import routes from '~/routes'
import serverConfig from '~/configs/serverConfig'
require('dotenv').config();

const app = express();
serverConfig(app)

routes(app)

app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
