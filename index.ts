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



const port = 6553;

mongoose.set('strictQuery', false)
mongoose.connect('mongodb://localhost:27017/tp_pruscino')

app.use(express.json());

app.listen(port,() => {
  console.log(`http://localhost:${port}/`)
})

//app.get('/', (_req , _res) => _res.send('Bienvenido a mi calendario!'));

app.get('/personas', MPersonas)

app.post('/personas', MPersonas)

app.patch('/personas', MPersonas)

app.delete('/personas', MPersonas)

app.put('/personas', MPersonas)




app.get('/alimentos', MAlimentos)

app.post('/alimentos', MAlimentos)

app.patch('/alimentos', MAlimentos)

app.put('/alimentos', MAlimentos)

app.delete('/alimentos', MAlimentos)




app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



