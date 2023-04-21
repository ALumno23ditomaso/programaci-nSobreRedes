import express from 'express';
import * as swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from './swagger' 
const app: express.Application = express();
import mongoose from 'mongoose'
import { modeloPersona } from './modelos/modeloPersona';
import bodyParser from 'body-parser';
import { MPersonas } from './metodosPersonas';
import { MAlimentos } from './metodosAlimentos';
import { modeloAlimento } from './modelos/modeloAlimento';
import { MConsumoXFecha } from './metodosCXF';



const port = 6553;

mongoose.set('strictQuery', false)
mongoose.connect('mongodb://localhost:27017/tp_pruscino')

app.use(express.json());

app.listen(port,() => {
  console.log(`http://localhost:${port}/`)
})

//app.get('/', (_req , _res) => _res.send('Bienvenido a mi calendario!'));

app.use('/personas', MPersonas)

app.use('/alimentos', MAlimentos)

app.use('/consumoXFecha', MConsumoXFecha)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



