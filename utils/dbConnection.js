const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.MATLAS_USER}:${process.env.MATLAS_PASS}@cluster0.eyjxb.mongodb.net/test`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(x => {
    console.log(`Connected MongoDB, good luck with: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Connection error, try again.', err)
  });

 module.exports = mongoose;