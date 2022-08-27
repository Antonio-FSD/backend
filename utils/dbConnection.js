const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.DB_ACCESS}:${process.env.DB_ACCESS}@cluster0.eyjxb.mongodb.net/cinema`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(x => {
    console.log(`Conectado, dale duro a: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Negativo chaval, prueba otra vez', err)
  });

module.exports = mongoose;