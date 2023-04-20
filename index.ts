import express from 'express';
import * as swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from './swagger' 
const app: express.Application = express();
import mongoose from 'mongoose'
import { modeloPersona } from './modelos/modeloPersona';
import bodyParser from 'body-parser';
import { MPersonas } from './metodosPersonas';



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


app.put('/Persona', async (req, res) => {
  const data = await modeloPersona.findOneAndReplace({"nombre": req.body.nombre}, {"nombre": req.body.nuevo_nombre})
  res.status(200).send(data)  
})

app.delete('/', async (req, res) => {
  const data = await modeloPersona.findOneAndDelete({"nombre": "leto"})
  res.status(200).send(data)
})


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));



