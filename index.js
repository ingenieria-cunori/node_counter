import express from 'express';
import { createClient } from 'redis';
const app = express();
const client = createClient({ host: 'redis-db' });

app.get('/', (req, res) => {
    client.incr('visitas', (err, visitas) => {
        res.send(`Hola! Esta página ha sido visitada ${visitas} veces.`);
    });
});

app.listen(3000, () => console.log('Server ready on port 3000'));