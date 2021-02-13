const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/tumblr-lab-dev';

mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log(`Successfully connected to the database ${MONGODB_URI}`))
  .catch((error) => {
    console.error(`An error ocurred trying to connect to the database ${MONGODB_URI}: `, error);
    process.exit(1);
  });

process.on('SIGINT', () => {
  mongoose.connection
    .close()
    .then(() => console.log('Mongoose default connection disconnected through app termination'))
    .catch(error => console.log('Error disconnecting from the database', error))
    .finally(() => process.exit());
})