import express from 'express';
import router from './router';

const app = express();


const hostname = '0.0.0.0';
const port = process.env.NODE_PORT ?? 80;

app.listen(port);
console.log(`Server start hostname ${hostname}:${port}`);

app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Luni Exercice API</h1>')
});

try {
    app.use('/api/v1', router);
} catch (e) {
    console.error(e.code + ' error : ' + e.message)
}
