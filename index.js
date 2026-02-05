import express from 'express';
import { createClient } from 'redis';
import cors from 'cors'; 

const app = express();
app.use(cors()); 

const client = createClient({
    url: 'redis://db:6379' //<-- Cambia 'db' por el nombre del servicio que haz definido en el docker-compose
});

client.on('error', (err) => console.log('Redis Client Error', err));
client.connect();

app.get('/', async (req, res) => {
    try {
        const visitas = await client.incr('visitas');
        res.json({ 
            mensaje: "¡Hola desde el Backend!",
            contador: visitas 
        });
    } catch (err) {
        res.status(500).send("Error en la base de datos");
    }
});

app.listen(3000, () => {
    console.log('Backend escuchando en puerto 3000');
});