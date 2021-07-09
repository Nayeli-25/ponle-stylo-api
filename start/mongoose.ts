/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import mongoose from 'mongoose'

//mongoose.connect('mongodb://localhost/PonleStylo', { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connect('mongodb+srv://nayeli:123@sandbox.bespd.mongodb.net/PonleStylo?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

.then(
    () => { console.log('MongoDB connected') },
    err => { console.log(err.reason) }
  );


