/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import Env from '@ioc:Adonis/Core/Env'
import mongoose from 'mongoose'

//mongoose.connect(Env.get('MONGOOSE_URI'), { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connect(Env.get('MONGOOSE_URI2'), { useNewUrlParser: true, useUnifiedTopology: true })

.then(
    () => { console.log('MongoDB connected') },
    err => { console.log(err.reason) }
  );


