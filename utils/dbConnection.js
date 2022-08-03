const mongoose = require('mongoose');


mongoose.connect(`mongodb+srv://${process.env.MATLAS_USER}:${process.env.MATLAS_PASS}@cluster0.hda78.mongodb.net/test`, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(x => {
    console.log(`¡Conectado a MongoDB!, estás usando "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error al conectar con mongo', err)
  });

 module.exports = mongoose;