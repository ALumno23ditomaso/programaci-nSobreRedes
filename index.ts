import express from 'express';
import * as swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from './swagger' 
const app: express.Application = express();
import { MPersonas } from './metodosPersonas';
import { MConsumoXFecha } from './metodosCXF';
import { MAalimentos } from './metodosAlimentos';
import mongoose from 'mongoose'
import { testModel } from './test';

app.use(MAalimentos);
app.use(MConsumoXFecha);
app.use(MPersonas);

const port = 6553;

mongoose.set('strictQuery', false)
mongoose.connect('mongodb://localhost:27017/tp_pruscino')

app.use(express.json());

app.listen(port,() => {
  console.log('http://localhost:3001/')
})

//app.get('/', (_req , _res) => _res.send('Bienvenido a mi calendario!'));


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



